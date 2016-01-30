---
title: "Шаблонизация"
author: Missingdays
categories: JavaScript
date: 2016-01-30 14:00:00 +0200
type: exercise
identifier: template-string

description: "Создание новой строки на основе шаблона"
---

Напишите функцию, которая первым аргументом принимает строку-шаблон, а вторым - описание литералов, которые в этот шаблон нужно вставить. 

{% highlight javascript %}
console.log(template("Hello, {user}!", { user: "missingdays"  })); // Hello, missingdays!
console.log(template("How was your {dayOfTheWeek}?", { dayOfTheWeek: "Monday" })); // How was your Monday?
console.log(template("Would you like a cup of {drink1}, or maybe some {drink2}?", { drink1: "tea", drink2: "coffee"  })); // Would you like a cup of tea, or maybe some coffee?
console.log(template("I just learned how to play the {instrument}, so I'm stil a bad {instrument}ist.", { instrument: "guitar"  })); // I just learned how to play the guitar, so I'm still a bad guitarist.
{% endhighlight %}
