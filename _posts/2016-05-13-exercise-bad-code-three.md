---
title:  "Плохой код #3"
categories: JavaScript
date:   2016-05-13 11:00:00 +0300
author_name: "Евгений Бовыкин"
author: missingdays
type: exercise
identifier: exercise-bad-code-3

description: "Исправляем плохой код. Имена"

tags: [javascript]
---

Как мы уже могли убедиться, правильные имена переменных могут избавить от лишних комментариев. Так же, качественно имя может объяснить смысл переменной или функции, облегчить понимание кода или даже помочь в определении интерфейса функции. Но часто программисты в спешке забывают давать объектам правильные имена - "потом при рефакторинге все приведу в порядок". Но часто про рефакторинг с радостью забывается, но если он все-таки проводится - работа это непростая, потому что понять, что же делает код и как его переработать становится очень сложно.

Ниже приведены примеры кода с плохим именованием переменных, функций и классов. Для каждого из них скажите, в чем именно этот код плохой, и как это лучше всего исправить.

> Имена переменных еще более субъективная вещь, чем комментарии, и иногда нет однозначного ответа на то, какое же имя лучше. Однако для очень многих случаев существуют стандартные практики, которых стоит придерживаться. Я старался подобрать примеры кода так, чтобы затронуть именно "классические" ошибки.

{% highlight javascript %}
int n = A.length; // Количество сотрудников, которые еще не получили зарплату
{% endhighlight %}

{% highlight javascript %}
function sumAllElementsInArray(arrayOfElements){
    let overallSum = 0;
    for(let indexOfElement; indexOfElement < arrayOfElements.length; indexOfElement++){
        overallSum += arrayOfElements[indexOfElement];
    }
}
{% endhighlight %}

{% highlight javascript %}
class Board {
    
    constructor(){
        this.mainList = [];
    }

    getFl(){
        let a = [];

        for(let i = 0; i < this.mainList; i++){
            if(this.mainList[i].value === 4){
                a.append(this.mainList[i]);
            }
        }

        return a;
    }
}
{% endhighlight %}

{% highlight javascript %}
function copy(a1, a2){
    for(let i = 0; i < a1.length; i++){
        a2[i] = a1[i];
    }
}
{% endhighlight %}

{% highlight javascript %}
let a = l;
if(0 == l){
    a = O1;
} else {
    l = O1;
}
{% endhighlight %}

{% highlight javascript %}
class HTTP {
    fetchURL(url){ /* ... */ }
    getDataFromURL(url){ /* ... */ }
}
{% endhighlight %}

{% highlight javascript %}
class Queue {
    addValueToQueue(value) { /* ... */ }
    isQueueEmpty() { /* ... */ }
}
{% endhighlight %}

{% highlight javascript %}
class Time {
    getTimeInDDMMYYFormat(){ /* ... */ }
}
{% endhighlight %}

{% highlight javascript %}
function checkoctal(c){
    return '0' <= c && c <= '7';
}
{% endhighlight %}