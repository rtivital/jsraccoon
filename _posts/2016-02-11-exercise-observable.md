---
title:  "События"
categories: JavaScript
date:   2016-02-11 15:00:58 +0300
type: exercise
identifier: exercise-observable

description: "Observable это тип объекта, который поддерживает различные события и подписку на них."
---

Напишите функцию `observable`, которая будет принимать объект и делать его "наблюдаемым". После вызова функции объект должен поддерживать следующие методы.

{% highlight javascript %}
function callback(){
    console.log("I'm called!");
}
var obj = {};
observable(obj);

obj.on("event", callback); // При каждом событии event вызвать callback
obj.fire("event"); // I'm called!
obj.fire("event"); // I'm called!

obj.one("event2", callback); // Подписаться на событие единожды
obj.fire("event2"); // I'm called!
obj.fire("event2"); // Ничего не происходит

obj.unbind("event"); // Отписаться от события
obj.fire("event"); // Ничего не происходит
{% endhighlight %}

Из дополнительных опций - поддержка нескольких функций, подписанных на одно событие.
{% highlight javascript %}
obj.on("event", callback1);
obj.on("event", callback2);
obj.fire("event"); // callback1 и callback2 вызваны
{% endhighlight %}
Unbind конкретной функции, а не всего события.
{% highlight javascript %}
obj.on("event", callback1);
obj.on("event", callback2);
obj.unbind("event", callback1);
obj.fire("event"); //  callback2 вызван
{% endhighlight %}
Передача аргументов в callback.
{% highlight javascript %}
function callback(one, two){
    console.log(one + two);
}
obj.on("event", callback);
obj.fire("event", 1, 2); // 3
{% endhighlight %}
