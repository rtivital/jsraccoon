---
layout: post
comments: true
identifier: es6-block-scoped-declarations
title:  "ES6: Блочные области видимости"
date:   2015-12-28 22:50:58 +0300
categories: JavaScript
author: "Виталий Ртищев"
description: "Долгое время оператор <code>var</code> было единственным способом создания переменных. В статье разберем, что могут предложить новые операторы <code>let</code> и <code>const</code>, а также проблемы, с которыми можно столкнуться при их использовании."
---

До введения стандарта ES6 основой всех [областей видимости](http://habrahabr.ru/post/239863/) являлись функции. У любой функции существует своя область видимости. Проще всего это можно рассмотреть на примере:
{% highlight javascript %}
var num = 10;
var func = function() {
  var num = 20;
  console.log(num); // 20
};
console.log(num); // 10
{% endhighlight %}

Объявленные с помощью ключевого слова `var` переменные внутри функции не влияют на переменные из других областей видимости, в том числе и глобальной. Именно на этом свойстве основана [хорошая практика](http://www.thinkful.com/learn/javascript-best-practices-1/#Avoid-Globals) обворачивания всего кода в [самовызывающуюся анонимную функцию](http://markdalgleish.com/2011/03/self-executing-anonymous-functions/) (self-executing anonymous function):
{% highlight javascript %}
(function() {
  'use strict';
  // Переменные a и b находятся в области видимости 
  // самовызывающейся анонимной функции и не доступны
  // на более высоких уровнях
  var a = 10;
  var b = 20;
  // Для вывода переменной в глобальную область видимости
  // используется подобная конструкция
  window.b = b;
})();

console.log(a); // undefined
console.log(b); // 20
{% endhighlight %}

Подобное решение позволяет полностью контролировать, какие переменные будут переданы в глобальное окружение. Тем не менее, данные правила работали исключительно с функциями, а на другие блочные конструкции не действовали:
{% highlight javascript %}
for (var i = 0; i < 5; i++) {
  console.log('Что-то было сделано ' + i + ' раз'); // 0 1 2 3 4
}

console.log('Переменная i до сих пор доступна и равна ' + i); // 5
{% endhighlight %}

Пример с циклом `for` относительно безвреден и после последней итерации оставляет переменную `i`. Подобное использование цилов широко распространено и, скорее всего, не станет причиной ошибки. Неочевидные вещи начинают появляться при использовании других блочных конструкций:
{% highlight javascript %}
if (true) {
  var a = 10;
}

console.log(a); // 10
{% endhighlight %}

Очевидно, что после запуска данного кода будет создана переменная `a`, содержащая в себе число `10`. Все становится не так очевидно, когда условие переданное в конструкцию `if` не является правдивым:
{% highlight javascript %}
if (false) {
  var a = 10;
}

console.log(a); // ???
{% endhighlight %}

Какой результат можно ожидать? Код внутри конструкции `if` не запускался, а значит и перменная `a` не была инициализирована. Логично предположить, что единственным возможным рещультатом является ошибка (попытка обратиться к несуществующей переменной обычно выдает `ReferenceError`). Тем не менее, подобной ошибки не возникает и в консоль выводится `undefined`. Такое поведение объясняется [поднятием переменных](http://habrahabr.ru/post/127482/) (hoisting). Конструкция, указанная выше, интерпретируется следующим образом:
{% highlight javascript %}
var a;
if (false) {
  a = 10;
}

console.log(a); // undefined
{% endhighlight %}

## Оператор let
С релизом стандарта ES6 появилась возможность создавать переменные, приуроченные к отдельным блокам. Это означает, что для создания лексического окружения (scope) достаточно просто обвернуть код в фигурные скобки: `{ ... }`:
{% highlight javascript %}
var a = 10;

{
  let a = 20;
  console.log(a); // 20
}

console.log(a); // 10
{% endhighlight %}

Скорее всего, вы никогда не будете использовать конструкцию, показанную выше, но, тем не менее, она является абсолюно валидной и позволяет наглядно продемонстрировать создание нового лексического окружения.

Таким образом при выполнение следущего кода переменная `i` не будет доступна вне цикла:
{% highlight javascript %}
for (let i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}

console.log(i); // ReferenceError: i is not defined
{% endhighlight %}

Подобное поведение будется наблядаться и в других блочных конструкциях:
{% highlight javascript %}
if (true) {
  let num = 10;
  console.log(num); // 10
}

console.log(num); // ReferenceError: num is not defined
{% endhighlight %}

### Hoisting
При использовании ключевого слова `let` происходит поднятие переменных (hoisting). Но сам процесс поднятия реализуется совершенно другим образом (вы не получите подобную ошибку, используя [Babel](https://babeljs.io/) или другой "переводчик" кода, так как все `let` будут заменены на `var`):
{% highlight javascript %}
if (true) {
  console.log(b);
  let b = 10; // ReferenceError: b is not defined
}
{% endhighlight %} 
Запустив подобный пример вы скорее всего можете прийти к выводу, что поднятия не происходит. Это не так. Для того, чтобы убедиться в наличии поднятия достаточно объявить еще одну переменную вне блока:
{% highlight javascript %}
let b = 20;
if (true) {
  console.log(b);
  let b = 10; // ReferenceError: b is not defined
}
{% endhighlight %}
Несмотря на то, что переменная `b` была объявлена вне блока и, таким образом, должна быть доступна, результатом выполнения кода все равно является `ReferenceError`. Подобное поведение называется ["временной мёртвой зоной"](http://css-live.ru/articles/es6-let-const-i-vremennaya-myortvaya-zona-vmz-iznutri.html). 

При запуске кода из блока происходит резервирование имён всех переменных объявленных в любом месте блока. Таким образом, несмотря на наличие внешней переменной результатом выполнения кода будет `ReferenceError`. Чтобы избежать подобных ошибок, всегда объявляйте все используемые переменные в самом начале блока:
{% highlight javascript %}
if (true) { let num = 20;
  console.log(num); // 20
}
{% endhighlight %}

Временная мёртвая зона не распространяется на функции до первого их вызова:
{% highlight javascript %}
var f = function() {
  return num;
};

let num = 10;
console.log(f()); // 10
{% endhighlight %}

Тем не менее, если вы попытаетесь вызвать функцию `f` до того, как будет объявлена переменная `num`, то всё равно получите ошибку:
{% highlight javascript %}
var f = function() {
  return num;
};

console.log(f()); // ReferenceError: num is not defined
let num = 10;
{% endhighlight %}

## Оператор const
Оператор `const`, как и `let`, работает с блочными областями видимости (также подвергается правилам временной мёртвой зоны) и предназначен для создания *констант* - переменных, для которых доступно только чтение после их инициализации:
{% highlight javascript %}
{
  const num = 10;
  console.log(num); // 10
  num = 20; // TypeError: 'num' is read-only
}
{% endhighlight %}
Новое присваивание значения переменной `num` выведет ошибку (если вы выполните данный код на последний на данный момент версии node.js, то ошибки не получите - на момент написания статьи node.js ещё не поддерживает данную возможность). 

Таким образом, значение, записанное в переменную при её инициализации, невозможно изменить с помощью присваивания. Создание новых переменных с таким же именем также выведет ошибку:
{% highlight javascript %}
const a = 20;
let a = 10; // TypeError: 'a' is read-only
{% endhighlight %}

Заново инициализировать переменную с помощью оператора `const` тоже не получится:
{% highlight javascript %}
let a = 10;
const a = 10; // TypeError: Identifier 'a' has already been declared
{% endhighlight %}

### Изменение значений
На первый взгяд, может показаться, что всё, что было записано в *константу* невозможно изменить. Но, на самом деле, нельзя менять только литерал или ссылку:
{% highlight javascript %}
const lit = 4;
lit = 5; // TypeError: Литерал изменить нельзя

const obj = { a: 1 };
obj.a = 2; // Значения внутри объекта изменить можно
console.log(obj); // { a: 2 }
obj = { a: 3 }; // TypeError: Ссылку менять нельзя

const arr = [1, 2, 3];
arr.push(4); // Значения внутри массива изменить можно
console.log(arr); // [1, 2, 3, 4]
obj = [4, 3, 2, 1]; // TypeError: Ссылку менять нельзя
{% endhighlight %}

Чтобы сделать константу, содержащую объект, настоящей *константой* слудует использовать `Object.freeze()`.

## Ссылки по теме
* [Перевод](http://css-live.ru/articles/es6-let-const-i-vremennaya-myortvaya-zona-vmz-iznutri.html) статьи [ES6 Let, Const and the “Temporal Dead Zone” (TDZ) in Depth](https://ponyfoo.com/articles/es6-let-const-and-temporal-dead-zone-in-depth) (ES6: Let, Const и «Временная мёртвая зона» (ВМЗ) изнутри) от css-live.ru
* [Временная мёртвая зона](http://jsrocks.org/2015/01/temporal-dead-zone-tdz-demystified/)
* [Object.freeze()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
* [Константы в JavaScript - когда они нужны и где их использовать](http://stackoverflow.com/questions/21237105/const-in-javascript-when-to-use-it-and-is-it-necessary)


