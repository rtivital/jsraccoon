---
title:  "Передача аргументов в колбэки"
categories: JavaScript
date:   2016-01-19 12:50:58 +0300
type: advice
identifier: tip-callback-args

description: "По умолчанию в callback-функцию нельзя передавать аргументы, что в некоторых случаях приводит к очень неприятным проблемам. В статье расскажем, как обойти это ограничение."
---

По умолчанию в callback-функцию нельзя передать никаких аргументов:
{% highlight javascript %}
var sum = function(a, b) {
  console.log(a + b);
};
// аргументы передать нельзя
document.querySelector('a').addEventListener('click', sum, false);
{% endhighlight %}

Чтобы решить подобную проблему можно воспользоваться одним из следующих методов.

## Создать замыкание

{% highlight javascript %}
var sum = function(a, b) {
  return function() {
    console.log(a + b);
  };
};
// аргументы передать нельзя
document.querySelector('a').addEventListener('click', sum(1, 5), false);
{% endhighlight %}

В данном случае функция `sum` возвращает анонимную функцию, которая и передаётся в обработчик событий. Подобное использование замыканий накладывает ограничения на работу с событиями — каждый раз в обработчик передается новая анонимная функция. Это означает, что при желании убрать этот обработчик с помощью `removeEventListener` у нас ничего не получится:

{% highlight javascript %}
var link = document.querySelector('a');
// Создание обработчика событий
link.addEventListener('click', sum(1, 5), false);
// Попытка убрать обработчик
link.removeEventListener('click', sum(1, 5), false);
// Ничего не получилось
// функция в chrome devtools
getEventListeners(link); // { click: Array[1] } 
{% endhighlight %}

Все подробности о замыканиях можно узнать в [этой статье](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36#.jp0b0hs9i)

## Метод функций bind
Другой способ передать аргументы в callback — использовать метод функций `bind`:
{% highlight javascript %}
var log = function(message) {
  console.log(message);
};

var link = document.querySelector('a');

link.addEventListener('click', log.bind(this, 'Hello world'), false);
{% endhighlight %}

В данном примере удалить обработчик событий можно, предварительно сохранив нужный аргумент в новую функцию:
{% highlight javascript %}
var f = log.bind(this, 'Hello world')
// Создание обработчика событий
link.addEventListener('click', f, false);
// Попытка убрать обработчик
link.removeEventListener('click', f, false);
// Всё работает
getEventListeners(link); // {}
{% endhighlight %}

Между двумя методами передачи аргументов в колбэки есть различия в производиетльности, изучить которые можно в [этой статье](http://jsperf.com/bind-vs-closure-23).