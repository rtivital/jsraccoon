# Перебирающие методы массивов изнутри

Методы массивов `forEach`, `map`, `filter`, `some`, `every` и `reduce` являются неотъемлимой частью функционального программирования на JavaScript. В этой статье подробно рассмотрим применение каждого из них, а также их реализацию в виде функций.

## forEach
Самый простой способ разобраться, как работают функции высшего порядка, принимающие callback'и, — самостоятельно переписать несколько нативных методов. Начнём с самого простого метода `Array.prototype.forEach`. Метод массивов `forEach` принимает два аргумента: первый (обязательный) — `callback` функция, которая будет выполнена для каждого элемента массива один раз и второй (необязательный) — значение, которое будет использовано в качестве `this` при вызове функции `callback`. Работает это следующим образом:
```javascript
['JavaScript', 'is', 'awesome'].forEach(function(item, index, arr) {
  console.log(item, index, arr);
});
// Выведет в консоль
// JavaScript 0 ["JavaScript","is","awesome"]
// is 1 ["JavaScript","is","awesome"]
// awesome 2 ["JavaScript","is","awesome"]
```

В `callback` функцию передаётся три аргумента: `item`, соответствующий элементу массива, `index`, равный номеру элемента в массиве, и `arr` — ссылка на массив. Таким образом, справедливо следующее выражение `arr[index] === item`. Аргументам передаваемым в `callback` функцию можно давать разные названия в зависимости от контекста выполнения — выполнение `callback` функции от этого не изменится:
```javascript
[1, 2, 3, 4, 5].forEach(function(num, i, nums) {
  console.log(num * 2); // 2 4 6 8 10
});
```

Как я писал выше, помимо `callback` функции метод `forEach` принимает ещё один аргумент — значение, которое будет использовано в качестве `this` при вызове функции `callback`. Зачем это может понадобиться? По умолчанию `this` не определён, то есть равен `undefined`. В некоторых ситуациях, особенно при работе с функциями конструкторами, необходимо задать контекст выполнения `callback` функции:
```javascript
var Person = function(name) {
  this.name = name;
};

Person.prototype.say = function(phrase) {
  console.log(this.name + ' says ' + phrase);
}

Person.prototype.mumble = function(phrases) {
  phrases.forEach(function(phrase) {
    this.say(phrase);
  });
}

var johnDoe = new Person('John Doe');
johnDoe.mumble(['Hello, World!', 'JS is great', 'I\'m designer and i don\'t have job']);
```

Подобный код, на первый взгляд, может оказаться полностью рабочим. Тем не менее, после его выполнения всё, что мы увидим будет ошибка `Cannot read property 'say' of undefined`. Данная ошибка показывает, что при выполнении метода `forEach` на передаваемом в метод `mumble` массиве `phrases` не задаётся контекст испольнения `callback` функции. Проще говоря, `callback` функция пытается выполнить подобный код `undefined[say](words)`. Решается данная проблема элементарно — передётся второй аргумент в метод `forEach`, который и указывает ему, что брать за `this`:
```javascript
// ...
Person.prototype.mumble = function(arr) {
  arr.forEach(function(words){
    this.say(words);
  }, this);
}

var johnDoe = new Person('John Doe');
johnDoe.mumble(['Hello, World!', 'JS is great', 'I\'m designer and i don\'t have job']);

// Выведет в консоль
// John Doe says Hello, World!
// John Doe says JS is great
// John Doe says I'm designer and i don't have job
```

## forEach своими руками
Теперь, когда вы знаете, как работает `forEach`, настало время написать функцию, которая делает всё тоже самое. При создании функции `each` будем руководствоваться тремя правилами:

1. Функция принимает три аргумента: массив, по которому будет происходить итерация, `callback` фунцию, которая будет выполнена для каждого элемента массива, и значение, которое будет использовано `callback` функцией в качестве `this`.
2. `callback` функция, в свою очередь, также работает с тремя аргументами: текущий элемент массива, индекс элемента, ссылка на сам массив. 
3. Функция ничего не возвращает.

