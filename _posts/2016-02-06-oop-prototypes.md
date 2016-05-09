---
title: "Объектно-ориентированный JavaScript: прототипы"
date: 2016-02-07 12:50:58 +0300
identifier: oop-prototypes
categories: JavaScript

prevTitle: "Функции конструкторы"
prevLink: "http://jsraccoon.ru/oop-constructors"

nextTitle: "Немного практики"
nextLink: "http://jsraccoon.ru/oop-example-validation"

description: "Понимание принципов работы прототипного наследования очень важно для любого JavaScript разработчика. В этой статье расскажем, как создавать методы и свойства, которые будут доступны всем объектам, созданным с помощью одной функции-конструктора."

tags: [javascript, oop]
---

В [прошлой статье](http://jsraccoon.ru/oop-constructors) мы начали рассматривать прототипы и выяснили, что каждый объект может использовать любые методы, которые находятся в функции-конструкторе, с помощью которой данный объект и был создан. Например, обычный массив сам по себе не имеет ни одного метода, но функция конструктор `Array` любезно предоставляет ему все методы из своего прототипа в использование. 
{% highlight javascript %}
console.dir([].__proto__);
// То же самое, что и
console.dir(Array.prototype);
{% endhighlight %}

Разумеется, мы сами можем создавать функции конструкторы и задавать им прототипы. Итак, вы являетесь счастливым владельцем зоопарка. Для каждого животного вы хотите создать объект, содержащий вид и кличку животного. Каждое животное также может издавать звуки. Функция-конструктор в данном случае будет выглядеть следующим образом:
{% highlight javascript %}
const Animal = function(name, species, sound) {
  this.name = name;
  this.species = species;
  this.sound = sound;
};

Animal.prototype.speak = function() {
  return this.species + ' ' + this.name + ' says ' + this.sound + '!';
};
{% endhighlight %}

Теперь мы можем создать один или несколько объектов с помощью функции конструктора `Animal` и оператора `new`:
{% highlight javascript %}
const cat = new Animal('Wizard', 'Cat', 'Meow');
const dog = new Animal('Pancho', 'Dog', 'Woof');
const fox = new Animal('Oliver', 'Fox', '????');
{% endhighlight %}

Каждый созданный нами объект не содержит своего метода `speak`. В этом вы можете убедиться, просто выведя объект в консоль `console.dir(cat)`. Тем не менее, все созданные объекты могут использовать метод `speak`:
{% highlight javascript %}
console.log(dog.speak()); // Dog Pancho says Woof!
console.log(cat.speak()); // Cat Wizard says Meow!
console.log(fox.speak()); // Fox Oliver says ????!
{% endhighlight %}

Что происходит на самом деле. Когда вы используете метод `speak` с объектом, сначала происходит проверка того, есть ли у самого объекта этот метод. Если метода нет, то далее следует проверка на присутствие метода в прототипе. Если метода нет и в прототипе, то метод может быть найден в прототипе прототипа. И так далее, пока выполнение не дойдёт до последнего прототипа, который всегда содержит в себе все методы функции-конструктора `Object`. Чтобы в этом убедиться попробуйте выполнить в консоле браузера несколько строчек кода:
{% highlight javascript %}
// Прототипы для чисел
console.dir((10).__proto__); // Number
console.dir((10).__proto__.__proto__); // Object

// Прототипы для строк
console.dir('str'.__proto__); // String
console.dir('str'.__proto__.__proto__); // Object

// Прототипы для объектов
console.dir([].__proto__); // Array
console.dir([].__proto__.__proto__); // Object

// Прототипы для созданной нами функции-конструктора Animal
console.dir(cat.__proto__); // Animal
console.dir(cat.__proto__.__proto__); // Object
{% endhighlight %}

Таким образом, созданный нами объект `cat` унаследовал все методы не только от функции `Animal`, но и от `Object`. В этом легко убедиться с помощью использования любого метода объектов, например, `toString()`:
{% highlight javascript %}
console.log(cat.toString()); // "[object Object]"
{% endhighlight %}

Как я уже писал выше, при использовании любого метода сначала проверяется его наличие в самом объекте. Поэтому мы может сами переназначить тот же метод `toString` для отдельного объекта `cat`:
{% highlight javascript %}
const cat = new Animal('Wizard', 'Cat', 'Meow');
const dog = new Animal('Pancho', 'Dog', 'Woof');

cat.toString = function() {
  return this.species + ' ' + this.name;
};

console.log(cat.toString()); // Cat Wizard
console.log(dog.toString()); // "[object Object]"
{% endhighlight %}

Или же можно записать данный метод в прототип `Animal`, чтобы все создаваемые с помощью этой функции-конструктора объекты использовали именно его:
{% highlight javascript %}
Animal.prototype.toString = function() {
  return 'This is ' + this.species + ' ' + this.name;
};

cat.toString = function() {
  return this.species + ' ' + this.name;
};

const cat = new Animal('Wizard', 'Cat', 'Meow');
const dog = new Animal('Pancho', 'Dog', 'Woof');
const fox = new Animal('Oliver', 'Fox', '????');

console.log(cat.toString()); // Cat Wizard
console.log(dog.toString()); // This is Dog Pancho
console.log(fox.toString()); // This is Fox Oliver
{% endhighlight %}

Теперь объекты `dog` и `fox` обращаются к прототипу `Animal`, а объект `cat` имеет собственный метод и использует его.

Есть два способа устанавливать свойства в прототипы для объектов: плохой и хороший. Хороший способ вы уже видели — все примеры приведённые выше написаны с его помощью.
{% highlight javascript %}
Animal.prototype.speak = function() { /* code here */ };
Animal.prototype.toString = function() { /* code here */ };
{% endhighlight %}

В данном примере к прототипу просто добавляется ещё одно свойство, в независимости от того, что было в прототипе было раньше.

Пример плохого добавления свойств в прототип — непосредственная его перезапись новым объектом:
{% highlight javascript %}
Animal.prototype.toString = function() { /* code here */ };
// ...
Animal.prototype = {
  speak: function() {}
};
{% endhighlight %}

Почему так делать плохо? Всё просто. Перезаписывая прототип новым объектом, вы полностью стираете все методы, которые были записаны в него ранее. Поэтому в приведённом выше примере метода `toString` у всех объектов, созданных с помощью функции-конструктора `Animal`, не будет.
