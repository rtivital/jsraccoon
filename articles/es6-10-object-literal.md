# ES6: Расширение литерала объектов

##### Краткие свойства объектов
Для того чтобы записать переменную в свойство объекта раньше приходилось придерживаться не самой приятной формы записи:
```javascript
var a = 1, b = 2;
var obj = { a: a, b: b };
```

Теперь нет необходимости записывать всё по два раза. Присваивание свойств выглядит следующим образом:
```javascript
let a = 1, b = 2;
let obj = { a, b };
```

##### Краткие методы объектов
Краткая форма записи методов реализована схожим образом. 

Было:
```javascript
var obj = {
  a: function() { /* function body */ },
  b: function() { /* function body */ }
};
```

Стало:
```javascript
const obj = {
  a() { /* function body */ },
  b() { /* function body */ }
};
```

Когда вы используете ES6 вариант методов `a() { /* function body */ }`, то подразумеваете: "Создай метод `a`, который будет содержать в себе анонимную функцию":
```javascript
const obj = {
  a() { /* function body */ }
};
// Эквивалентно
var obj = {
  a: function() { /* function body */ }
}
```

На первый взгляд, присваивание имени функции, записываемой в свойство объекта, может показаться таким же бесполезным занятием, как и `{ a: a }` в предыдущем примере. Это не так. Рассмотрим небольшой пример с рекурсией, чтобы понять, в чём заключается разница:
```javascript
// Анонимная функция в методе factorial
var math = {
  factorial: function (num) {
    return num <= 0 ? 1 : num * math.factorial(num - 1);
  }
};

console.log(math.factorial(5)); // 120
```

При записи анонимной функции в метод `factorial` единственный способ обратиться к функции — вызвать соответствующий метод объекта `math`. Хорошая ли это идея? Возможно, но, скорее всего, нет. Подобная запись предполагает, что `math` всегда будет указывать на один и тот же объект, что очень часто может оказаться неправильным выводом. Самый простой способ решить подобную проблему — использовать `this`:
```javascript
// Анонимная функция в методе factorial
var math = {
  factorial: function (num) {
    return num <= 0 ? 1 : num * this.factorial(num - 1);
  }
};

console.log(math.factorial(5)); // 120
```

Но и в данном случае нельзя получить желаемого результата во всех случаях. Например, при передаче callback функций:
```javascript
document.links[0].addEventListener('click', math.factorial, false); // :(
```

Естественно решить подобную проблему можно с помощью метода функций `bind` или замыкания (подробнее о способах передачи аргументов в callback функции можно узнать в [этой статье](http://jsraccoon.ru/tip-callback-args/)):
```javascript
document.links[0].addEventListener('click', math.factorial.bind(math, 10), false); // :)
```

В чём, на самом деле, заключается разница между именованной функцией и анонимной:
```javascript
// Именованная функция factorial в методе factorial
var math = {
  factorial: function factorial(num) {
    return num <= 0 ? 1 : num * factorial(num - 1);
  }
};

console.log(math.factorial(5)); // 120
```

Теперь к функции `factorial` можно обращаться без лишних "посредников". Разумеется, функция останется недоступная в более высоких областях видимости:
```javascript
console.log(math.factorial(5)); // 120
console.log(factorial(5)); // factorial is not defined
```

Таким образом, подобная запись даёт возможность обращаться к функциям без использования их объекта-обвёртки. И именно такое поведение не реализовано в **кратких методах объектов**:
```javascript
// Анонимная функция в методе factorial ES6 вариант
var math = {
  factorial(num) { return num <= 0 ? 1 : num * factorial(num - 1); }
};

console.log(math.factorial(5)); // factorial is not defined
```

Данный способ создания методов короче, но может принести с собой ряд проблем. Использовать его стоит только в тех случаях, когда вы точно уверены, что вы никогда не будете использовать рекурсию или передавать функцию в обработчики событий.

### Установка прототипов
Иногда бывает очень полезно установить прототип для объекта прямо во время его создания. Ранее была возможность установить прототип с помощью свойства `__proto__`. Она не была стандартизирована, но поддерживалась многими движками:
```javascript
var proto = { /* properties and methods */ };
var obj = {
  __proto__: proto
};
```

С релизом ES6 установить прототип объекта теперь можно согласно стандарту. Для этого используется функция `Object.setPrototypeOf`, которая принимает два объекта. Первому переданному объекту будет присвоен второй в качестве прототипа:
```javascript
const proto = { /* properties and methods */ };
const obj = { /* properties and methods */ };
Object.setPrototypeOf(obj, proto);
```

Подробнее о функции `Object.setPrototypeOf` можно узнать на [MDN](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf).

### Super

Обычно `super` ассоциируется с классами. Тем не менее, так как JavaScript имеет прототипное наследование, то есть понятие класс приравнивается к "объект с прототипом", `super` отлично работает и с краткими методами обычных объектов:
```javascript
const logger = {
  log() {
    console.log('Hello, World from logger!');
  }
};

const child = {
  log() {
    super.log();
    console.log('Hello, World from child!');
  }
};

Object.setPrototypeOf(child, logger);

child.log(); // Hello, World from logger!
             // Hello, World from child!
```

**Важно:** `super` может быть использован исключительно с краткими методами. С обычными функциями работать он не будет. Также разрешено его использование только в форме `super.method`, чтобы получить доступ к методам и свойствам. Исполььзовать в форме `super()` при работе с обычными объектами нельзя.