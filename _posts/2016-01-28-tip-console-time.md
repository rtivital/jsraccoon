---
title:  "Измерение производительности блоков кода"
categories: JavaScript
date:   2016-01-28 22:50:58 +0300
type: advice
identifier: tip-console-time

description: "Измерять производительность блоков кода очень просто с помощью инструментов разработчика и функций <code>console.time()</code> и <code>console.timeEnd()</code>."

tags: [javascript]
---
Используйте `console.time()` для измерения производетельности отдельных блоков кода:
{% highlight javascript %}
console.time('New Array');
var arr = [];
for (var i = 0; i < 100; i++) {
  arr.push({ i: i });
}
console.timeEnd('New Array'); // New Array: 0.318ms
{% endhighlight %}
В качестве параметра в функции `console.time()` и `console.timeEnd()` передаётся строка — имя, которое будет использовано обеими функциями в качестве сигнала для начала и окончания времени измерений.