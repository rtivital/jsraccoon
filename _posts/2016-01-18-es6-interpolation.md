---
title:  "ES6: Интерполяция"
date:   2016-01-18 16:50:58 +0300
identifier: es6-interpolation
categories: JavaScript

prevTitle: "Реструктуризующее присваивание"
prevLink: "http://jsraccoon.ru/es6-destructuring/"

description: "С выходом стандарта ES6 появилась возможность использовать строковую шаблонизацию. Новый вид строк, создаваемый с помощью символов <code>`</code> поддерживает интерполяцию переменных и любых логических выражений."
---

Если вы используете в своей работе Sass, или любой другой CSS-препроцессор, то понятие интерполяции вам уже знакомо:
{% highlight scss %}
// Интерполяция в scss
$var: 'awesome';
.#{$var}-selector {
	display: flex;
}
// CSS код после компиляции
.awesome-selector {
	display: flex;
} 
{% endhighlight %}

Интерполяция в JavaScript работает схожим образом. В строке создаётся конструкция `${...}`, внутри которой вы можете поместить любую переменную или выражение:
{% highlight javascript %}
var age = 25;
console.log(`I am ${age} years old`); // I am 25 years old

// Эквивалентно
console.log('I am ' + age + 'years old'); // I am 25 years old
{% endhighlight %}

**Важно**: строки, созданные с помощью обычных кавычек (`'` и `"`) не поддерживают интерполяцию. Для поддержки интерполяции следует использовать обратную кавычку \` (клавиша `ё` на клавиатуре):
{% highlight javascript %}
var age = 25;
// С обычными кавычками интерполяция не поддерживается
console.log('I am ${age} years old'); // I am ${age} years old
console.log("I am ${age} years old"); // I am ${age} years old
// Поддерживается только с обратными
console.log(`I am ${age} years old`); // I am 25 years old
{% endhighlight %}

## Интерполяция выражений
С помощью интерполяции в строку можно поместить результат выполнения любого выражения, например, вызов функции:
{% highlight javascript %}
const up = (str) => str.toUpperCase();
let str = `this is ${ up('sting') } in uppercase`;
console.log(str); // this is STRING in uppercase
{% endhighlight %}

или более сложных выражений:
{% highlight javascript %}
const sum = (...args) => `Sum is equal ${args.reduce((start, arg) => start + arg, 0)}`;

console.log(sum(12, 23, 32)); // Sum is equal 67
{% endhighlight %}

## Вложенная интерполяция
Скорее всего, будут возникать ситуации, когда одного уровня интерполяции будет недостаточно. В подобных случаях удобно пользоваться вложенностью (интерполяция внутри интерполяции). Следует помнить, что весь код, находящийся внутри `${...}` интерпретируется, как отдельное выражение, то есть может содержать обратные кавычки, которые не будут восприняты, как конец строки:
<figure class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kr">const</span> up = (str) => str.toUpperCase();
<span class="kd">let</span> user = <span class="s1">'user'</span>;
<span class="kd">let</span> str = `these ${up(`${user}s`)} are great`;
console.log(str); <span class="c1">// these USERS are great</span>
</code></pre></figure>

В переменной `str` используется вложенная интерполяция. Используя, старый стандарт код можно переписать следующим образом:
{% highlight javascript %}
var user = 'user';
var str = 'these ' + up(user + 's') + ' are great';
console.log(str); // these USERS are great
{% endhighlight %}
