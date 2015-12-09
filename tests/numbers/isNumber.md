# Проверка на число
## Вопрос
Что будет выведено в консоль при выполнении следующего кода:
```javascript
(function(){
	'use strict';

	var _isNumber = function(value) {
		var type = typeof value;
		return typeof value === 'number' 
			? ( !isNaN(value) && isFinite(value) )
			: typeof value === 'string'
				? !isNaN(+value)
				: false;
	};

	var tests = [
		_isNumber(1.),
		_isNumber('1.'),
		_isNumber(.000001),
		_isNumber('1.a'),
		_isNumber('a.1'),
		isNaN(_isNumber(1))
	];

	var result = tests.reduce(function(sum, current) {
	  return sum + ~~current;
	}, 0);

	console.log(result);

})();
```

## Ответ
3

### Функция тестирования на соответствие числу
Функция `_isNumber` проверяет является ли переданный ей аргумент числом или строкой, полность состоящей из числовых символов:
```javascript
var _isNumber = function(value) {
	// Если переданное в функцию значение является числом
	return typeof value === 'number' 
		// протестировать на NaN и бесконечность
		? ( !isNaN(value) && isFinite(value) )
		// Если переданное значение является строкой
		: typeof value === 'string'
			// конвертировать строку в число и проверить на NaN
			? !isNaN(+value)
			// Если переданное значение не число и не строка вернуть false
			: false;
};
```
При передаче числа в функцию будет проверено, не является ли переданное число `NaN` (not a number) или `Infinity` (бесконечность), так как `NaN` и `Infinity` тоже имеют числовой тип данных:
```javascript
typeof NaN === 'number'       // true
typeof Infinity === 'number'  // true
```

При передаче строки в функцию будет произведена конвертация типов с помощью унарного оператора `+`. В результате данной операции будут получено либо число, если переданная строка содержит только числовые символы, либо `NaN`. Подробнее о работе унарного оператора `+` можно узнать [здесь](./plus_operator.md). Пример работы унарного оператора `+`:
```javascrip
+1     // 1
+'1'   // 1
+1.    // 1
+'1.'  // 1
+.5    // 0.5
+'.5'  // 0.5
+'1a'  // NaN
+'a1'  // NaN
+'a'   // NaN
```

### Массив тестов
```javascript
	var tests = [
		_isNumber(1.),       // true
		_isNumber('1.'),     // true
		_isNumber(.000001),  // true
		_isNumber('1.a'),    // false
		_isNumber('a.1'),    // false
		isNaN(_isNumber(1))  // false
	];
```

Массив `test` содержит 6 значений (true или false), каждое из которых было получено в рзультате выполнения функции `_isNumber`.

### Сведение массива к одному значению с помощью метода reduce и побитового оператора ~
#### Метод reduce
Метод `Array.prototype.reduce` используется для последовательной обработки (слева направо) каждого перечисляемого элемента массива с приведением всех значений к одному. 

Метод принимает 2 аргумента - функцию (`callback`) и начальное значение (необязательный параметр):
```javascript
[1, 2, 3].reduce(function() {}, 0);
```

Функция `callback` принимает 4 аргумента: `previous`, `current` ,`index`, `arr`:
```javascipt
// Получение суммы всех элементов массива
[1, 2, 3].reduce(function(previous, current, index, arr) {
	return previous + current;
}, 0);  // 6
```

Подробнее о методе reduce можно узнать [здесь](../arrays/reduce.md).

#### Побитовый оператор ~
Побитовый оператор `~` производит инвертирование значения каждого бита (на место 0 ставится 1, на место 1 ставится 0). В результате данной операции для натуральных чисел выполняется следующее правило: `~n = -(n + 1)`:
```
~0 === -1
~-1 === 0
~1 === -2
~-2 === 1
```

При применении оператора `~` к значениям true или false происходит их конвертирование в число (1 и 0 соответственно):
```javascript
~true === -2
~-2 === 1
~~true === 1

~false === -1
~-1 === 0
~~false === 0
``` 

```javascript
var result = tests.reduce(function(sum, current) {
	// ковертирование true и false в 1 и 0 соотвественно
  return sum + ~~current;
}, 0);
```