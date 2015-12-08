var arr = ['', 1, 'str 1', 0, false, 'str 2', null];
arr.filter(Boolean); // [1, 'str1', 'str 2']

// Сокращенный вариант функции 
arr.filter(function(item) {
	return !!item;
});