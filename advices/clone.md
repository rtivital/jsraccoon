# Клонирование объекта
Самый быстрый способ клонировать объект - пропустить его через функции JSON.parse() и JSON.stringify() - таким образом будут клонированы все свойства объекта на любой глубине вложенности:
```javascript
var clonedObject = (JSON.parse(JSON.stringify(originalObject)));
```
Подробнее о том, как это работает можно узнать в [статье](http://ilikekillnerds.com/2015/12/deep-cloning-objects-in-javascript-without-dependencies/).

Так как в данной методике используются функции `JSON.parse()` и `JSON.stringify()` невозможно копирование всех типов данных кроме:

* чисел (`number`)
* строк (`string`)
* true и false (`boolean`)
* массивов (`object`)
* null (`object`)

Таким образом получится успешно скопировать следующий объект:
```javascript
var original = {
	a: 1,
	b: true,
	d: false,
	e: 'string in object',
	f: {
		g: [2, 3, 4, 5, 6]
	}, 
	h: null
};

// Объект cloned содержит все свойства объекта original
var cloned = (JSON.parse(JSON.stringify(original)));
```

Но не получится скопировать некоторые свойства в следующей ситуации:
```javascript
var original = {
	a: document.querySelectorAll('a'),
	b: function() { return this.a; },
	c: /regular expression/,
	d: [function(){ return true; }]
};

// Объект cloned не содержит ни одного свойства объекта original
var cloned = (JSON.parse(JSON.stringify(original)));
```

В случае, если требуется скопировать свойства, описанные выше, надо использовать классический метод клонирования объекта:
```javascript
function clone(obj) {
    if(obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj) {
        if(Object.prototype.hasOwnProperty.call(obj, key)) {
            obj['isActiveClone'] = null;
            temp[key] = clone(obj[key]);
            delete obj['isActiveClone'];
        }
    }    

    return temp;
}
```

Подробнее о клонировании объектов на [Stack Overflow](http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object).