Самое очевидное решение: используя цикл `for` перебрать каждый элемент массива и выполнить передаваемую `callback` функцию с каждым. Сделать это очень просто:
```javascript
var each = function(arr, callback, thisArg) {
  var i, length = arr.length;
  for (i = 0; i < length; i = i + 1) {
    callback(arr[i], i, arr);
  }
};
```

Функция `each` будет отлично работать, за исключением того, что не соблюдается часть первого правила — для `callback` функции нельзя задать контекст, то есть нельзя присвоить значение `this`:
```javascript
each([1, 2, 3], function(num, i, nums) {
  console.log('Number: ' + num + ', index: ' + i + ',', nums)
});

// Выведет в консоль
// Number: 1, index: 0, [1,2,3]
// Number: 2, index: 1, [1,2,3]
// Number: 3, index: 2, [1,2,3]
```

Чтобы можно было осуществлять передачу ключевого слова `this` в функцию `each` достаточно воспользоваться методом функций `call`, который позволяет вызвать функцию и явно указать, на что будет указывать ключевое слово `this`.
```javascript
var each = function(arr, callback, thisArg) {
  var i, length = arr.length;
  for (i = 0; i < length; i = i + 1) {
    callback.call(thisArg, arr[i], i, arr);
  }
};
```

Теперь функция `each` работает с массивами в точности так, как и метод `forEach`. Чтобы её протестировать, можно запустить её вместе с кодом из предыдущего примера.
```javascript
var Person = function(name) {
  this.name = name;
};

Person.prototype.say = function(phrase) {
  console.log(this.name + ' says ' + phrase);
}

Person.prototype.mumble = function(phrases) {
  each(phrases, function(phrase) {
    this.say(phrase);
  }, this);
}

var johnDoe = new Person('John Doe');
johnDoe.mumble(['Hello, World!', 'JS is great', 'I\'m designer and i don\'t have job']);

// Выведет в консоль
// John Doe says Hello, World!
// John Doe says JS is great
// John Doe says I'm designer and i don't have job
```

Несмотря на кажущуюся одинаковость метода `forEach` и написанной нами выше функции `each`, между ними есть одно очень важное различие: метод `forEach` работает **только с массивами**, в то время как функция `each` может также успешно работать с **любыми коллекциями**. 

Скорее всего, вы уже видели ранее подобную конструкцию, которую использую многие JavaScript разработчики для итерации по всем элементам из DOM коллекции:
```javascript
var links = document.links; // коллекция всех ссылок на странице
[].forEach.call(links, function(link) {
  // Добавление класса link-active для всех ссылок на странице
  link.classList.add('link-active'); 
});
```

