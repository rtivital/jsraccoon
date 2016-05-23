---
title:  "Плохой код #4"
categories: JavaScript
date:   2016-05-13 11:00:00 +0300
author_name: "Евгений Бовыкин"
author: missingdays
type: exercise
identifier: exercise-bad-code-4

description: "Исправляем плохой код. Непонятности и неявности"

tags: [javascript]
---

Что может быть хуже непонятных имен и комментариев? Непонятные операции и действия!

В этой статье примеров всего три, однако, на мой взгляд, они довольно сложные. Подумайте над каждым из них, поймите, что делает код и что хотел им выразить автор. Есть ли ошибки в логике работы программы? Если да, то укажите, какие, и опишите способ их исправления.

{% highlight javascript %}
if(time){
    quality = total / (time*(time-1)); 
}
{% endhighlight %}

{% highlight javascript %}
let peopleLeft = total - deleted ? deleted : getDeleted(); 
{% endhighlight %}

{% highlight javascript %}
let n = someNumber();
let length = n &~ 1;
{% endhighlight %}
