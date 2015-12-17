(function() {
	'use strict';

	var remainder = function(num, divider) {
		// Если делитель равен 0 или NaN вернуть NaN
		if (divider === 0 || isNaN(divider)) {
			return NaN;
		}

		// Проверка знаков у делителя и числа
		// Если знаки отличаются изменяем у делителя знак
		divider = (num > 0 && divider > 0) ? divider : -divider;

		// Метод Math.floor() округляет число в меньшую сторону
		return (Math.abs(num) >= Math.abs(divider)) 
			? num - (Math.floor(num / divider) * divider)
			: num;
	};

	// Сокращенный вариант функции
	var remainder = function(num , divider){
		divider = (num > 0 && divider > 0) ? divider : -divider;
		return divider === 0 || isNaN(divider)
		  ? NaN 
		  : (Math.abs(num) >= Math.abs(divider)) 
	  	  ? num - (Math.floor(num / divider) * divider) 
	  	  : num;
	}

	// Тесты
	remainder(1, 1);   // 0 (!important)
	remainder(12, 2);  // 0
	remainder(-17, 2); // -1
	remainder(11, 4);  // 3
	remainder(-5, 3);  // -2
	remainder(5, 0);   // NaN
	remainder(-10, 3); // -1
	remainder(-1, 10); // -1
	remainder(-1, 0);  // NaN
})();
