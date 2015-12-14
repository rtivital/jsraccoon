(function() {
	'use strict';
	function removeLetters(str, rm) {
	  rm = rm.toLowerCase() || "aeiouy";
	  return [].filter.call(str, (c) => !rm.includes(c.toLowerCase())).join('');
	}

	// Краткий вариант функции
	removeLetters = (str, rm) => [].filter.call(str, (c) => !(rm.toLowerCase() || "aeiouy").includes(c.toLowerCase())).join('');
})();