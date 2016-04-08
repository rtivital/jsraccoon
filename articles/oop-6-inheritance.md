# Объектно-ориентированный JavaScript: наследование

Представьте, вы получили заказ на создание небольшой онлайн игры. Всё что от вас требуется — создать понятный API для работы с персонажами. Техническое задание выглядит следующим образом:

> Всего в игре три класса героев: люди, орки и эльфы. Каждый герой, независимо от его принадлежности к какому-либо классу, имеет свой запас здоровья, опыта и силы удара, а также может ходить и бегать. У каждого класса есть своя особенность: люди умеют строить небольшие сооружения для своей защиты, орки, увидев красный цвет, впадают в ярость и становятся в несколько раз сильнее, эльфы же умеют стрелять из лука и способны поразить врага на расстоянии.

#### Основа
Для создания подобной системы персонажей вам потребуется, как минимум, три функции конструктора: `Human`, `Orc` и `Elf`. Но, если вы внимательно прочитали присланное заказчиком задание, то уже знаете, что любой персонаж обладает одинаковым набором свойств и методов и лишь дополняется каким-то отдельным качеством в зависимости от принадлежности к определённому классу. 

Именно в таких случаях и удобно воспользоваться преимуществами наследования. Поэтому, чтобы не повторять один и тот же код для каждого конструктора, можно создать ещё один класс персонажей, от которого и будет происходить наследование всех остальных:

```javascript
var Character = (function() {
  
  var Character = function(settings) {
    this.name = settings.name;
    this.health = settings.health || 100;
    this.exp = settings.exp || 0;
    this.strength = settings.strength || 1;
  };

  Character.prototype.walk = function(steps) {
    console.log(this.name + ' walked ' + steps + ' steps');
  };

  Character.prototype.run = function(steps) {
    console.log(this.name + ' ran ' + 2 * steps + ' steps');
  };

  return Character;
})();
```

Теперь мы можем создавать базовую заготовку для любого персонажа, используя модуль `Character` и конструктор `Character`:

```javascript
var character = new Character({
  name: 'John',
  strength: 15,
  exp: 10
});
console.log(character); // {"name":"John", "health":100, "exp":10, "strength":15}
character.walk(10);     // John walked 10 steps
character.run(40);      // John ran 80 steps
```

Заготовка для всех персонажей создана, и мы можем приступать к созданию отдельных классов. Начнём с людей и модуля `Human`. Мы знаем, что любой персонаж, принадлежащий к классу людей, умеет строить сооружения для защиты. Для этого отлично подойдёт метод `build`: 

```javascript
var Human = (function() {
  
  var Human = function(settings) {};

  Human.prototype.build = function(buildingStrength) {
    this.health += buildingStrength;
  };

  return Human;
})();
```

Человек, созданный с помощью конструктора `Human` теперь умеет строить здания определённой прочности и тем самым увеличивать свой запас здоровья. Отлично, мы уже на полпути! Или нет? Свойства `health` у человека пока что нет, поэтому и вся наша конструкция бесполезна. Разумеется, мы бы могли вручную создать все необходимые свойства для каждого класса персонажей:

```javascript
var Human = (function() {
  
  var Human = function(settings) {
    this.name = settings.name;
    this.health = settings.health || 100;
    this.exp = settings.exp || 0;
    this.strength = settings.strength || 1;
  };

  return Human;
})();
```

Но, в таком случае, нам придется дублировать код с присваиванием свойств в каждом конструкторе, поддержка кода заметно усложнится, если, например, у нас будет не 3, а 20 классов героев. Именно для упрощения поддержки и уменьшения количества кода мы и создали конструктор-заготовку. Всё, что нам остаётся сделать — вызвать конструктор `Character` внутри конструктора `Human`:

```javascript
var Human = (function() {
  
  var Human = function(settings) {
    Character.apply(this, arguments);
  };

  Human.prototype.build = function(buildingStrength) {
    this.health += buildingStrength;
  };

  return Human;
})();
```

Теперь любой объект, созданный с помощью конструктора `Human`, обладает свойствами `health`, `name`, `exp` и `strength`. В этом легко убедиться:

```javascript
var human = new Human({
  name: 'Snow',
  exp: 40,
  strength: 25
});

console.log(human); // {"name":"Snow", "health":100, "exp":10, "strength":15}
```

Разумеется, мы можем использовать и созданный нами ранее метод `build`:

```javascript
console.log(human.health); // 100
human.build(10);           
console.log(human.health); // 110
human.build(120);
console.log(human.health); // 230
```

#### apply и call

Методы `run` и `walk`, которые мы хотели унаследовать от конструктора `Character` всё ещё не доступны для использования. Чтобы разобраться, почему именно так, нужно понять принцип работы метода функций `apply`. 

Итак, у нас есть конструктор `Character`, который при вызове с оператором `new` выдаст нам полностью рабочий объект со всеми свойствами и методами, как это было показано выше. Но не стоит забывать, что `Character` также является обычной функцией, то есть мы можем вызвать её и без использования оператора `new`:

```javascript
Character({
  name: 'John',
  health: 20,
  strength: 10,
  exp: 50
});
```

Что произойдёт в таком случае? Если вы подобным образом используете функцию в глобальной области видимости, то глобальному объекту `window` будут записаны 4 свойства:

```javascript
console.log(window.name);     // 'John'
console.log(window.health);   // 20
console.log(window.strength); // 10
console.log(window.exp);      // 50
```

