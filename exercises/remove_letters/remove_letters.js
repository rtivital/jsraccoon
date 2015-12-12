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