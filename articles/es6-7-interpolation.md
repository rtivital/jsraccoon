# ES6: интерполяция и умные строки

Если вы используете в своей работе Sass, или любой другой CSS-препроцессор, то понятие интерполяции вам уже знакомо:
```scss
// Интерполяция в scss
$var: 'awesome';
.#{$var}-selector {
	display: flex;
}
// CSS код после компиляции
.awesome-selector {
	display: flex;
} 
```

Интерполяция в JavaScript работает схожим образом. В строке создаётся конструкция `${...}`, внутри которой вы можете поместить любую переменную или выражение:
```javascript
var age = 25;
console.log(`I am ${age} years old`); // I am 25 years old

// Эквивалентно
console.log('I am ' + age + 'years old'); // I am 25 years old
```

**Важно**: строки, созданные с помощью обычных кавычек (`'` и `"`) не поддерживают интерполяцию. Для поддержки интерполяции следует использовать обратную кавычку \` (клавиша `ё` на клавиатуре):
```javascript
var age = 25;
// С обычными кавычками интерполяция не поддерживается
console.log('I am ${age} years old'); // I am ${age} years old
console.log("I am ${age} years old"); // I am ${age} years old
// Поддерживается только с обратными
console.log(`I am ${age} years old`); // I am 25 years old
```

## Интерполяция выражений
С помощью интерполяции в строку можно поместить результат выполнения любого выражения, например, вызов функции:
```javascript
const up = (str) => str.toUpperCase();
let str = `this is ${ up('sting') } in uppercase`;
console.log(str); // this is STRING in uppercase
```

или более сложных выражений:
```javascript
const sum = (...args) => `Sum is equal ${args.reduce((start, arg) => start + arg, 0)}`;

console.log(sum(12, 23, 32)); // Sum is equal 67
```

## Вложенная интерполяция
Скорее всего, будут возникать ситуации, когда одного уровня интерполяции будет недостаточно. В подобных случаях удобно пользоваться вложенностью (интерполяция внутри интерполяции). Следует помнить, что весь код, находящийся внутри `${...}` интерпретируется, как отдельное выражение, то есть может содержать обратные кавычки, которые не будут восприняты, как конец строки:
```javascript
const up = (str) => str.toUpperCase();
let user = 'user';
let str = `these ${up(`${user}s`)} are great`;
console.log(str); // these USERS are great
```

В переменной `str` используется вложенная интерполяция. Используя, старый стандарт код можно переписать следующим образом:
```javascript
var user = 'user';
var str = 'these ' + up(user + 's') + ' are great';
console.log(str); // these USERS are great
```