Другими словами, вы просто создадите глобальные переменные. Функция `Character` использует `this` для обращения к текущему объекту. А в глобальной области видимости `this` будет ссылаться на объект `window`. Таким образом, всё, что делает функция `Character`, — присваивает значения объекту, на который ссылается `this` при вызове функции. Именно это нам и нужно.

Неплохо было бы вызвать функцию `Character` в конструкторе `Human`, чтобы быстро записать все свойства в текущий объект. Если вы попробуете вызвать `Character` напрямую, то с удивлением обнаружите, что ни одно свойство не было записано в объект:
```javascript
var Human = (function() {
  var Human = function(settings) {
    Character(settings);
  };
  return Human;
})();

var human = new Human({health: 10});

console.log(human); // {}
```

Вместо этого все четыре свойства опять были записаны в объект `window`. Оказалось, что `this` не такой умный, как мы ожидали. Но, разумеется, мы можем исправить подобную ситуацию и самостоятельно задать контекст выполнения любой функции с помощью методов `call` или `apply`. Оба метода первым аргументом принимают значение, которое будет использовано функцией в качестве `this`. Далее в метод `call` можно передать список аргументов, с которым будет вызвана функция:

```javascript
var Human = (function() {
  var Human = function(settings) {
    Character.call(this, settings);
  };
  return Human;
})();

var human = new Human({name: 'John', health: 10});

console.log(human); // {name: "John", health: 10, exp: 0, strength: 1}
```

Метод `apply` работает схожим образом, но вместо списка аргументов принимаем массив (или любую другую массивоподобную структуру) и формирует из него тот же список аргументов. Подобное поведение бывает полезным, когда мы хотим передать вызываемой функции все аргументы из текущей. Сделать это можно с помощью псевдомассива аргументов `arguments`:

```javascript
var Human = (function() {
  var Human = function(settings) {
    Character.apply(this, arguments);
  };
  return Human;
})();

var human = new Human({name: 'John', health: 10});

console.log(human); // {name: "John", health: 10, exp: 0, strength: 1}
```

В нашем случае предпочтительней использовать метод `apply`, чтобы передавать в функцию `Character` все аргументы, а не только объект настроек. Ведь, возможно, в будущем мы захотим доработать обе функции и добавить несколько новых аргументов.

Чтобы окончательно понять принцип работы метода `apply`, попробуте использовать его с любой функцией, принимающей неограниченное число аргументов. Например, функция `Math.max`, которая находит максимальное переданное ей число:

```javascript
Math.max(2, 1, 4, 10, 4, 5, 1, 2); // 10
```

С помощью `apply` функцию можно заставить работать с массивами:
```javascript
Math.max.apply(null, [2, 1, 4, 10, 4, 5, 1, 2]); // 10
```

Так как функция не использует `this`, то первым параметром передать можно всё, что угодно:
```javascript
Math.max.apply(Math, [2, 1, 4, 10, 4, 5, 1, 2]); // 10
Math.max.apply({}, [2, 1, 4, 10, 4, 5, 1, 2]); // 10
```

#### Наследование

Как я уже писал выше, мы хотим сделать так, чтобы конструктор `Human` не только имел все те же свойства, что и `Character`, но и мог использовать все методы из его прототипа: `walk` и `run`. Подобное наследование осуществить очень просто: всё, что нужно сделать — переназначить прототип конструктора `Human`:
```javascript
var Human = (function() {
  var Human = function(settings) {
    Character.apply(this, arguments);
  };

  Human.prototype = Object.create(Character.prototype);
  Human.prototype.constructor = Character;

  Human.prototype.build = function(buildingStrength) {
    this.health += buildingStrength;
  };

  return Human;
})();

var human = new Human({name: 'John', health: 10});

console.log(human.health); // 10
human.build(10);
console.log(human.health); // 20
human.walk(10); // John walked 10 steps
human.run(50);  // John ran 100 steps
```

Метод `Object.create` создаёт новый объект с указанным объектом прототипа. Таким образом мы можем использовать методы конструктора `Human`, когда они доступны, а в случае, если их нет, то будем обращаться уже к методам конструктора `Character`. Подробнее о том, как происходит определение того, какое именно свойство или метод будет использован, можно прочитать в статье о [прототипах](http://jsraccoon.ru/oop-prototypes). 

Таким образом для реализации наследования достаточно всего двух строчек кода:
```javascript
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Parent;
```

#### Ещё больше наследования

Мы уже написали конструктор `Human`, осталось закончить работу и создать конструкторы для орков и эльфов.

```javascript
var Orc = (function() {
  
  var Orc = function(settings) {
    Character.apply(this, arguments);
  };

  Orc.prototype = Object.create(Character.prototype);
  Orc.prototype.constructor = Character;

  Orc.prototype.getAngry = function(color, times) {
    if (color === 'red') {
      this.damage *= times;
    }
  };

  return Orc;
})();

var Elf = (function() {
  
  var Elf = function(settings) {
    Character.apply(this, arguments);
  };

  Elf.prototype = Object.create(Character.prototype);
  Elf.prototype.constructor = Character;

  Elf.prototype.shoot = function(distance) {
    console.log(this.name + ' shot an arrow to' + distance + ' meters');
  };

  return Elf;
})();
```

#### Итого

1. Используйте метод `apply` для вызова конструктора родителя внутри потомка для записи свойств.
2. Для наследования всех методов из прототипа родителя используйте `Object.create`
3. При наследовании не забывайте явно указывать свойство `constructor`
