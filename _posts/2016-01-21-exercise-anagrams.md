---
title:  "Найди анаграммы"
categories: JavaScript
date:   2016-01-21 12:50:58 +0300
type: exercise
identifier: exercise-anagrams

description: "До релиза ES2016 ещё долго, а, значит, и метод массивов <code>Array.prototype.includes</code> использовать можно будет ещё не скоро. Сейчас же можно немного сократить свой код, используя побитовый оператор <code>~</code>."
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