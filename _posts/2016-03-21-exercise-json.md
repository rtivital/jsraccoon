---
title:  "JSONY парсер"
categories: JavaScript
date:   2016-03-21 16:00:00 +0300
author_name: "Евгений Бовыкин"
author: missingdays
type: exercise
identifier: exercise-json

description: "Напишите парсер упрощенного JSON формата."

tags: [javascript]
---

Все любят JSON. Поэтому в вашей компании хотят написать свой формат, очень похожий на него, но с дополнительными возможностями. Однако для начала нужно создать основу, и этот таск повесили на вас.

Вам предстоит реализовать простой парсер (десириалайзер?) небольшого формата данных, а в дополнительном задании и генератор (серилиалайзер?). Описание формата ниже.

### Формат
Целое число без ведущих нулей. Опускаем подробности его длины для простоты.
Строка. Начинается и заканчивается `"`. Внутри строки могут быть другие `"`, и они должны быть экранированы. Например, `"\""` - строка, содержащая `"`.
Массив. Начинается с `[` и заканчивается `]`. Все элементы перечисляются через `,`. 
Объект. Начинается с `{` и заканчивается `}`. Внутри объект представляется как пара `ключ:значение`. Ключом является стандартное имя переменной - набор букв, цифр и нижнего подчеркивания. При этом ключ не может начинаться с цифры.

Объекты и массивы могут быть вложенными. 

Каждая строка содержит ровно один объект. Т.е. каждая строка начинается с `{` и заканчивается `}`. 

Вы можете считать, что на вход всегда подается корректная строка.

### Примеры

{% highlight javascript %}

let jsony = new JSONY();

jsony.parse('{ hello: \"world\" }'); // { hello: "world" } - возвращаемый объект
jsony.parse('{ age: 10, height: 120 }'); // { age: 10, height: 120 }
jsony.parse('{ people: [\"Ann\", \"Alice\", \"Bob\"] }'); // { people: ["Ann", "Alice", "Bob"] }
jsony.parse('{ config: { servers: [10, 15, 13], ngnix: { gate: 0, ip: \"127.0.0.1\" } } }');
       /* 
        { 
            config: { 
                servers: [10, 15, 13], 
                ngnix: { 
                   gate : 0, 
                   ip: "127.0.0.1"
                }
            } 
        }
        */
{% endhighlight %}

### Дополнительные задания
Напишите метод `serialize`. Он должен из переданного объекта генерировать строку в формате JSONY. Все строки должны быть экранированы. `jsony.parse(jsony.serialize(obj))` должен всегда равняться `obj`, как и `jsony.serialize(jsony.parse(str))` должен всегда равняться `str`, с точностью до пробела, переноса строки, таба и прочих пробельных символов.

Для особо жаждающих - напишите хорошую обработку ошибок, которая будет говорить, в каком месте возникла ошибка и с чем она связана.

## Решение

Мы будем пользоваться техникой, на которой построены все компиляторы и интерпретаторы. Типичный этап компиляции в общем выглядит примерно так:

