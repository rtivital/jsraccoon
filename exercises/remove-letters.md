# Удаление всех гласных из строки
## Задача
Напишите функцию removeLetters, которая удаляет все гласные буквы из переданной ей строки.
```javascript
removeLetters('This is string'); // вернет "Ths s strng"
removeLetters('THIS IS STRING'); // вернет "THS S STRNG"
```
Дополнительно: в функцию передается необязательный аргумент - строка, содержащая символы, которые необходимо удалить. По умолчанию из строки удаляются все гласные:
```javascript
removeLetters('This is string'); // вернет "Ths s strng"
removeLetters('This is string', 'is'); // вернет "Th  trng"
```

## Решение 1 (ES5)
```javascript
(function() {
	'use strict';

	var removeLetters = function(str, letters) {
		letters = letters || 'aeiouy';

		// Создание массива, содержащего все символы переданной строки
		var result = str.split('');

		// Проверка каждого символа строки на соответствие
		result = result.filter(function(letter) {
			// Если строка letters не содержит в себе проверяемую букву, 
			// то буква оставется в массиве.
			// Важно преобразовать букву в нижний регистр, так как
			// 'A' !== 'a'
			return letters.indexOf(letter.toLowerCase()) < 0;
		});

		// Соединение массива обратно в строку
		result = result.join('');
		return result;
	};

	// Краткий вариант функции
	var removeLetters = function(str, letters) {
		letters = letters || 'aeiouy';
		return str.split('').filter(function(letter) {
			return letters.indexOf(letter.toLowerCase()) < 0;
		}).join('');
	};
})();
```

## Решение 2 (ES6)
Автор решения - [Даниил Колесниченко](https://github.com/KolesnichenkoDS)
```javascript
function removeLetters(str, rm) {
  rm = rm.toLowerCase() || "aeiouy";
  return [].filter.call(str, (c) => !rm.includes(c.toLowerCase())).join('');
}

// Краткий вариант функции
removeLetters = (str, rm) => [].filter.call(str, (c) => !(rm.toLowerCase() || "aeiouy").includes(c.toLowerCase())).join('');
```

## Решение 3 (регулярные выражения)
Автор решения - [Даниил Колесниченко](https://github.com/KolesnichenkoDS)
```javascript
var escapeRegExp = function(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

var removeLetters = function(str, letters) {
  return str.replace(new RegExp(escapeRegExp(letters), 'g'), '');
}
```
