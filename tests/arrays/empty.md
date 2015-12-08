# Пустые ячейки в массиве
## Вопрос
Что будет выведено в консоль при выполнении следующего кода:
```javascript
(function(window) {
	'use strict';

	var arr = [];
	arr[1] = 1;
	arr.push(2);
	arr['property'] = 3;

	console.log(arr.length);

})(window);
```

## Ответ 
3

При инициализации массива его длина равна 0. 
```javascript
var arr = new Array();
arr.length; // 0

var arr = [];
arr.length; // 0
``` 

Образование пустых ячеек в масиве происходит в двух случаях:
```javascript
// 1. При инициализации пустого массива с заданной длиной
var arr = new Array(5);
arr.length; // 5
console.log(arr); // [ undefined x 5 ]

// или
var arr = [];
arr.length = 10;
arr.length; // 10
console.log(arr); // [ undefined x 10 ]

// 2. При создании произвольных ячеек
var arr = [];
arr[2] = 'item';
arr.length; // 3
console.log(arr); // [ undefined, undefined, 'item' ]
```

## Именованные свойства массива
Массивы являются объектами в JavaScript, а значит, для них, как и для любых других объектов, возможно создание именнованных свойств:
```javascript
var arr = [];
arr['property'] = 'item';
arr['property']; // 'item'
```
Тем не менее, при создании подобных свойств длина массива не увеличивается:
```javascript
var arr = [1, 2, 3];
arr['property'] = 'item';
arr.length; // 3
```
Создание именованных свойст массива - плохая идея. В данном случае для хранения данных стоит использовать объекты:
```javascript
// Именованные свойства массива - плохая идея
var arr = [1, 2, 3];
arr['property'] = 'item';

// Использование объекта
// Подобная конструкция используется в jQuery
var obj = {
	0: 1,
	1: 2,
	2: 3,
	property: 'item'
}
```

## Итог
```javascript
(function(window) {
	'use strict';
	// При инициализации массива его длина равна 0
	var arr = [];

	// Создание произвольной ячейки с индексом 1
	arr[1] = 1; // содержание массива: [ undefined, 1 ]
	arr.length; // 2

	// Добавление элемента в конец массива
	arr.push(2); // содержание массива: [ undefined, 1, 2 ]
	arr.length; // 3

	// Добавление именованного свойства массиву
	arr['property'] = 3; // содержание массива: [ undefined, 1, 2 ]
	arr.length; // 3

	// Содержание массива в конце выполнения программы
	console.log(arr); // [1: 1, 2: 2, property: 3]

})(window);
```