1. Лексинг
Сначала мы имеем простую строку из букв - код нашей программы. Разобьем ее на другие единицы - токены, с которыми нам удобнее будет работать. Токен - это пара двух параметров: тип токена и его строковое представление. Например, число `123` превратиться в токен `(int, "123")`, фигурная скобка `{` - в `(curlyBrace, "{") и так далее. Стоит заметить, что для каждого знака препинания выделяется отдельный тип токена - так ими проще манипулировать. 

Процесс превращения строки в массив таких токенов и называется лексинг.

2. Парсинг
Теперь из последовательности токенов нам нужно собрать так называемое [AST-дерево](https://ru.wikipedia.org/wiki/%D0%90%D0%B1%D1%81%D1%82%D1%80%D0%B0%D0%BA%D1%82%D0%BD%D0%BE%D0%B5_%D1%81%D0%B8%D0%BD%D1%82%D0%B0%D0%BA%D1%81%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B5_%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BE) - абстрактное синтаксическое дерево. По сути, это представление исходной программы в виде дерева, которое, в отличие простой последовательности токенов, имеет иерархическую структуру. Например, если мы пользуемся стандартными правилами порядка выполнения операций из математики, строка `5 + 6*3` после лексинга и парсинга превратиться в такое дерево
{% highlight javascript %}
        [сложить]
       /         \
    (int, 5)   [умножить]
              /         \
          (int, 6)    (int, 3)
{% endhighlight %}
а немного другая строка в `6*3 + 5` в 
{% highlight javascript %}
        [сложить]
       /         \
    [умножить]   (int, 5)
    /         \
 (int, 6)    (int, 3)
{% endhighlight %}

Видно, что по сути они одинаковые. Однако во второй строке сначала идет умножение, и плохо написанные правила для парсера или сам парсер могут привести к такому результату
{% highlight javascript %}
        [умножить]
       /         \
    [сложить]   (int, 6)
    /         \
 (int, 3)    (int, 5)
{% endhighlight %}
И такого мы скорее всего не хотим. 

В нашем случае нам достаточно превратить последовательность токенов в конечный объект, и на этом наша работа по парсингу исходной строки закончится. Для компилятора же работа, можно сказать, только начинается. Лексинг и парсинг - задача фронтенда (внешней части) компилятора. Затем такое AST-дерево передается бэкенду (внутренней части), где оно оптимизируется, компилируется в машинный (или другой) код, и происходит еще много разной магии. Советую ознакомиться с полным процессом компиляции, например написав свой пробный язык программирования ([Туториал по LLVM](http://llvm.org/docs/tutorial/), [Создай свой Lisp](http://www.buildyourownlisp.com/)) - крайне интересная и широкая тема.

### Код

Хватит теории, переходим к кодингу. Для начала напишем основу. 

Хочу сразу предупредить, код получился не очень маленьким (но и не большим) - около 200 строк. Немного практики в разборе чужого кода никогда не будет лишней :)

{% highlight javascript %}
"use strict";

class JSONY{
    constructor(){
        this._ci = 0; // Текущий индекс
        this._tokens = [];
    }

    parse(str){
        let tokens = this._tokenize(str); // Лексим
        return this._parseTokens(tokens); // Парсим
    }

}

class Token {
    constructor(type, str){
        this.type = type;
        this.str = str;
    }
}

// Имена довольно краткие, потому что ими обычно приходится
// пользоваться часто
Token.Type = {
    OCB: "{", // Opening curly brace
    CCB: "}", // Closing curly brace
    OSB: "[", // Opening square brace
    CSB: "]", // Closing square brace
    COM: ",", // ну и т.д.
    COL: ":",
    INT: "INT",
    STR: "STR",
    KEY: "KEY",
};

// Стандартная библиотека JS не предоставляет даже базовые 
// утилиты, поэтому их приходится писать самим.
function isNumber(c){
    let n = parseInt(c);
    return n <= 9 && n >= 0;
}

function isAlphanumeric(c){
    // Только английские буквы в ключах
    let re = /^[a-zA-Z_0-9]$/;
    return re.test(c);
}

function isWhitespace(c){
    "\t" - табуляция
    "\n" - перенос строки 
    return c === " " || c === "\t" || c === "\n";
}
{% endhighlight %}

Тут, надеюсь, все понятно. Переходим к самой реализации лексинга.

Напишем основную функцию `_tokenize`. Ее задачей будет пройтись по всем символам исходной строки, и для каждого символа описать дальнейшие действия. Например, если мы встретили `{`, то просто добавляем токен (curlyBrace, "{") в массив. Если встречаем начало числа, строки или ключа - вызываем нужную функцию, которая сама с ним разберется.

{% highlight javascript %}
    ...
    _tokenize(str){
        this._ci = 0;
        this._tokens = [];
        this._str = str;
        while(this._ci < str.length){
            if(str[this._ci] === "{"){
                this._addToken(Token.Type.OCB, "{");
            } else if(str[this._ci] === "}"){
                this._addToken(Token.Type.CCB, "}");
            } else if(str[this._ci] === "["){
                this._addToken(Token.Type.OSB, "[");
            } else if(str[this._ci] === "]"){
                this._addToken(Token.Type.CSB, "]");
            } else if(str[this._ci] === ","){
                this._addToken(Token.Type.COM, ",");
            } else if(str[this._ci] === ":"){
                this._addToken(Token.Type.COL, ":");
            } else if(isNumber(str[this._ci])){
                this._addNumber();
            } else if(isAlphanumeric(str[this._ci])){
                this._addKey();
            } else if(str[this._ci] === "\""){
                this._addString();
            } else if(isWhitespace(str[this._ci])){
                this._skipWhitespaces();
            } else {
                // По самому заданию на вход всегда подается корректная строка.
                // Однако для будущей обработки ошибок и просто деббагинга удобно.
                throw new Error("Wtf is this " + str[this._ci] + " at " + this._ci);
            }
        }

        return this._tokens;
    }
    ...
{% endhighlight %}

Суть вспомогательных методов проста. Например, `_addNumber` читает строку, пока ему попадаются числа, и затем добавляет полученный токен в массив. Внизу представлен процесс его работы на строке `[1]23a`, где `[x]` означает, что текущий индекс `_ci` указывает на этот символ.

{% highlight javascript %}
[1]23a - текущее число 1
1[2]3а - текущее число 12
12[3]a - текущее число 123
123[a] - встретили не число, добавляем токен (int, "123") и прекращаем работу метода
{% endhighlight %}

Другие методы работают аналогично.

Немного про реализацию `_addToken`. Она именно такая, потому что в дальнейшем мы можем захотеть расширить ее функционал, например, проверять, что переданный нам тип вообще существует, что переданная строка не пустая (если только не возможно обратное) и т.д. Поэтому в конце каждого метода мы вызываем именно `_addToken`, а не просто пушим в массив.

{% highlight javascript %}
    ...
    _addToken(type, str, inc){
        this._tokens.push(new Token(type, str));
        if(inc !== false){
            this._ci++;
        }
    }

    _addNumber(){
        let num = "";
        let str = this._str;
        while(isNumber(str[this._ci])){
            num += str[this._ci];
            this._ci++;
        }

        this._addToken(Token.Type.INT, num, false);
    }

    _addKey(){
        let key = "";
        let str = this._str;
        while(isAlphanumeric(str[this._ci])){
            key += str[this._ci];
            this._ci++;
        }

        this._addToken(Token.Type.KEY, key, false);
    }

    _addString(){
        let string = "";
        let str = this._str;

        // Ignore opening "
        this._ci++;

        while(str[this._ci] !== "\""){
            string += str[this._ci];
            this._ci++;
        }

        // Ignore closing "
        this._ci++;

        this._addToken(Token.Type.STR, string, false);
    }

    _skipWhitespaces(){
        let str = this._str;
        while(isWhitespace(str[this._ci])){
            this._ci++;
        }
    }
    ...
{% endhighlight %}

Теперь переходим непостредственно к парсингу. Помним, что теперь мы уже работаем с последовательностью токенов. `_parseTokens` принимает массив токенов, хотя в данном контексте это и лишнее. Это сделано для того, чтобы в дальнейшем при надобности мы могли его использовать отдельно, не вызывая `_tokenize`.

`_parseAt(i)` делает простую вещь - проверяет, что сейчас предстоит распарсить - объект или массив, и вызываем нужный метод.

{% highlight javascript %}
    _parseTokens(tokens){
        this._tokens = tokens;
        this._ci = 0;

        return this._parseAt(0);
    }
    _parseAt(i){
        if(this._tokens[this._ci].type === Token.Type.OCB){
            this._ci++;
            return this._parseObj();
        } else if(this._tokens[this._ci].type === Token.Type.OSB){
            this._ci++;
            return this._parseArray();
        } else {
            throw new Error("Called _parseAt(i) not in the beggining of object or array, but at " + this._ci);
        }
    }
{% endhighlight %}

`_parseObj` возвращает нужный объект. Он продолжает добавлять пары `ключ: значение` в объект, пока не встретит закрывающую скобку `{`. Можно заметить, что мы не делаем никаких проверок на то, чтобы после ключа не шел еще один ключ и подобное - обработка ошибок в данном случае не тривиальна, и является отдельной темой. Мы же предполагаем, что исходная строка, а значит и последовательность токенов всегда корректны.

{% highlight javascript %}
    _parseObj(){
        let obj = {}, key;
        while(this._tokens[this._ci].type !== Token.Type.CCB){
            let token = this._tokens[this._ci];
            if(token.type === Token.Type.KEY){
                key = token.str;
            } else if(token.type === Token.Type.STR){
                obj[key] = token.str;
            } else if(token.type === Token.Type.INT){
                obj[key] = parseInt(token.str);
            } else if(token.type !== Token.Type.COL && token.type !== Token.Type.COM){
                // We met another object or array
                obj[key] = this._parseAt(this._ci);
            }

            this._ci++;
        }

        return obj;
    }
{% endhighlight %}

И, наконец, парсим массив.

{% highlight javascript %}
    _parseArray(){
        let arr = [];
        while(this._tokens[this._ci].type !== Token.Type.CSB){
            let token = this._tokens[this._ci];
            if(token.type === Token.Type.INT){
                arr.push(parseInt(token.str));
                this._ci++;
            } else if(token.type === Token.Type.STR){
                arr.push(token.str);
                this._ci++;
            } else if(token.type === Token.Type.COM){
                this._ci++;
            } else {
                // We met another object or array
                arr.push(this._parseAt());
            }
        }

        return arr;
    }
{% endhighlight %}

Вот и все! Мы закончили с парсингом нашего JSONY формата. Генерацию, обработку ошибок и расширение формата оставляю как домашнее задание.

### Решения сообщества

Хорошее решение прислал [Мартин Шульц](https://repl.it/ByQw/15). В нем реализована и генерация, и обработка ошибок. Стоит отметить, что Мартин не пошел по стандартной схеме лексинг -> парсинг, а сделал все на месте, чего для данной задачи вполне хватило.

## Заключение

Формальные языки - большая и сложная тема для изучения, надеюсь это маленькое упражнение пробудит в вас интерес к ней. 

Спасибо за внимание!