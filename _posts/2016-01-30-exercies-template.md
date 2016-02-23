---
title: "Шаблонизация"
author_name: "Евгений Бовыкин"
author: missingdays
categories: JavaScript
date: 2016-01-30 14:00:00 +0200
type: exercise
identifier: template-string

description: "Создание новой строки на основе шаблона"

tags: [javascript]
---

Напишите функцию `template`, которая первым аргументом принимает строку-шаблон, а вторым — описание литералов, которые в этот шаблон нужно вставить. 

{% highlight javascript %}
var templates = [
  'Hello, {user}!',
  'How was your {dayOfTheWeek}?',
  'Would you like a cup of {drink1}, or maybe some {drink2}?',
  'I\'ve just learned how to play the {instrument}, so I\'m stil a bad {instrument}ist.'
];
// Hello, missingdays!
console.log(template(templates[0], { user: 'missingdays' })); 

// How was your Monday?
console.log(template(templates[1], { dayOfTheWeek: 'Monday' })); 

// Would you like a cup of tea, or maybe some coffee?
console.log(template(templates[2], { drink1: 'tea', drink2: 'coffee' })); 

// I've just learned how to play the guitar, so I'm still a bad guitarist.
console.log(template(templates[3], { instrument: 'guitar' })); 
{% endhighlight %}

**Дополнительно**: функция может работать с массивами:
{% highlight javascript %}
var settings = {
  frameworks: ['Angular', 'Ember', 'Backbone'],
  libraries: ['jQuery', 'Underscore', 'D3']
};

// Popular frameworks: Angular, Ember, Backbone.
template('Popular frameworks: {frameworks}.', settings);

// Popular libraries: jQuery, Underscore, D3.
template('Popular libraries: {libraries}.', settings);

// Popular frameworks and libraries: Angular, Ember, Backbone, jQuery, Underscore, D3.
template('Popular frameworks and libraries: {frameworks}, {libraries}.', settings)
{% endhighlight %}

## Решение
Самым очевидным способом является использование регулярных выражений. Если у вас нету опыта работы с ними, настоятельно рекомендую ознакомиться. [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions), [раз туториал](http://www.regular-expressions.info/tutorial.html), [два туториал](http://regexone.com/). У класса String есть замечательный метод [replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace), принимающий регулярное выражение и строку, на которую надо заменить все подстроки, которые соответствуют этому выражению. Итерируем по каждому литералу и постепенно преобразуем нашу строку.

{% highlight javascript %}
function template(string, literals){

    for(let literal in literals){
        let r = new RegExp(`{${literal}}`, "g");
        let replacement = literals[literal];

        string = string.replace(r, replacement);
    }

    return string;

}
{% endhighlight %}

Заметим, что на каждый литерал мы создаем новое регулярное выражение. Это, его компиляци и пробег по всей строке происходит для каждого литерала. Можем ли мы это исправить? Посмотрим в документацию метода replace. Вместо того, чтобы передевать строку, на которую мы хотим заменить, мы можем передавать функцию, в которую будет переданы все подстроки, которые соответсвуют регулярному выражению. Будем искать любое слово, которое обернуто в `{}`. Для этого хватит `/\{\w+\}/g`. Однако, тогда в нашу функцию будет передаваться вся подстрока, включая и сами `{}`. Если же обернуть само слово в группу, вторым аргументом будет передана она сама. Таким образом, код получается проще и эффективнее.

{% highlight javascript %}
function template(str, literals){
    return str.replace(/\{(\w+)\}/g, (_, x) => literals[x]);
}
{% endhighlight %}

## Дополнительное

Можно заметить, что если один из литералов является массивом, то при неявном преобразовании в строку, каждый элемент в нем будет соединен запятой. Например, `["a", "b"]` превратится в `"a,b"`. Выглядит не эстетично. К счастью, нас спасает метод [join](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/join), который соединяет все элементы в строку, используя в качестве разделителя любую строку, что мы ему передадим. 

{% highlight javascript %}
function template(str, obj) {
  return str.replace(/\{(\w+)\}/g, (_, x) => {
    const value = obj[x];
    return Array.isArray(value) ? value.join(', ') : value;
  });
}
{% endhighlight %}

Именно такой код прислал нам [Дмитрий Семиградский](http://vk.com/semigradsky). 

## Самописное решение

Для меня регулярные выражения для данной задачи кажутся стрельбой из пушки по воробьям. Свою работу они делают, но регулярки известны своей нерасторопностью. Пробежимся по строке один раз, и каждой строке внутри фигурных скобок будем сопоставлять нужный литерал.

{% highlight javascript %}
function template(str, literals){
    var l = 0, len = str.length, subs = "", insideBrackets = false;
    var ret = "";
    var c, literal;

    for(l = 0; l < len; l++){

        c = str[l];

        if(c === "{"){
            insideBrackets = true;
        } else if(c === "}"){
            insideBrackets = false;

            literal = literals[subs];

            ret += Array.isArray(literal) ? literal.join(", ") : literal;

            subs = "";
        } else {
            if(insideBrackets){
                subs += c;
            } else {
                ret += c;
            }
        }
    }

    return ret;

}
{% endhighlight %}

Уфф, код получился объемнее. Может, это стоит того? Запустим бенчмарки и посмотрим.

{% highlight javascript %}
regExp x 26,779 ops/sec ±1.38% (65 runs sampled)
linear x 38,551 ops/sec ±4.22% (68 runs sampled)
Fastest is linear
{% endhighlight %}

Выигрыш сомнительный. Да и поддерживать такой код будет несколько сложнее. Затея оказалась не очень удачная, хотя в критических местах пара сотен миллисекунд и может сыграть роль.

Надеюсь, вы справились с заданием. Спасибо за внимание!