(function() {
	'use strict';

	var accumulate = function(str) {
		return str.split('').map(function(item, index) {
			return item.toUpperCase() + Array(index + 1).join(item.toLowerCase());
		}).join('-');
	};

	console.log(accumulate('aNktRb')); // A-Nn-Kkk-Tttt-Rrrrr-Bbbbbb
	console.log(accumulate('RywWpx')); // R-Yy-Www-Wwww-Ppppp-Xxxxxx
	console.log(accumulate('Cmrera')); // C-Mm-Rrr-Eeee-Rrrrr-Aaaaaa
})();