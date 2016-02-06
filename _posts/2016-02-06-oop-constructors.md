---
title: "Объектно-ориентированный JavaScript: функции конструкторы"
date: 2016-02-06 15:50:58 +0300
identifier: oop-constructors
categories: JavaScript

prevTitle: "Работа с объектами"
prevLink: "http://jsraccoon.ru/oop-object-base"

description: "Итак, вам нужно создать десяток объектов с одинаковыми свойствами и методами. Как раз для этого есть функции конструкторы, которые позволят не переписывать код для каждого объекта и в значительной степени помогут сэкономить ресурсы."
---

Представьте, у вас есть небольшой магазин. В магазине есть два менеджера, занимающихся продажей ваших товаров. И вы решаете ораганизовать их работу. Для каждого менеджера создаётся отдельный объект:
{% highlight javascript %}
const john = {
  name: 'John',
  sales: 10,
  sell: function(thing) {
    this.sales += 1;
    return 'Manager ' + this.name + ' sold ' + thing;
  }
};
{% endhighlight %}

Итак, один менеджер готов. Джон умеет продавать продавать вещи, знает своё имя и количество продаж.
{% highlight javascript %}
console.log(john.sales); // 10
john.sell('Apple');      // Manager John sold Apple
john.sell('Pomegrade');  // Manager John sold Pomegrade
console.log(john.sales); // 12
{% endhighlight %}

Остался ещё один:
{% highlight javascript %}
const mary = {
  name: 'Mary',
  sales: 120,
  sell: function(thing) {
    this.sales += 1;
    return 'Manager ' + this.name + ' sold ' + thing;
  }
};
{% endhighlight %}

Это было просто и всё работает хорошо. Или нет? У каждого менеджера есть свой метод `sell`. В том, что он у всех будет разным можно убедиться с помощью сравнения:
{% highlight javascript %}
john.sell === mary.sell; // false
{% endhighlight %}

Это означает, что каждый объект содержит свою собственную копию функции. Под каждую подобную функцию выделяется место в памяти. Представьте, что будет, когда ваш магазин вырастет и пополнится парой сотен менеджеров, для каждого из которых будет необходимо создать отдельный метод. А если и методов будет много? Очевидно, что создавать объекты подобным способом — не самая лучшая затея. Чтобы решить подобную проблему существуют функции конструкторы. 

Как и следует из названия функции конструкторы являются не более чем обычными функциями. Отличие только одно — конструкторы, вызванные с помощью оператора `new` **всегда возвращают объект**. 

Для начала разберёмся, что мы хотим сделать: написать функцию, которая будет возвращать объект со всеми указанными нами свойствами и методами. Написать подобную функцию очень просто:
{% highlight javascript %}
const manager = function(name, sales) {
  return {
    name: name,
    sales: sales,
    sell: function(thing) {
      this.sales += 1;
      return 'Manager ' + this.name + ' sold ' + thing; 
    }
  };
};
{% endhighlight %}

Теперь мы можем создать объекты для двух наших менеджеров с помощью этой функции:
{% highlight javascript %}
const john = manager('John', 10);
const mary = manager('Mary', 120);

console.log(john.sales, mary.sales); // 10 120
john.sell('Apple');      // Manager John sold Apple
mary.sell('Pomegrade');  // Manager Mary sold Pomegrade
console.log(john.sales, mary.sales); // 11 121
{% endhighlight %}

Таким же образом будет работать и функция конструктор:
{% highlight javascript %}
const Manager = function(name, sales) {
  this.name = name;
  this.sales = sales;
  this.sell = function(thing) {
    this.sales += 1;
    return 'Manager ' + this.name + ' sold ' + thing;
  };
};

const john = new Manager('John', 10);
const mary = new Manager('Mary', 120);
{% endhighlight %}

Приведённые выше функции `manager` и `Manager` делают одно и то же, но разными способами. Но функция `Manager` является конструктором, а `manager` — нет. Что это значит? То, что внутри функции `Manager` мы можем пользоваться ключевым словом `this`, которое содержит ссылку на **новый** объект. Другими словами, каждый раз, когда вы вызываете любую функцию с оператором `new`, вы подразумеваете, что будет создан новый объект, к которому можно обратиться с помощью ключевого слова `this` внутри функции. 

