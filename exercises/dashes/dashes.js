(function() {
	'use strict';

	// Решение 2
	var dashes = function(num) {
		// Перевести число в строку
		num = num.toString();

		// Перевести строку в массив
		num = num.split('');

		num = num.reduce(function(all, current) {
			if (all && all.length) {
				var isEven = parseInt(all.charAt(all.length - 1)) % 2 !== 0 && parseInt(current) % 2 !== 0;
				// Если оба числа четные
				if (isEven) {
					// Добавить тире и число
					all = all + '-' + current;
				} else {
					// Если нет, то просто добавить число
					all = all + '' + current;
				}
			} else {
				// При первой итерации присвоить переменной all значение первого числа
				all = '' + current;
			}

			return all;
		}, '');

		return num;
	};

	var dashes = function(num) {
		return num.toString().split('').reduce(function(all, current) {
			return all && all.length ?
				parseInt(all.charAt(all.length - 1)) % 2 === 0 && parseInt(current) % 2 === 0
					? all + '-' + current
					: all + '' + current
				: '' + current;
		}, '');
	};

	console.log(dashes(3551026)); // '35512-6'
	console.log(dashes(2256472)); // '2-256-472'
	console.log(dashes(2226988)); // '2-2-2-698-8'
})();