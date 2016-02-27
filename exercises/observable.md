# Объект наблюдатель

Автор задачи [Евгений Бовыкин](https://github.com/missingdays).

Напишите функцию `observable`, которая будет принимать объект и делать его "наблюдаемым". После вызова функции объект должен поддерживать следующие методы.

```javascript
function callback(){
    console.log("I'm called!");
}
var obj = {};
observable(obj);

obj.on("event", callback); // При каждом событии event вызвать callback
obj.fire("event"); // I'm called!
obj.fire("event"); // I'm called!

obj.one("event2", callback); // Подписаться на событие единожды
obj.fire("event2"); // I'm called!
obj.fire("event2"); // Ничего не происходит

obj.unbind("event"); // Отписаться от события
obj.fire("event"); // Ничего не происходит
```

Из дополнительных опций - поддержка нескольких функций, подписанных на одно событие.
```javascript
obj.on("event", callback1);
obj.on("event", callback2);
obj.fire("event"); // callback1 и callback2 вызваны
```
Unbind конкретной функции, а не всего события.
```javascript
obj.on("event", callback1);
obj.on("event", callback2);
obj.unbind("event", callback1);
obj.fire("event"); //  callback2 вызван
```
Передача аргументов в callback.
```javascript
function callback(one, two){
    console.log(one + two);
}
obj.on("event", callback);
obj.fire("event", 1, 2); // 3
```

### Решение
Написать базовый вариант довольно просто.

```javascript
function observable(obj){

    obj = obj || {};

    obj.__callbacks = {};

    obj.on = function(event, callback){
        this.__callbacks[event] = {
            func: callback, 
            once: false
        };
    };

    obj.one = function(event, callback){
        this.__callbacks[event] = {
            func: callback,
            once: true
        };
    };

    obj.fire = function(event){
        var callbacks = this.__callbacks;

        if(!callbacks[event]){
            return;
        }

        callbacks[event].func();
        
        if(callbacks[event].once){
            this.unbind(event);
        }
    }

    obj.unbind = function(event){
        delete this.__callbacks[event];
    }

    return obj;
}
```

Однако даже в таком простом решении уже начинают появляться баги. Подумаем, что произойдет, если мы выполним этот код.

```javascript
var obj = observable();

obj.one("one", function(){
    console.log("first");
    obj.one("one", function(){
        console.log("second");
    });
});

obj.fire("one");
obj.fire("one");
```

Надеюсь, вы догадались. Второй callback не будет вызван, и в консоли появится только "first". Это происходит потому, что мы удаляем callback уже после того, как его вызвали, однако именно во время его вызова происходит новая подписка на это событие. Попробуем от этого избавиться. Для этого будем поддерживать уже массив callback'ов, подписанных на одно событие, и удалять только нужный нам callback, а не все.


```javascript	
	...
    obj.on = function(event, callback){
        if(this.__callbacks[event] === undefined){
            this.__callbacks[event] = [];
        } 

        this.__callbacks[event].push({
            func: callback, 
            once: false
        });

    };

    obj.one = function(event, callback){
        if(this.__callbacks[event] === undefined){
            this.__callbacks[event] = [];
        } 
        
        this.__callbacks[event].push({
            func: callback, 
            once: true
        });
    };

    obj.fire = function(event){
        var callbacks = this.__callbacks[event];

        if(!callbacks){
            return;
        }

        var i = 0;
        var n = callbacks.length;
        while(i < n){
            callbacks[i].func();

            if(callbacks[i].once){
                callbacks.splice(i, 1);
                n--;
            } else {
                i++;
            }
        }
    }

    ...
```

Переменная `n` нам нужна, потому что во время вызова `callbacks[i].func()` в массив `callback` могут добавиться новые элементы, вызывать которые мы не хотим. Таким образом, `n` хранит размер "старого" массива, а справа от него push'аштся новые функции. Перенесем функционал удаления функции в метод `unbind`, где ему и место.

```javascript	
	...
    obj.fire = function(event){
        var callbacks = this.__callbacks[event];

        if(!callbacks){
            return;
        }

        var i = 0;
        var n = callbacks.length;
        while(i < n){
            callbacks[i].func();

            if(callbacks[i].once){
                this.unbind(event, callbacks[i].func);
                n--;
            } else {
                i++;
            }
        }
    }

    obj.unbind = function(event, fn){
        if(fn){
            var i = 0;
            var callbacks = this.__callbacks[event];
            while(i < callbacks.length){
                if(callbacks[i].func === fn){
                    callbacks.splice(i, 1);
                } else {
                    i++;
                }
            }
        } else {
            delete this.__callbacks[event];
        }
    }
    ...
```

Вот так, исправляя баг, мы выполнили два дополнительных пункта — поддержка нескольких callback'ов и удаление конкретной функции в unbind. Осталась передача аргументов в наши callback.

```javascript
	...
    obj.fire = function(event){
        var callbacks = this.__callbacks[event];

        if(!callbacks){
            return;
        }

        var args = [].splice.call(arguments, 1);

        var i = 0;
        var n = callbacks.length;
        while(i < n){
            callbacks[i].func.apply(null, args);

            if(callbacks[i].once){
                this.unbind(event, callbacks[i].func);
                n--;
            } else {
                i++;
            }
        }
    }
    ...
```

Тут все просто. Получаем все переданные нам аргументы, кроме первого, в `var args = [].splice.call(arguments, 1)`, и волшебным методом [apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) передаем нашему callback'у все аргументы.

Далее можно вынести `__callbacks` в замыкание, чтобы не засорять передаваемый нам объект. Можно сделать поддержку многих имен в аргументе `event`, например `obj.on("event anotherEvent thirdEvent", callback)`, `obj.unbind("event thirdEvent", callback)`. Однако статья получилась и так достаточно объемная, поэтому надеюсь, что все возможности выше вы сможете реализовать сами.

### Альтернативные решения

Альтернативные решения этой задачи нам прислали [Андрей Гетманенко](https://gist.github.com/XXimiCC/fea65361da5e2d4f63b4), [Роман Фазульянов](https://github.com/romanfazulianov/observer-sample/blob/master/observable.js), и [Евгений Зайцев](https://gist.github.com/overhawlin/31b24d63a315bafc698d). Все они выполняют основной ряд задач, однако особенно стоит отметить современное решение Евгения Зайцева с использованием ES6, которое, однако, мне не удалось запустить под нодой 4 версии, даже с флагом `--harmony` :).

### Заключение

Так мы получили небольшую событийную систему, исходный код которой не превышает ста строк. Неплохо! 

Данная статья была вдохновлена [riot-observable](https://github.com/riot/observable) и определенными проблемами при ее использовании (тот самый баг с вложенным `one`). Поэтому я надеюсь, что после этой статьи читатели не побоятся, в случае надобности собственноручно писать нужный им функционал, если в существующих библиотеках они найдут баги, которые тормозят разработку. И после этого, конечно, отправят Pull Request в эту либу.