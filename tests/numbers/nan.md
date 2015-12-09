# NaN (not a number)
## Вопрос
Какое значение находится в переменной `test`?
```javascript
(function() {
	'use strict';
	var test = parseFloat('string 2') === parseFloat('string 2');
})();
```

## Ответ
`false`

Функции `parseFloat()` и `parseInt()` можно применять для приведения значения к типу `number`. Обе функции работают свледующим образом:
```javascript
parseFloat(12);                 // 12
parseFloat(12.);                // 12
parseFloat('12');               // 12
parseFloat('12.0');             // 12
parseFloat('12.');              // 12
parseFloat('12 strings');       // 12
parseFloat(['12', '13', '14']); // 12
parseFloat([12, 13, 14, 15]);   // 12

parseFloat('string 12');    // NaN
parseFloat(['string', 12]); // NaN
parseFloat(null);           // NaN
parseFloat(false);          // NaN
parseFloat({});             // NaN
parseFloat(NaN);            // NaN
parseFloat(Infinity);       // Infinity
```

Если первые символы переданного аргумента являются числовыми (цифры от 0 до 10 и символ `.`), то происходит преобразование в число, в противном случае фукция вернет `NaN` (not a number), что переводится как "не число".

`NaN` - единственное значение в JavaScript, которое не равно ни самому себе, ни чему-либо другому:
```javascript
NaN === NaN // false
```
Для проверки является ли значение `NaN` существует встроенная функция `isNaN`:
```javascript
isNaN(NaN) // true
isNaN(1)   // false
```

## Итог
В данном примере функция `parseFloat()` вовращает `NaN` два раза, после чего два значения `NaN` сравниваются и значение `false` записывается в переменную.
```javascript
(function() {
	'use strict';
	// NaN !== NaN
	var test = parseFloat('string 2') === parseFloat('string 2'); // false
})();
```