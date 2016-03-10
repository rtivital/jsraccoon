# Объектно-ориентированный JavaScript: дескрипторы

Над каждым свойством любого объекта в JavaScript можно провести определённый набор манипуляций. Свойство можно записать, изменить, получить значение, а с помощью цикла `for .. in` или метода `Object.keys` перечислить все свойства объекта. Вполне стандартный набор операций для работы с объектами, к которому вы, скорее всего, уже привыкли. До релиза стандарта ES5 все эти "качества" объекта изменить было невозможно, но теперь для каждого свойства можно детально описать модель его поведения с помощью дескрипторов.

#### Свойства или методы?
В одной из первых статей данного цикла я уже писал, что в JavaScript, на самом деле, нет никакого разделения на свойства и методы: **любая пара ключ: значение является свойством**, в независимости от того, на какой тип данных ссылается ключ. Другими словами, нет никакого разделения значений на функции и всё остальное — то, что обычно называют методом, просто ссылается на функцию, в результате чего свойство можно как бы вызвать. Но, если подумать о том, что происходит "за сценой", то сразу станет понятно, что само свойство вызвать нельзя. В этом  можно легко убедиться, обратившись к методу, как к обычному свойству:

```javascript
const methods = {
  log: function(message) {
    console.log(message);
  }
};

methods.log; // function log(message) { console.log(message); }
```

Таким образом, используя метод, вы выполняете два действия: получение функции из свойства и вызов полученной функции. Понимание того, что методы являются обычными свойствами, важно в контексте изучения дескрипторов, и именно поэтому я ещё раз обратил ваше внимание на подобное поведение.

#### Дескрипторы
Дескрипторы позволяют описать, как будет вести себя свойство при выполнении определённых операций над ним, например, чтения или записи. Всего у каждого свойства есть шесть дескрипторов: 

1. `value` — значение свойства
2. `writable` — если установлен true, то значение свойства можно изменять
3. `configurable` — если установлен true, то свойство можно перезаписывать с помощью новых вызовов `Object.defineProperty`
4. `enumerable` — если установлен true, то свойство будет перечисляться в цикле `for .. in` и при использовании метода `Object.keys`
5. `get` — функция, которая будет вызвана при запросе к свойству
6. `set` — функция, которая будет вызвана при записе свойства

Получить доступ к изменению дескрипторов можно только используя функции `Object.defineProperty`, которая первым аргументом принимает объект, в который будет записано свойство, вторым — название свойства и третьим — объект содержащий необходимые дескрипторы:

```javascript
const fox = {};

Object.defineProperty(fox, 'name', {
  value: 'Oliver',
  enumerable: true,
  configurable: true,
  writable: true
});

console.log(fox); // { "name": "Oliver" }
```

Если есть необходимость задать сразу несколько свойств за раз, то следует воспользоваться функцией `Object.defineProperties`:
```javascript
const fox = {};

Object.defineProperties(fox, {
  'name': {
    value: 'Oliver',
    enumerable: true
  },

  'type': {
    value: 'fox',
    enumerable: true
  }
});

console.log(fox); // { "name": "Oliver", "type": "fox" }
```

**Важно:** по умолчанию дескрипторы `enumerable`, `configurable` и `writable` установлены в значение `false`, поэтому всегда стоит указывать те дескрипторы, которые вы хотите использовать.


##### Writable
Writable определяет возможность перезаписи значения свойства. Если установлено значение `false`, то перезаписать значение нельзя.

```javascript
const fox = {};

Object.defineProperty(fox, 'name', {
  value: 'Oliver',
  writable: false,
  configurable: true,
  enumerable: true
});

fox.name = 'John'; // Ошибка
// Cannot assign to read only property 'name' of object
```

##### Configurable
Дескриптор configurable определяет, можно ли перезаписать дескрипторы свойства с помощью функции `Object.defineProperty`:

```javascript
const fox = {};

Object.defineProperty(fox, 'name', {
  value: 'Oliver',
  writable: true,
  configurable: false,
  enumerable: true
});

Object.defineProperty(fox, 'name', {
  value: 'John',
  configurable: false,
  enumerable: false
}); // Cannot redefine property: name
```

Свойство будет успешно перезаписано только в том случае, если значения для дескрипторов полностью совпадают с оригинальным присваиванием:
```javascript
const fox = {};

Object.defineProperty(fox, 'name', {
  value: 'Oliver',
  writable: true,
  configurable: false,
  enumerable: true
});

Object.defineProperty(fox, 'name', {
  value: 'John',
  writable: true,
  configurable: false,
  enumerable: true
}); // Свойство было перезаписано


console.log(fox); // { "name": "John" }
```

##### Enumerable
Каждый объект можно перебрать с помощью цикла `for .. in` или же получить названия всех свойств с помощью функции `Object.keys`. Дескриптор enumerable определяет, будет ли свойство перечисляться в данных ситуациях:
```javascript
const fox = {};

Object.defineProperties(fox, {
  'name': {
    value: 'Oliver',
    enumerable: false
  },
  'type': {
    value: 'fox',
    enumerable: true
  }
});

for (let key in fox) {
  console.log(`${key}: ${fox[key]}`); // type: fox
}

Object.keys(fox).forEach(key => {
  console.log(`${key}: ${fox[key]}`); // type: fox
});
```

##### Геттеры и сеттеры
Два самых интересных дескриптора — `get` и `set`, более известные, как геттеры и сеттеры. С их помощью можно запускать обозначенные функции при запросе к получению или записи свойства соответственно. 

```javascript
const fox = {
  _name: 'Oliver',
  _type: 'Fox'
};

Object.defineProperty(fox, 'name', {
  enumerable: true,
  configurable: true,
  get: function() {
    return `${this._type}: ${this._name}`;
  },
  set: function(name) {
    if (!this.previousNames) { this.previousNames = []; }
    this.previousNames.push(this._name);
    this._name = name;
  }
});

fox.name = 'John';
fox.name = 'Doe';

console.log(fox.name); // Fox: Doe

console.log(`Current name: ${fox._name}. Previous names: ${fox.previousNames.join(', ')}`);
// Current name: Doe. Previous names: Oliver, John
```

Таким образом, можно выполнить любой код при присваивании и получении свойства, который даже может быть абсолютно не связан с изменяемым свойством, как в примере выше, где перед тем, как записать новое имя, старое добавляется к массиву.