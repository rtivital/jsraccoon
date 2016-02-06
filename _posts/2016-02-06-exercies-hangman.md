---
title: "Виселица"
categories: JavaScript
date: 2016-02-06 13:00:00 +0300
type: exercise
identifier: hangman

description: "Напишите игру \"виселица\" "
---

Виселица — простая игра, в которой загадывается слово, а игрок пытается его угадать, называя по одной букве за раз. Если игрок назвал назвал неправильную букву, то ему начисляется одна ошибка. Если буква была названа правильно, то эта буква показывается в слове. Игра продолжается до тех пор, пока игрок не угадает слово или не совершит 6 ошибок.

Напишите функцию конструктор `Hangman`. Функция принимает один аргумент — слово, которое необходимо угадать игроку. После этого можно вызывать метод `guess`, для того, чтобы ввести букву. После каждого выполнения метода `guess` игроку показывают:

1. Слово с уже разгаданными буквами `_ro_t_nd`
2. Введённые им неправильные буквы через разделитель `_ro_t_nd | zae`
3. Количество оставшихся ошибок `_ro_t_nd | za | left: 4`

Правила:

1. Не учитывается регистр букв
2. Не учитываются пробельные символы внутри строки. При передаче нескольких слов в функцию внутренние пробельные символы не закрываются `_`. Все внешние пробельные символы удаляются. Например, строка `'Frontend Raccoon'` будет выглядеть следующим образом: `________ _______`, так же как и строка `' Frontend Raccoon '`.

Пример выполнения функции:
{% highlight javascript %}
// Пробельные символы не учитываются
var fr = new Hangman('Frontend Raccoon'); // "________ _______ | left: 6"

fr.guess('a'); // "________ _a_____ | left: 6"
fr.guess('z'); // "________ _a_____ | z | left: 5"
fr.guess('t'); // "____t___ _a_____ | z | left: 5"
fr.guess('c'); // "____t___ _acc___ | z | left: 5"
fr.guess('m'); // "____t___ _acc___ | zm | left: 4"
fr.guess('f'); // "F___t___ _acc___ | zm | left: 4"
fr.guess('r'); // "Fr__t___ Racc___ | zm | left: 4"
fr.guess('g'); // "Fr__t___ Racc___ | zmg | left: 3"
fr.guess('o'); // "Fro_t___ Raccoo_ | zmg | left: 3"
fr.guess('n'); // "Front_n_ Raccoon | zmg | left: 3"
fr.guess('c'); // "You have already entered this letter"
fr.guess('b'); // "Front_n_ Raccoon | zmgb | left: 2"
fr.guess('e'); // "Fronten_ Raccoon | zmgb | left: 2"
fr.guess('d'); // "You won! The word was Frontend Raccoon"
fr.guess('v'); // "You have already won! The word was Frontend Raccoon"
{% endhighlight %}

{% highlight javascript %}
// ...
fr.guess('e'); // "Fronten_ Raccoon | zmgb | left: 2"
fr.guess('y'); // "Fronten_ Raccoon | zmgby | left: 1"
fr.guess('k'); // "Fronten_ Raccoon | zmgbyk | left: 0"
fr.guess('i'); // "You lost. :( The word was Frontend Raccoon"
fr.guess('m'); // "You have already lost. :( The word was Frontend Raccoon"
{% endhighlight %}

##### Дополнительно 
Напишите консольное приложение на node.js для реализации виселицы. Приложение работает также как и функция, только вместо выполнения метода `guess` надо просто вводить символ:
<figure class="highlight"><pre><code>
> hangman 'Frontend Raccoon'
________ _______ | left: 6
> f
F_______ _______ | left: 6
> m
F_______ _______ | m |left: 5
...
</code></pre></figure>


## Решение
Скоро будет доступно