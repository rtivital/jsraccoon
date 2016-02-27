# Объектно-ориентированный JavaScript: работа с объектами

В [прошлой статье](http://jsraccoon.ru/oop-primitives) мы выяснили, что не всё в JavaScript является объектом, и все данные разделяются на примитивы и объекты. В этой статье рассмотрим способы создания объектов, что такое методы, свойства, как их присваивать, способы итерации по всем свойствам объектов и использование ключевого слова `this`.

##### Запись и чтение свойств и методов
Обычно создание объекта выглядит следующим образом:
```javascript
const obj = {};
```

После создания объекта в него можно добавлять любые свойства и методы двумя способами:
```javascript
const obj = {};

// Первый способ добавления свойств и методов к объекту
obj.prop = 'this is object property';
obj.method = function() {
  return 'this is object method';
};

// Второй способ добавления свойств и методов к объекту
obj['prop2'] = 'this is second object property';
obj['method2'] = function() {
  return 'this is second object method';
};
```

На самом деле, нет никаких причин разделять содержимое объекта на две разные категории (свойства и методы). Технически, всё, что содержится в объекте называется его свойствами. В этом можно убедиться создав объект, в который будут записаны уже существующие данные:
```javascript
const log = function(message) { console.log(message); };
const nums = [10, 20, 30, 40, 50];

const obj = {};
obj.log = log;
obj.nums = nums;  
```

Таким образом, каждое **свойство** объекта просто ссылается на определенные данные, в независимости от того, что они содержат: примитивы, другие объекты, массивы или функции. Тем не менее, свойства объектов, которые ссылаются на любую функцию, в том числе и анонимную, принято называть методами, хотя подобные свойства ничем не отличаются от всех остальных. 

Добавлять методы и свойства в объекты можно прямо при их создании:
```javascript
const obj = {
  prop: 'this is property',
  method: function() {
    return 'this is method';
  }
};
```

Получить записанные в объект методы и свойства можно также получить двумя способами:
```javascript
const obj = {
  prop: 'this is property',
  method: function() {
    return 'this is method';
  }
};

obj.prop; // "this is property"
obj.method(); // "this is method"

obj['prop']; // "this is property" 
obj['method'](); // "this is method"
```

##### Итерация по свойствам объекта
Итак, вы создали объект, в котором есть несколько свойств. Теперь вы хотите последовательно выполнять с ними операции. Для подобных случаев есть цикл `for .. in`:
```javascript
const employee = {
  name: 'John',
  phone: '+7 (765) 000-98-34',
  company: 'Opera Software',
  email: 'john@opera.com',
  duties: ['Frontend', 'Optimization', 'Testing']
};

for (let key in employee) {
  console.log(key + ': ' + employee[key]);
}

// Выведет
// name: John
// phone: +7 (765) 000-98-34
// company: Opera Software
// email: john@opera.com
// duties: Frontend, Optimization, Testing
```

Любой объект условно можно разделить на две части: ключи и значения. Для объекта `employee` ключами будут: `name`, `phone`, `company`, `email` и `duties`, а значениями: `'John'`, `'+7 (765) 000-98-34'`, `'Opera Software'`, `'john@opera.com'` и `['Frontend', 'Optimization', 'Testing']`. При использовании цикла `for .. in` задаётся переменная, которую обычно называют `key`. С помощью этой переменной в теле цикла можно последовательно получить каждый ключ из итерируемого объекта. Чтобы получить соответствующее ключу значение в теле цикла всегда следует использовать форму записи `obj[key]`. 

Почему нельзя использовать форму `obj.key`? Всё просто. Используя такую запись вы подразумеваете, что хотите получить значение свойства `key` итерируемого объекта, а не значение соответствующее данному ключу. 
```javascript
const employee = {
  name: 'John',
  phone: '+7 (765) 000-98-34',
  company: 'Opera Software',
  email: 'john@opera.com',
  key: 'this is key property in object'
};

for (let key in employee) {
  console.log(key + ': ' + employee.key);
}

// Выведет
// name: this is key property in object
// phone: this is key property in object
// company: this is key property in object
// email: this is key property in object
// key: this is key property in object
```

##### Object.keys
Другой способ итерации по объекту — заранее получить все ключи объекта в виде массива и провести итерацию с помощью любого [перебирающего метода массивов](http://jsraccoon.ru/fn-array-methods).

Для того, чтобы получить массив ключей из объекта, нужно воспользоваться функцией `Object.keys`:
```javascript
const employee = {
  name: 'John',
  phone: '+7 (765) 000-98-34',
  company: 'Opera Software',
  email: 'john@opera.com'
};

const keys = Object.keys(employee);
console.log(keys); // ["name","phone","company","email","key"]
```

После того, как желаемый массив был получен, его можно перебрать, например, с помощью метода `forEach`:
```javascript
keys.forEach(function(key) {
  console.log(key + ': ' + employee[key]);
});

// Выведет
// name: John
// phone: +7 (765) 000-98-34
// company: Opera Software
// email: john@opera.com
```

К сожалению подобным образом получить массив всех значений объекта не получится: функции `Object.values()` не существует. Но её легко можно заменить методом `map` в паре с `Object.keys()`:
```javascript
const values = keys.map(function(key) {
  return employee[key];
});

console.log(values); // ["John","+7 (765) 000-98-34","Opera Software","john@opera.com"]
```

##### Ключевое слово this
При работе с объектами очень часто бывает необходимо получить ссылку на сам объект внутри метода. Для таких целей конечно можно использовать имя самого объекта:
```javascript
const obj = {
  a: 10,
  b: function (num) {
    console.log(obj.a + num);
  }
};

obj.b(10); // 20
```

Тем не менее, подобный способ накладывает на себя очень неприятные ограничения, которые будут подробно рассмотрены в следующей статье. Например, нельзя задать контекст выполнения метода с помощью `call` или `apply`. 

Более правильно для всех методов объекта использовать ключевое слово `this`. Переписать пример, приведенный выше можно следующим образом:
```javascript
const obj = {
  a: 10,
  b: function (num) {
    console.log(this.a + num);
  }
};

obj.b(100); // 110
```

`this` всегда содержит ссылку на объект, в котором находится. В данном примере `this` ссылается на объект `obj`.