Как вы могли заметить, при создании функции-конструктора `Manager` мы не использовали `return`, для того, чтобы вернуть созданный функцией объект. Но в переменных `john` и `mary` всё равно есть объекты. Это значит, что при использовании оператора `new` возвращать что-либо из функции необязательно. Хотя вы можете вернуть **любой** объект, если в этом есть смысл:
{% highlight javascript %}
const Manager = function(name, sales) {
  this.name = name;
  this.sales = sales;
  this.sell = function(thing) {
    this.sales += 1;
    return 'Manager ' + this.name + ' sold ' + thing;
  };
  return {prop: 'Prop of new object'};
};

const john = new Manager('John', 10);
console.log(john); // {"prop":"Prop of new object"}
{% endhighlight %}

Создавая объект с помощью функции-конструктора, вы автоматически присваиваете объекту свойство: `constructor`, которое содержит ссылку на функцию-конструктор, с помощью которой был создан объект:
{% highlight javascript %}
const john = new Manager('John', 10);

console.log(john.constructor); // function Manager(name, sales) { ... };
console.log(john.constructor.name); // Manager
console.log(john instanceof Manager); // true
{% endhighlight %}

Таким образом, с помощью свойства `constructor` можно получить, как саму функцию-конструктор, так и её имя. 

Итак, мы выяснили, что с помощью функций-конструкторов и оператора `new` можно создать объект. Но нашу проблему всё равно не решили. Для каждого нового объекта будет создаваться новая функция, которая будет записываться в метод `sell`. И здесь нам поможет прототип функции `Manager`. Перейдём сразу к делу:
{% highlight javascript %}
const Manager = function(name, sales) {
  this.name = name;
  this.sales = sales;
};

Manager.prototype.sell = function(thing) {
  this.sales += 1;
  return 'Manager ' + this.name + ' sold ' + thing;
};

const john = new Manager('John', 10);
const mary = new Manager('Mary', 120);

console.log(john.sales, mary.sales); // 10 120
john.sell('Apple');      // Manager John sold Apple
mary.sell('Pomegrade');  // Manager Mary sold Pomegrade
console.log(john.sales, mary.sales); // 11 121
{% endhighlight %}

Что вообще происходит? Каждый объект в JavaScript обладает прототипом. Чтобы в этом убедиться, откройте консоль и введите `console.dir([]);`. Открыв свойство `__proto__` вы сможете увидеть все методы для работы с массивами, которые предусмотрены в вашем браузере. Очевидно, что каждый массив поотдельности не снабжается всеми данными методами. Но, тем не менее, мы без проблем можем их использовать, например, `[1, 2, 3].map((n) => n * 2)`. Когда вы используете какой-либо метод массивов, например, `map` или `forEach`, то вы подразумеваете, что этот метод будет взят из прототипа функции-конструктора `Array`. Любой массив может использовать все методы, записанные в прототип конструктора `Array`, хотя у самого массива нет ни одного метода. Таким образом, любой объект получает возможность использовать все методы, записанные в прототипе его функции-конструктора. 

Само свойство `prototype` является не более чем обычным объектом, поэтому, если вы хотите сразу же записать несколько методов а прототип, то пример выше можно переписать следующим образом:
{% highlight javascript %}
const Manager = function(name, sales) {
  this.name = name;
  this.sales = sales;
};

Manager.prototype = {
  sell: function(thing) {
    this.sales += 1;
    return 'Manager ' + this.name + ' sold ' + thing;
  },
  speak: function(word) {
    return this.name + ' says ' + word;
  }
};

const john = new Manager('John', 10);
const mary = new Manager('Mary', 120);

john.sell('Apple'); // Manager John sold Apple
mary.speak('Hello!'); // Mary says Hello!
{% endhighlight %}

Как и при работе внутри функции-конструктора `this` содержит ссылку на текущий экземпляр объекта, поэтому им можно пользоваться во всех объявляемых в прототипе методах.

Теперь мы решили проблему: теперь все методы находятся в прототипе и могут быть использованы каждый созданным объектом, но при этом объявляются всего один раз.
{% highlight javascript %}
console.log(john.sell === mary.sell); // true
console.log(john.speak === mary.speak); // true
{% endhighlight %}

Подобным образом мы можем создать любое количество объектов с помощью функции конструктора `Manager` и оператора `new` и всем им будут доступны методы из прототипа `Manager`.