---
layout: post

title:  "ES6: Реструктуризующее присваивание"
categories: JavaScript
author: "Виталий Ртищев"
date:   2016-01-11 16:50:58 +0300
type: article

comments: true
identifier: es6-destructuring

prevTitle: "Параметры по умолчанию"
prevLink: "http://jsraccoon.ru/es6-defaults/"

nextTitle: "Интерполяция"
nextLink: "http://jsraccoon.ru/es6-interpolation/"

description: "<i>Destructuring</i> или <i>реструктуризующее присваивание</i> призвано существенно уменьшить количество кода, необходимого для извлечения данных из массивов и объектов. С помощью одной строчки кода теперь можно создать несколько переменных."
---

Скорее всего, вы уже видели несколько примеров использования реструктуризующего присваивания, или *destructuring*. Данная синтаксическая конструкция используется для извлечения данных из массивов и объектов. 

Чтобы вас не смущало такое хитрое название, можно представить процесс, не как *разложение* объекта или массива на его составляющие, а как простое *структурированное* присваивание. Проще всего понять новую синтаксическю конструкцию можно, рассмотрев пример из прошлого:
{% highlight javascript %}
// Структурированное присваивание для массивов
var arr = ['this', 'is', 'array'];
var first = arr[0], 
    second = arr[1], 
    third = arr[2];

console.log(first, second, third); // this is array

// Структурированное присваивание для объектов
var obj = {
  a: 'this',
  b: 'is',
  c: 'object'
};
var a = obj.a, 
    b = obj.b, 
    c = obj.c;

console.log(a, b, c); // this is object
{% endhighlight %} 

Проще говоря, раньше приходилось записывать каждую переменную по отдельности вручную. А если приходилось иметь дело с динамическими данными, то могла понадобиться и ещё одна дополнительная переменная:
{% highlight javascript %}
var f = function() {
  return ['this', 'is', 'array'];
};

var tmp = f(),
    first = tmp[0], 
    second = tmp[1], 
    third = tmp[2];

console.log(first, second, third); // this is array
{% endhighlight %} 

С релизом ES6 всё стало в разы проще:
{% highlight javascript %}
var f = function() {
  return ['this', 'is', 'array'];
};

// ES6 destructuring для массивов
var [ first, second, third ] = f();

console.log(first, second, third); // this is array
{% endhighlight %}

## Destructuring с объектами
Создание нескольких переменных одновременно из объекта настолько же простое, как и из массива. Если вы хотите создать переменную с тем же именем, что и свойство объекта, то можно использовать сокращенную конструкцию:
{% highlight javascript %}
var obj = {
  a: 'this',
  b: 'is',
  c: 'object'
};
var { a, b, c } = obj;

console.log(a, b, c); // this is object
{% endhighlight %}

В другом случае, когда имя переменной отличается от свойства, используется полный вариант:
{% highlight javascript %}
var obj = {
  a: 'this',
  b: 'is',
  c: 'object'
};

var { a: x, b: y, c: z } = obj;

// Данные записаны в переменные x, y и z
console.log(x, y, z); // this is object

// Переменных a, b, c не существует
console.log(a, b, c); // ReferenceError
{% endhighlight %}

Важно понимать отличие *реструктуризующего присваивания* от создания объекта с помощью литерала:
{% highlight javascript %}
// Создание объекта 
var a = 10, b = 20;
var obj = { x: a, y: b };
console.log(obj.x, obj.y); // 10 20
{% endhighlight %}

Создавая объект с помощью литерала, вы следуете правилу: справа находится свойство, слева − значение `{ свойство: значение }`. Подобное присваивание свойств интуитивно понятно, так как можно представить его, как обычное присваивание значение переменной `переменная = значение`. 

Однако, когда вы используете *реструктуризующее присваивание*, названное выше правило действует в точности наоборот `{ значение: свойство }`. 
{% highlight javascript %}
var a = 10, b = 20;
var obj = { x: a, y: b };
var       { x: A, y: B } = obj;
console.log(A, B); // 10 20
{% endhighlight %}

В случае `var obj = { x: a, y: b }` x и y представляют свойства объекта. В случае `var { x: A, y: B } = obj;` x и y **тоже** представляют свойства. 

### Присваивание при отсутствии свойства
Если переданного вами свойства нет в объекте, то вы получите переменную, содержащую `undefined`:
{% highlight javascript %}
var obj = { a: 1 };
// у объекта нет свойства y
var { x: a, y: b } = obj;
// переменной y будет присвоено undefined
console.log(x, y); // 1 undefined
{% endhighlight %}

### Вложенность
*Реструктуризующее присваивание* можно использовать с любым уровнем вложенности:
{% highlight javascript %}
var o = { zero: [{ one: 1, two: 2 }, { three: 3, four: 4 } ], five: 5 };
var { zero: [{ one: first }], five: fifth } = o;

console.log(first, fifth); // 1 5
{% endhighlight %}

### Обращение к свойствам примитивов
Примитивные значения не являются объектами, но обладают свойствами и методами, которые можно получить с помощью *реструктуризующего присваивания*:
{% highlight javascript %}
var { length: l, trim: t } = 'this is string';
console.log(l); // 14
console.log(t); // String.prototype.trim
{% endhighlight %}

## Destructuring с массивами
Выше я уже рассматривал пример применения *destructuring* с массивами. В целом, применение достаточно схоже с объектами, за исключением двух ключевых особенностей:

##### Работает с любыми коллекциями
{% highlight javascript %}
// Строки
var [a, b, c] = 'xyz';
console.log(a, b, b); // x y z

// Коллекции DOM элементов
// Первые две ссылки со страницы
var [link1, link2] = document.links;
console.log(link1.tagName); // A
console.log(link2.textContent); // текстовое содержание ссылки
{% endhighlight %}

##### Можно использовать [оператор spread](http://jsraccoon.ru/es6-spread-rest/) при присваивании
{% highlight javascript %}
var [a, b, ...c] = [1, 2, 3, 4, 5];
console.log(a, b, c); // 1 2 [3, 4, 5]
{% endhighlight %}
В данном случае переменные a и b получат соответственно значения `1` и `2`, а переменная c все оставшиеся значения в виде массива `[3, 4, 5]`.

## Параметры по умолчанию
При использовании *реструктуризующего присваивания* можно задать [параметры по умолчанию](http://jsraccoon.ru/es6-defaults/), на случай, если массив или объект не содержат присваиваемого свойства:
{% highlight javascript %}
// Без параметра по умолчанию
var [x, y, z] = [1, 2];
console.log(x, y, z); // 1 2 undefined

// С использованием параметра по умолчанию
var [x, y, z = 3] = [1, 2];
console.log(x, y, z); // 1 2 3
{% endhighlight %}

Также, как и в случае с функциями, в качестве параметра по умолчанию можно передать выполнение какой-либо функции:
{% highlight javascript %}
var calc = function(num) {
  return Math.pow(num, 2);
};

var { prop: x, pow: y = calc(x)} = { prop: 4 };
console.log(x, y); // 4 16

var { prop: x, pow: y = calc(x)} = { prop: 4, pow: 10 };
console.log(x, y); // 4 10
{% endhighlight %}