Подобная конструкция может ввести в замешательство практически любого программиста, который раньше не использовал её сам. Подробное объяснение, как именно она работает можно найти в [этом вопросе](http://stackoverflow.com/questions/16053357/what-does-foreach-call-do-in-javascript) на Stackoverflow. Нужна она лишь для того, чтобы провести итерацию по всем элементам выбранной DOM коллекции и выполнить `callback` функцию для каждого из них. При использовании написанной нами функции `each` надобности в такой хитрой конструкции нет, так как она поддерживает работу не только с массивами, но и с любыми коллекциями, в том числе и коллекциями DOM элементов:
```javascript
var links = document.links; // коллекция всех ссылок на странице
each(links, function(link) {
  // Добавление класса link-active для всех ссылок на странице
  link.classList.add('link-active');
});
```

Когда появится широкая поддежка **ES6** метод `forEach` можно будет использовать с DOM коллекциями более простым способом с помощью оператора [Spread](http://jsraccoon.ru/es6-spread-rest/):
```javascript
[...links].forEach(function(link) {
  link.classList.add('link-active'); 
});
```

## map

Метод массивов `map` похож по своей функциональности на `forEach`, но результат выполнения `callback` функции добавляется в новый массив, который возвращается после последней итерации. Другими словами, результатом метода `map` всегда является **новый** массив с результатами выполнения функции `callback` на исходном массиве. 
```javascript
var nums = [10, 20, 30, 40];
var results = nums.map(function(num, index, arr) {
  // Возведение числа в степень соответсвующую его индексу в массиве
  return Math.pow(num, index);
});

// Исходный массив nums не изменяется
console.log(nums); // [10,20,30,40]
// результат выполнения map, записанный в переменную
console.log(results); // [1,20,900,64000]
```

Также, как и в случае с `forEach` `map` помимо `callback` функции принимает второй параметр, который позволяет задать контекст и явно указать `this`:
```javascript
var Person = function(name) {
  this.name = name;
  this.phrases = null;
};

Person.prototype.say = function(phrase) {
  return this.name + ' says ' + phrase;
}

Person.prototype.grabPhrases = function(phrases) {
  this.phrases = phrases.map(function(phrase){
    // Добавление изменённой строки в новый массив
    return this.say(phrase);
  }, this)
}

var johnDoe = new Person('John Doe');
johnDoe.grabPhrases(['Hello, World!', 'JS is great', 'I\'m designer and i don\'t have job']);
console.log(johnDoe.phrases); 
// ["John Doe says Hello, World!","John Doe says JS is great","John Doe says I'm designer and i don't have job"]
```

Как вы могли заметить, при использовании `map` и `forEach` всегда использовалась анонимная функция в качестве `callback`. Это совсем не обязательно. Вы можете объвить функцию, которую хотите использовать в качестве `callback` заранее, а затем просто передать её в качестве параметра.
```javascript
var slice = function(str) {
  // вернуть первые пять символов из строки
  return str.slice(0, 5);
};

var frameworks = ['Knockout', 'Backbone', 'Angular'].map(slice);

console.log(frameworks); // ["Knock","Backb","Angul"]
```

В некоторых ситуациях можно вообще не создавать отдельную функцию и пользоваться нативными методами. Пример выше, в котором каждое число в массиве возводилось в степень, соответствующую своему индексу, можно значительно сократить:
```javascript
// Длинный вариант с ненужной анонимной функцией
var nums = [10, 20, 30, 40];
var results = nums.map(function(num, index, arr) {
  return Math.pow(num, index);
});

// Короткий вариант, ничего лишнего
var nums = [10, 20, 30, 40];
var results = nums.map(Math.pow);
```

Передвая `callback` функцию подобным образом вы не теряете возможность явно указать `this`. Таким образом, метод `grabPhrases` из функции конструктора `Person` также можно немного сократить:
```javascript
Person.prototype.grabPhrases = function(phrases) {
  // Ненужная анонимная функция
  this.phrases = phrases.map(function(phrase) {
    return this.say(phrase);
  }, this);
}
// Выполнение функции this.say для каждого элемента массива
Person.prototype.grabPhrases = function(phrases) {
  this.phrases = phrases.map(this.say, this)
}
```

В отличие от `forEach` при использовании `map` вам становится доступен chaining. Это значит, что вы можете последовательно применить метод на возвращенный после `map` массив. 
```javascript
// Получение квадратного корня из чисел с помощью map
// и вывод результатов в консоль с помощью forEach
[1, 4, 9, 16].map(Math.sqrt).forEach(function(num) {
  console.log(num); // 1 2 3 4
});
```

## map своими руками
Как и при создании аналога `forEach` напишем небольшие правила, которыми будем руководствоваться при создании функции `map`:

1. Функция возвращает **новый** массив, оставляя исходный без изменений.
2. Всё, что возвращает `callback` функция добавляется в новый массив.
3. Функция принимает три аргумента: массив, по которому будет происходить итерация, `callback` фунцию, которая будет выполнена для каждого элемента массива, и значение, которое будет использовано `callback` функцией в качестве `this`.
4. `callback` функция, в свою очередь, также работает с тремя аргументами: текущий элемент массива, индекс элемента, ссылка на сам массив.

Правил стало больше, но последними двумя мы уже пользовались при создании функции `each`, а, значит, вы уже знаете, как с ними справиться. 
```javascript
var map = function(arr, callback, thisArg) {
  var i, length = arr.length, results = [];
  for (i = 0; i < length; i = i + 1) {
    results.push(callback.call(thisArg, arr[i], i, arr));
  }
  return results;
};
```

Менять исходный массив нельзя, поэтому нужно создать новый массив в самом начале выполнения функции `map`. Назовём его `results`. В созданный нами массив `results` при кажом выполнении будем добавлять результат выполнения функции `callback` с помощью метода `push`. После завершения последней итерации всё, что остаётся сделать — вернуть массив `results`.

Написанная нами функция `map` работает точно так же, как и метод массивов `map`, но, как и `each`, может принимать в качестве аргументов любый другие коллекции.
```javascript
var pows = map([10, 20, 30], Math.pow);
var frameworks = map(['Knockout', 'Backbone', 'Angular'], function(framework) {
  return framework.slice(0, 5);
});
console.log(pows); // [1,20,900]
console.log(frameworks); // ["Knock","Backb","Angul"]
```

**Небольшой совет**: не используйте метод `map` для манипуляций с коллекциями DOM элементов, например, чтобы добавить класс всем элементам коллекции.
```javascript
[].map.call(document.links, function(link) {
  link.classList.add('link');
});
```
Данный код сработает и всем ссылкам будет добавлен класс `link`, но пимимо этого будет создан дополнительный пустой массив, что скажется на производительности при большом объеме итерируемой коллекции. В подобных случаях следует использовать исключительно `forEach`. 

Тем не менее, `map` отлично подходит для получения данных из DOM коллекций. Например, получение всех `href` атрибутов будет выглядеть следующим образом:
```javascript
var hrefs = [].map.call(document.links, function(link) {
  return link.href;
});

console.log(hrefs); // ["http://google.ru", "http://jsraccoon.ru" ...]
```

## filter
Метод `filter`, как и следует из названия, служит для фильтрации массива по правилам, заданным в `callback` функции. Так же, как в случае с `map` создаётся **новый** массив, куда добавляются все элементы прошедшие провеку колбэком.
```javascript
var moreThanFive = [1, 20, 4, 2, 5, 3, 24, 6, 45].filter(function(num) {
  return num > 5;
});

console.log(moreThanFive); // [20,24,6,45]
```

При использовании метода `filter` результатом выполнения может быть любое значение, но данные из исходного массива будут добавлены только в том случае, если значение является правдивым. Напомню, что правдивыми значениями являются все, кроме:

1. пустой строки `''`
2. числа ноль `0`
3. `false`
4. `undefined`
5. `null`

Тем не менее, пользоваться подобным способом фильтрации массива не стоит в силу его неочевидности. Поэтому рекомендуется создавать `callback` функцию таким образом, чтобы она всегда возвращала либо `true`, либо `false`.

Немного более сложный пример использования метода `filter`. Допустим, что мы получаем JSON файл с сервера с подобным содержимым:
```javascript
[{"id":1,"name":"Ernest","email":"ebishop0@myspace.com","isCustomer":false},
{"id":2,"name":"Michael","email":"mturner1@multiply.com","isCustomer":false},
{"id":3,"name":"Mildred","email":"mwelch2@google.it","isCustomer":false},
{"id":4,"name":"Jeremy","email":"jwilson3@hostgator.com","isCustomer":false},
{"id":5,"name":"Judy","email":"jellis4@ameblo.jp","isCustomer":true},
{"id":6,"name":"Judy","email":"jrogers5@ow.ly","isCustomer":false},
{"id":7,"name":"Chris","email":"cbennett6@nasa.gov","isCustomer":false},
{"id":8,"name":"Ruth","email":"rmason7@simplemachines.org","isCustomer":true},
{"id":9,"name":"Justin","email":"jmedina8@indiegogo.com","isCustomer":true},
{"id":10,"name":"Dennis","email":"dflores9@g.co","isCustomer":true}]
```

После получения данных (с помощью AJAX или JSONP, например) мы хотим их отфильтровать, узнав из свойства `isCustomer`, является ли данных человек нашим клиентом или нет. Вот здесь и пригодится метод `filter`:
```javascript
// ...
// Получили данные с сервера и записали их в переменную data
var customers = data.filter(function(person) {
  return person.isCustomer;
});

console.log(customers);
// [{"id":5,"name":"Judy","email":"jellis4@ameblo.jp","isCustomer":true},
// {"id":8,"name":"Ruth","email":"rmason7@simplemachines.org","isCustomer":true},
// {"id":9,"name":"Justin","email":"jmedina8@indiegogo.com","isCustomer":true},
// {"id":10,"name":"Dennis","email":"dflores9@g.co","isCustomer":true}]
```

Или же можно руководствоваться немного другим, более сложным принципом при выборе цели. Например, мы решили, что если email клиента не начинается с буквы `j`, то он определённо нам не подходит.
```javascript
// ...
// Получили данные с сервера и записали их в переменную data
var customers = data.filter(function(person) {
  return person.email.charAt(0).toLowerCase() === 'j';
});
console.log(customers);
// [{"id":4,"name":"Jeremy","email":"jwilson3@hostgator.com","isCustomer":false},
// {"id":5,"name":"Judy","email":"jellis4@ameblo.jp","isCustomer":true},
// {"id":6,"name":"Judy","email":"jrogers5@ow.ly","isCustomer":false},
// {"id":9,"name":"Justin","email":"jmedina8@indiegogo.com","isCustomer":true}]
```

## filter своими руками
Как и для прошлых функций `map` и `forEach` напишем небольшой свод правил:

1. Функция возвращает **новый** массив, оставляя исходный без изменений.
2. Данные исходного массива передаются в `callback` функцию. Результат выполнения `callback` функции решает будет ли добавлен данный элемент в новый массив.
3. Функция принимает три аргумента: массив, по которому будет происходить итерация, `callback` фунцию, которая будет выполнена для каждого элемента массива, и значение, которое будет использовано `callback` функцией в качестве `this`.
4. `callback` функция, в свою очередь, также работает с тремя аргументами: текущий элемент массива, индекс элемента, ссылка на сам массив.

```javascript
var filter = function(arr, callback, thisArg) {
  var i, length = arr.length, results = [];
  for (i = 0; i < length; i = i + 1) {
    if (callback.call(thisArg, arr[i], i, arr)) {
      results.push(arr[i]);
    }
  }
  return results;
};
```

С помощью всё того же метода функций `call` мы вызываем `callback` функцию, но на этот раз всё, что нас будет интересовать — вернула ли функция правдивое значение. Если результат содержит правдивое значение, то данные будут добавлены в массив, если же нет, то просто проигнорированы.

Удостоверимся, что функция `filter` работает, как мы её и задумывали:
```javascript
var strs = ['Hello', ',', 'JavaScript', 'World', '!'];

var data = filter(strs, function(str) {
  return str.toLowerCase() !== str;
});

console.log(data); // ["Hello","JavaScript","World"]
```

**Небольшой хак**: чтобы отфильтровать все ложные значения из массива можно воспользоваться конструктором `Boolean`:
```javascript
var data = [32, '', null, 'JavaScript', undefined, 0];
var trueData = data.filter(Boolean);
console.log(trueData); // [32,"JavaScript"]
```

## some и every
Методы `some` и `every` во многом похожи друг на друга. Оба метода возвращают `true` или `false`. `some` возвращает `true` тогда, когда хотя бы один элемент массива отвечает переданным в `callback` функцию условиям. `every` вернёт `true`, когда все элементы массива отвечают данным условиям. Звучит грозно, но, на самом деле всё очень просто.
```javascript
var fives = [5, 5, 5, 6, 5, 5];
var result = fives.every(function(five) {
  return five === 5;
});

console.log(result); // false — в массиве же есть шестёрка

var fives = [5, 5, 5, 5, 5, 5];
var result = fives.every(function(five) {
  return five === 5;
});

console.log(result); // true — теперь там только пятёрки, всё хорошо

var nums = [1, 2, 3, 4, 5];
var result = nums.some(function(num) {
  return num > 3;
});

console.log(result); // true — в массиве есть хотя бы одно значение больше 3

var nums = [10, 20, 30, 40, 50];
var result = nums.some(function(num) {
  return num < 5;
});

console.log(result); // false — в массиве нет ни одного значения меньше 5
```

Методы `some` и `every` очень удобно использовать вместе с методом `filter` для вложенных массивов. Чтобы понять, как это работает, опять представим, что мы получили данные с сервера в виде JSON файла, который содержит массив объектов (наших покупателей). У каждого покупателя есть свойство `purchases`, которое представляет собой список приобретённых покупателем товаров в нашем магазине ранее. 
```javascript
[{"name":"Wanda","email":"wjenkins0@irs.gov","purchases":['iPhone', 'dishwasher', 'cucumbers']},
{"name":"Nicholas","email":"nkennedy1@ox.ac.uk","purchases":['tomatoes', 'toster', 'grill']},
{"name":"Paula","email":"pstephens2@boston.com","purchases":['apples', 'Macbook', 'iPhone']},
{"name":"Fred","email":"fpeterson3@reuters.com","purchases":['beef', 'pork', 'cheese']},
{"name":"Andrew","email":"awagner4@weebly.com","purchases":['cottage cheese', 'cream', 'candies']},
{"name":"Steven","email":"sgonzales5@mashable.com","purchases":['iMac', 'Android phone', 'Windows 10']},
{"name":"Harry","email":"hallen6@nasa.gov","purchases":['green grape', 'tomatoes', 'potatoes']},
{"name":"Bonnie","email":"breyes7@kickstarter.com","purchases":['Windows 10', 'dishwasher', 'grill']},
{"name":"Lisa","email":"lgreene8@spotify.com","purchases":['pork', 'iMac', 'cheese']},
{"name":"Wayne","email":"wramos9@yahoo.com","purchases":['apples', 'cream', 'candies']}]
```

Чтобы понять, какие клиенты нам принесли больше всего прибыли, мы хотим их отфильтровать и посмотреть, кто из них покупал у нас технику от Apple (iPhone, Macbook или iMac). Метод `some` поможет сделать это с помощью всего нескольких строк кода.
```javascript
// ...
// Получили данные с сервера и записали их в переменную data
var customers = data.filter(function(customer) {
  return customer.purchases.some(function(purchase) {
    return purchase === 'iPhone' || purchase === 'Macbook' || purchase === 'iMac';
  });
});

console.log(customers);
// [{"name":"Wanda","email":"wjenkins0@irs.gov","purchases":["iPhone","dishwasher","cucumbers"]},
// {"name":"Paula","email":"pstephens2@boston.com","purchases":["apples","Macbook","iPhone"]},
// {"name":"Steven","email":"sgonzales5@mashable.com","purchases":["iMac","Android phone","Windows 10"]},
// {"name":"Lisa","email":"lgreene8@spotify.com","purchases":["pork","iMac","cheese"]}]
```

## some и every своими руками
Правила:

1. Функция возвращает только `true` или `false`
2. Каждое значение передаётся в `callback` функцию и на результате её выполнения для **всех** элементов массива решается, какой будет результат.
3. Функция принимает три аргумента: массив, по которому будет происходить итерация, `callback` фунцию, которая будет выполнена для каждого элемента массива, и значение, которое будет использовано `callback` функцией в качестве `this`.
4. `callback` функция, в свою очередь, также работает с тремя аргументами: текущий элемент массива, индекс элемента, ссылка на сам массив.

```javascript
var some = function(arr, callback, thisArg) {
  var i, length = arr.length;
  for (i = 0; i < length; i = i + 1) {
    if (callback.call(thisArg, arr[i], i, arr)) {
      return true;
    }
  }
  return false;
};
```

Функция `some` при каждой итерации проверяет, является ли результат выполнения `callback` функции правдивым. Если она находит хотя бы один правдивый результат, то прерывает своё выполнение и сразу возвращает `true`.

```javascript
var every = function(arr, callback, thisArg) {
  var i, length = arr.length;
  for (i = 0; i < length; i = i + 1) {
    if (!callback.call(thisArg, arr[i], i, arr)) {
      return false;
    }
  }
  return true;
};
```

Функция `every` построена по противоположному принципу. Если хотя бы одно значение не является верным, то сразу же возвращается `false` без дальнейшего перебирания массива.

Функции `every` и `some` работают идентично соответствующим им методам и будут давать одинаковые резутаты. Тем не менее, написанные нами функции работают лучше нативных методов. Почему? Используя методы массивов `some` и `every` вы подразумеваете, что `callback` функция будет выполнена для всех элементов без исключения. Но, может оказаться так, что первый элемент в массиве уже содержит нужные нам данные и итерация по всем остальным будет абсолютно бесполезной. В написанных нами функциях таких итераций не будет — когда будет найдено искомое значение функция сразу же прекратит своё выполнение. Подобный подход может дать достаточно ощутимый прирост производительности при работе с большими объемами данных, например, с JSON файлами содержащими несколько тысяч объектов.

## reduce
`callback` функция всех рассмотренных выше методов массивов работает с одинаковым набором данных: значением, индексом и массивом. Метод `reduce` не такой, как все. Принцип его работы немного отличается от всех остальных методов. Начнём сразу с примера:
```javascript
var nums = [10, 20, 30, 40, 50];
var sum = nums.reduce(function(result, num) {
  return result + num;
}, 0);

console.log(sum); // 150 сумма всех элементов массива
```

Метод `reduce` принимает два аргумента `callback` функцию и начальное значение, которое будет присвоено аргументу `result` в примере выше при первой итерации. `callback` функция принимает целых 4 аргумента: промежуточное значение (аргумент `result` в примере выше), элемент массива, индекс элемента и сам массив. После каждой итерации в промежуточное значение записываются новые данные, которые берутся из результата выполнения функции `callback` при прошлой итерации:
```javascript
var nums = [10, 20, 30, 40, 50];
var sum = nums.reduce(function(result, num) {
  console.log(result);
  return result + num;
}, 0);

// Будет выведено в консоль
// 0 начальное значение
// 10 начальное значение + первый элемент в массиве = промежуточное значение
// 30 промежуточное значение + второй элемент в массиве = промежуточное значение
// 60 и так далее
// 100
```

Разумеется, `reduce` может работать с любыми типами данных, не только с числами. Пример со строками (в данном случае в качестве начального значения стоит передавать пустую строку):
```javascript
var strs = ['JavaScript', 'is', 'awesome'];
var result = strs.reduce(function(phrase, word, index) {
  // Перед первым словом не надо ставить пробел
  return (index === 0) ? phrase + word : phrase + ' ' + word;
}, '');

console.log(result); // JavaScript is awesome
```

Пример с многомерным массивом (начинаем с пустого массива):
```javascript
var arrs = [[1, 2, 3], [4, 5], [6], [7, 8], [9, 10, 11]];
var concat = arrs.reduce(function(result, current) {
  return result.concat(current);
}, []);

console.log(concat); // [1,2,3,4,5,6,7,8,9,10,11]
```

## reduce своими руками
Вы уже знаете — у нас есть правила:

1. Функция принимает три аргумента: массив, `callback` функцию, начальное значение.
2. После каждой итерации в промежуточное значение перезаписывается значением, полученным в результате выполнения `callback` функции.
3.`callback` функция принимает четыре аргумента: промежуточное значение, текущий элемент массива, индекс элемента, ссылка на сам массив.
4. Явно указать значение `this` нельзя.

```javascript
var reduce = function(arr, callback, startValue) {
  var i, length = arr.length, result = startValue;
  for (i = 0; i < length; i = i + 1) {
    result = callback.call(null, result, arr[i], i, arr);
  }
  return result;
};
```

В нативном методе указывать значение `this` нельзя, поэтому вместо введения в функцию ещё одного аргумента `thisArg` мы просто передаём `null` в вызов функции. 

Протестируем написанную нами функцию `reduce` на предыдущих примерах, чтобы убедиться, что всё работает, как мы и ожидаем.
```javascript
var arrs = [[1, 2, 3], [4, 5], [6], [7, 8], [9, 10, 11]];
var strs = ['JavaScript', 'is', 'awesome'];

var strResults = reduce(strs, function(phrase, word, index) {
  return (index === 0) ? phrase + word : phrase + ' ' + word;
}, '');

var arrResults = reduce(arrs, function(result, current) {
  return result.concat(current);
}, []);

console.log(strResults); // JavaScript is awesome
console.log(arrResults); // [1,2,3,4,5,6,7,8,9,10,11]
```