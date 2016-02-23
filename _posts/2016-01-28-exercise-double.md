---
title:  "Пара двойников"
categories: JavaScript
date:   2016-01-28 12:50:58 +0300
type: exercise
identifier: exercise-double

description: "Анаграммы — слова, которые получаются при перестановке букв или звуков местами в исходном слове. Например, апельсин и спаниель, старорежимность и нерасторжимость, равновесие и своенравие. В задаче напишем функцию для проверки являются ли два переданных ей слова анаграммами или нет."

tags: [javascript]
---

Напишите функцию `doubleNum`, которая возвращает переданное ей число увеличенное вдвое, если число не состоит из "двойников" — в таком случае функция просто возвращает исходное число:
{% highlight javascript %}
// Обычные числа умножаются на 2
doubleNum(1); // 2
doubleNum(2); // 4
doubleNum(100); // 200
// "Двойники" нет
doubleNum(77); // 77
doubleNum(22); // 22
doubleNum(4343); // 4343
doubleNum(100100); // 100100
doubleNum(342342); // 342342
{% endhighlight %}

## Решение 

##### Приведение числа к строке
Привести число к стороке можно несколькими способами:

1. Использовать метод `num.toString()`
2. Сложить число с пустой строкой `num + ''`
3. Использовать ES6 интерполяцию <code>`${num}`</code> 

##### Убрать лишнее
При решении задачи нас интересует только первая половина строки, так как всё, что необходимо сделать для проверки на "двойников" — сложить две первые половины числа и проверить равны ли они исходному числу. 

Для того чтобы отделить первую половину числа можно воспользоваться методом строк `String.prototype.slice()` ([MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/slice)):
{% highlight javascript %}
var half = str.slice(str.length / 2);
{% endhighlight %}

В случае, если длина строки будет нечетным числом, то в переменную `half` запишется большая часть, то есть если длина строки 15 символов, то переменная будет содержать первые 8 из них.

##### Сравнение 
После того как мы получили половину строки, всё, что остаётся сделать, — сложить половину строки саму с собой и проверить на равенство с исходным значением:
{% highlight javascript %}
half + half === str;
{% endhighlight %}

В случае если переданное число состоит из "двойников", то результат будет `true`:
{% highlight javascript %}
'145' + '145' === '145145'; // true 
'10' + '10' === '1010';     // true
'43' + '43' === '4343';     // true
'7' + '7' === '77';         // true
'2' + '2' === '22';         // true
{% endhighlight %}

Если же переданное число не состоит из двойников, то результатом будет `false`:
{% highlight javascript %}
'7' + '7' === '72';         // false
'123' + '123' === '123456'; // false
'20' + '20' === '2016';     // false 
{% endhighlight %}

##### Решение целиком
{% highlight javascript %}
var doubleNum = function(num) {
  var str = num.toString(),
      half = str.slice(str.length / 2);
  return half + half === str ? num : num * 2;
}
{% endhighlight %}

## Решение без приведения числа к строке
Автор решения — Антон Миргородченко. 
{% highlight javascript %}
function doubleNum(n){
  var div = Math.pow(10, Math.floor((1 + Math.log10(n)) / 2));
  return ((2 - (Math.floor(n / div) == (n % div))) * n  );
}
{% endhighlight %}

## Решение с регулярными выражениями
Автор решения — [Никита Бетманенко](https://github.com/betmakh).
{% highlight javascript %}
function doubleNum(num) {
  return /^([0-9]+)\1$/.test(num.toString()) ? num : num * 2;
}
{% endhighlight %}