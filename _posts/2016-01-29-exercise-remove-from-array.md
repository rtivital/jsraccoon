---
title: "Удаление элементов из массива по индексу"
author: Elnee
categories: JavaScript
date: 2016-01-29 20:11:23 +0200
type: exercise
identifier: exercise-remove-from-array

description: "В этой задаче вам потребуется написать функцию, которая будет удалять из массива элементы с определёнными индексами."
---

Напишите функцию, которая первым аргументом будет принимать массив, а все последующие аргументы — индексы элементов, которые следует удалить из массива. Индексов может быть несколько. В конце работы функция должна возвращать новый, отредактированный массив:

{% highlight javascript %}
var numbers = [2, 7, 1, 5, 7, 2, 5, 6, 3, 4];
var strings = ['JS', 'is', 'not', 'awesome'];
var data = [{i: 1}, {i: 2}, {i: 3}, {i: 4}, {i: 5}];
var random = [undefined, 'str', null, 42, {data: data}];

remove(strings, 2); // ['JS', 'is', 'awesome']
remove(numbers, 0, 2, 4); // [7, 5, 2, 5, 6, 3, 4]
remove(data, 1, 3, 4); // [{i: 1}, {i: 3}]
remove(random, 1, 3); // [undefined, null, {data: [...]}]
{% endhighlight %}

## Решение
Вот код готовой функции: 
{% highlight javascript %}
function remove (arr, indexes) {
    var arrayOfIndexes = [].slice.call(arguments, 1);    //(1)
    
	return arr.filter(function (item, index) {           //(2)
        return arrayOfIndexes.indexOf(index) == -1;      //(3)
    });
}
{% endhighlight %}

#### Пояснения
1. `arguments` — это объект, в котором хранятся все аргументы, переданные в функцию. Чтобы дальше не искать вхождение индекса перебором значений `arguments` в цикле, а использовать удобный метод `.indexOf()`, нужно перевести `arguments` в массив. Это осуществляется с помощью применения метода `.slice()` к пустому массиву и заменой значения параметра `this` на `arguments` с помощью функции `.call()`. Подробнее о работе `.call()` [здесь](https://learn.javascript.ru/call-apply#метод-call).
2. Теперь, используя метод `.filter()`, составим массив в который не будут входить элементы, подлежащие к удалению. Подробнее о `.filter()` [здесь](https://learn.javascript.ru/array-iteration#filter).
3. Ну а дальше всё очень просто. Если индекс текущего элемента входит в массив индексов элементов, которые подлежат удалению, то метод `.indexOf()` вернёт значение равное или больше нуля. Callback-функция вернёт false и текущий элемент не войдёт в новый массив.