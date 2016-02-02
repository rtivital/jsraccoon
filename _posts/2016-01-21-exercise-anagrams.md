---
title:  "Найди анаграммы"
categories: JavaScript
date:   2016-01-21 12:50:58 +0300
type: exercise
identifier: exercise-anagrams

description: "Анаграммы — слова, которые получаются при перестановке букв или звуков местами в исходном слове. Например, апельсин и спаниель, старорежимность и нерасторжимость, равновесие и своенравие. В задаче напишем функцию для проверки являются ли два переданных ей слова анаграммами или нет."
---

Анаграммы — слова, которые получаются при перестановке букв или звуков местами в исходном слове. Например, апельсин и спаниель, старорежимность и нерасторжимость, равновесие и своенравие. Подробнее об анаграммах можно узнать в [этой статье](https://ru.wikipedia.org/wiki/%D0%90%D0%BD%D0%B0%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0) в Википедии.

Напишите функцию `isAnagram`, которая будет проверять являются ли два переданных ей слова анаграммами.
{% highlight javascript %}
isAnagram('стационар', 'соратница');     // true
isAnagram('покраснение', 'пенсионерка'); // true
isAnagram('внимание', 'Вениамин');       // true
isAnagram('апельсин', 'спаниель');       // true
{% endhighlight %}

Функция может работать с несколькими словами и не учитывает регистр букв:
{% highlight javascript %}
// работает с несколькими словами
isAnagram('Eleven plus Two', 'Twelve plus one');      // true
isAnagram('Statue of Liberty', 'Built to stay free'); // true
isAnagram('Older and Wiser', 'I learned words');      // true
{% endhighlight %}

Больше примеров анаграммов можно найти [здесь](http://www.enchantedlearning.com/english/anagram/phrases.shtml).

## Решение
При решении задачи стоит руководствоваться всего двумя правилами:

1. Пробелы не учитываются, то есть `Statue of Liberty` и `Built to stay free` **будут** считаться анаграммами.
2. Одинаковые слова не являются анаграммами, то есть `апельсин` и `апельсин` **не являются** анаграммами.

Функция `isAnagram` принимает две строки назовём их условно `original` и `test`, хотя на самом деле особой разницы между ними нет. В соответствии со вторым правилом, первое, что необходимо сделать — проверить не были ли переданы в функцию одинаковые строки:

{% highlight javascript %}
var isAnagram = function(original, test) {
  // Если переданные строки одинаковые
  if (original.trim() === test.trim()) {
    // они не являются анаграммами
    return false;
  }
};
{% endhighlight %}

Метод строк `String.prototype.trim()` ([MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)) в данном случае необходим для того, чтобы убрать все whitespace символы (пробелы, табуляцию, переносы строк) из начала и конца передаваемых в функцию строк `original` и `test`. Таким образом, в результате операции `' this is string'.trim() === 'this is string '.trim()` обе строки будут содержать одинаковые символы `'this is string'` и, следовательно, результатом выражения будет `true`. 

Если переданные в функцию строки не одинаковые, то можно начинать проверку на анаграммы. Первое, что нужно сделать — удалить все пробельные символы из строки. 

##### Удаление пробельных символов с помощью регулярных выражений
Регулярное выражение `\s+` находит все whitespace символы в строке. Их остаётся только заменить на пустую строку с помощью метода `String.prototype.replace()` ([MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/Replace)).

{% highlight javascript %}
original = original.replace(/\s+/g, '');
{% endhighlight %}

##### Удаление пробельных символов с помощью map и trim
Данный способ гораздо менее элегантный, чем предыдущий. Тем не менее, он работает, и вы скорее всего захотите его использовать, если всё ещё не научились исползовать регулярные выражения на должном уровне. 

Суть способа заключается в следующем: строка разбивается на отдельные символы с помощью метода `String.prototype.split()` ([MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/split)), после чего каждый символ перебирается с помощью метода массивов `Array.prototype.map()` ([MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/map)). На каждый символ в строке применяется метод `String.prototype.trim()` ([MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)), который удаляет все пробельные символы из строки. После завершения данной операции строку необходимо собрать обратно с помощью метода `Array.prototype.join()` ([MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/join)).

{% highlight javascript %}
original = original.split('').map(function(letter) {
  return letter.trim();
}).join('');
{% endhighlight %}

##### Сортировка строки
Самый простой способ узнать совпадают ли строки — отсортировать их символы с помощью одного алгоритма. Сделать это можно с помощью метода массивов `Array.prototype.sort()` ([MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)). Как именно они будут отсортированы? Неважно. Главное, что можно быть точно уверенным, что отсортированы они будут одинаково. Таким образом, всё что осталось сделать — сравнить отсортированные строки:

{% highlight javascript %}
// сортировка строки перед её объединением
original = original.split('').map(function(letter) {
  return letter.trim();
}).sort().join('');

original = original.replace(/\s+/g, '').split('').sort().join('');
{% endhighlight %}

Подобные действия необходимо совершить для обеих строк, поэтому необходимо создать соответствующую функцию (в соответствии с принципом [DRY](https://ru.wikipedia.org/wiki/Don%E2%80%99t_repeat_yourself)):

{% highlight javascript %}
var sort = function(str) {
  return str.replace(/\s+/g, '').toLowerCase().split('').sort().join('');
}
{% endhighlight %}

### Решение целиком
{% highlight javascript %}
var sort = function(str) {
  return str.replace(/\s+/g, '').toLowerCase().split('').sort().join('');
}

var isAnagram = function(original, test) {
  return original.trim() === test.trim() ? false : sort(original) === sort(test);
}
{% endhighlight %}

### ES6 решение
{% highlight javascript %}
const sort = (str) => str.replace(/\s+/g, '').toLowerCase().split('').sort().join('');
const isAnagram = (original, test) => original.trim() === test.trim() ? false : sort(original) === sort(test);
{% endhighlight %}