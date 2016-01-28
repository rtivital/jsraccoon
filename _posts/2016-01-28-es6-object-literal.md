---
title: "ES6: Расширение литерала объектов"
date: 2016-01-28 10:50:58 +0300
identifier: es6-object-literal
categories: JavaScript

prevTitle: "Цикл for .. of"
prevLink: "http://jsraccoon.ru/es6-for-of-loop/"

description: "Краткие формы записи свойств и методов объектов немного сократят код и сделают его немного более читабельным относительно аналогичного кода в ES5. Тем не менее новые краткие формы записи накладывают некоторые ограчения при работе с рекурсией и передаче методов объекта в качестве callback функции."
---

##### Краткие свойства объектов
Для того чтобы записать переменную в свойство объекта раньше приходилось придерживаться не самой приятной формы записи:
{% highlight javascript %}
var a = 1, b = 2;
var obj = { a: a, b: b };
{% endhighlight %}

Теперь нет необходимости записывать всё по два раза. Присваивание свойств выглядит следующим образом:
{% highlight javascript %}
let a = 1, b = 2;
let obj = { a, b };
{% endhighlight %}

##### Краткие методы объектов
Краткая форма записи методов реализована схожим образом. 

Было:
{% highlight javascript %}
var obj = {
  a: function() { /* function body */ },
  b: function() { /* function body */ }
};
{% endhighlight %}

Стало:
{% highlight javascript %}
const obj = {
  a() { /* function body */ },
  b() { /* function body */ }
};
{% endhighlight %}

Когда вы используете ES6 вариант методов `a() { /* function body */ }`, то подразумеваете: "Создай метод `a`, который будет содержать в себе анонимную функцию":
{% highlight javascript %}
const obj = {
  a() { /* function body */ }
};
// Эквивалентно
var obj = {
  a: function() { /* function body */ }
}
{% endhighlight %}

На первый взгляд, присваивание имени функции, записываемой в свойство объекта, может показаться таким же бесполезным занятием, как и `{ a: a }` в предыдущем примере. Это не так. Рассмотрим небольшой пример с рекурсией, чтобы понять, в чём заключается разница:
{% highlight javascript %}
// Анонимная функция в методе factorial
var math = {
  factorial: function (num) {
    return num <= 0 ? 1 : num * math.factorial(num - 1);
  }
};

console.log(math.factorial(5)); // 120
{% endhighlight %}

При записи анонимной функции в метод `factorial` единственный способ обратиться к функции — вызвать соответствующий метод объекта `math`. Хорошая ли это идея? Возможно, но, скорее всего, нет. Подобная запись предполагает, что `math` всегда будет указывать на один и тот же объект, что очень часто может оказаться неправильным выводом. Самый простой способ решить подобную проблему — использовать `this`:
{% highlight javascript %}
// Анонимная функция в методе factorial
var math = {
  factorial: function (num) {
    return num <= 0 ? 1 : num * this.factorial(num - 1);
  }
};

console.log(math.factorial(5)); // 120
{% endhighlight %}

Но и в данном случае нельзя получить желаемого результата во всех случаях. Например, при передаче callback функций:
{% highlight javascript %}
document.links[0].addEventListener('click', math.factorial, false); // :(
{% endhighlight %}

Естественно решить подобную проблему можно с помощью метода функций `bind` или замыкания (подробнее о способах передачи аргументов в callback функции можно узнать в [этой статье](http://jsraccoon.ru/tip-callback-args/)):
{% highlight javascript %}
document.links[0].addEventListener('click', math.factorial.bind(math, 10), false); // :)
{% endhighlight %}

В чём, на самом деле, заключается разница между именованной функцией и анонимной:
{% highlight javascript %}
// Именованная функция factorial в методе factorial
var math = {
  factorial: function factorial(num) {
    return num <= 0 ? 1 : num * factorial(num - 1);
  }
};

console.log(math.factorial(5)); // 120
{% endhighlight %}

Теперь к функции `factorial` можно обращаться без лишних "посредников". Разумеется, функция останется недоступная в более высоких областях видимости:
{% highlight javascript %}
console.log(math.factorial(5)); // 120
console.log(factorial(5)); // factorial is not defined
{% endhighlight %}

Таким образом, подобная запись даёт возможность обращаться к функциям без использования их объекта-обвёртки. И именно такое поведение не реализовано в **кратких методах объектов**:
{% highlight javascript %}
// Анонимная функция в методе factorial ES6 вариант
var math = {
  factorial(num) { return num <= 0 ? 1 : num * factorial(num - 1); }
};

console.log(math.factorial(5)); // factorial is not defined
{% endhighlight %}

Данный способ создания методов короче, но может принести с собой ряд проблем. Использовать его стоит только в тех случаях, когда вы точно уверены, что вы никогда не будете использовать рекурсию или передавать функцию в обработчики событий.

### Установка прототипов
Иногда бывает очень полезно установить прототип для объекта прямо во время его создания. Ранее была возможность установить прототип с помощью свойства `__proto__`. Она не была стандартизирована, но поддерживалась многими движками:
{% highlight javascript %}
var proto = { /* properties and methods */ };
var obj = {
  __proto__: proto
};
{% endhighlight %}

С релизом ES6 установить прототип объекта теперь можно согласно стандарту. Для этого используется функция `Object.setPrototypeOf`, которая принимает два объекта. Первому переданному объекту будет присвоен второй в качестве прототипа:
{% highlight javascript %}
const proto = { /* properties and methods */ };
const obj = { /* properties and methods */ };
Object.setPrototypeOf(obj, proto);
{% endhighlight %}

Подробнее о функции `Object.setPrototypeOf` можно узнать на [MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf).

### Super

Обычно `super` ассоциируется с классами. Тем не менее, так как JavaScript имеет прототипное наследование, то есть понятие класс приравнивается к "объект с прототипом", `super` отлично работает и с краткими методами обычных объектов:
{% highlight javascript %}
const logger = {
  log() {
    console.log('Hello, World from logger!');
  }
};

const child = {
  log() {
    super.log();
    console.log('Hello, World from child!');
  }
};

Object.setPrototypeOf(child, logger);

child.log(); // Hello, World from logger!
             // Hello, World from child!
{% endhighlight %}

**Важно:** `super` может быть использован исключительно с краткими методами. С обычными функциями работать он не будет. Также разрешено его использование только в форме `super.method`, чтобы получить доступ к методам и свойствам. Исполььзовать в форме `super()` при работе с обычными объектами нельзя.
