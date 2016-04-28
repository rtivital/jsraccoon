---
title: "ES6: Цикл for .. of"
date: 2016-01-24 10:50:58 +0300
identifier: es6-for-of-loop
categories: JavaScript

prevTitle: "Интерполяция"
prevLink: "http://jsraccoon.ru/es6-arrow-functions"

nextTitle: "Расширение литерала объектов"
nextLink: "http://jsraccoon.ru/es6-object-literal"

description: "Цикл <code>for .. of</code> во многом похож на метод массивов <code>forEach</code>, но имеет ряд преимуществ над ним. С появлением нового вида циклов отпадает необходимость использовать конструкцию <code>[].forEach.call(elements, function(){})</code> для итераций по коллекции DOM элементов."
---

Новый цикл `for .. of` предназначен для итерации по элементам коллекций, но в отличие от цикла `for .. in` при итерациях используется значение, а не ключ. Чтобы понять, как он работает достаточно сравнить результаты выполнения циклов `for .. in` и `for .. of` для массивов:

{% highlight javascript %}
var arr = ['a', 'b', 'c', 'd', 'e', 'f'];

for (var key in arr) {
  console.log(key); // 0 1 2 3 4 5
}

for (let value of arr) {
  console.log(value); // 'a' 'b' 'c' 'd' 'e' 'f'
}
{% endhighlight %}

Цикл `for .. of` для массивов работает схожим образом с `forEach`, но имеет свои плюсы: как и в любом другом цикле можно использовать `continue` и `break` для контроля итераций, что при использовании `forEach` невозможно. Таким образом, основное преимущество цикла `for .. of` над методом массивов `forEach` заключается в широких возможностях его оптимизации.

{% highlight javascript %}
arr.forEach(item => {
  // нельзя прервать — выполнится для всех элементов массива в независимости от условий
	console.log(item); // 'a' 'b' 'c' 'd' 'e' 'f'
});

for (let value of arr) {
  if (value === 'c') { continue; }
  if (value === 'e') { break; }
  console.log(value); // 'a' 'b' 'd'
}
{% endhighlight %}

С помощью цикла `for .. of` можно перебирать не только массивы, но и многие другие коллекции, такие как:

* строки
* генераторы
* типизированные массивы
* коллекции DOM элементов

Несколько примеров использования с разными типами данных:

{% highlight javascript %}
// Строки
let result = '';
for (let chr of 'this is string') {
  result += chr.trim();
}
console.log(result); // thisisstring

// Коллекции DOM элементов
let result = [];
for (let link of document.links) {
  result.push(link.href);
}
console.log(result); // ['http://google.com', 'http://jsraccoon.ru', ...]
{% endhighlight %}