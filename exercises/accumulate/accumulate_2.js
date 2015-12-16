(function() {
	'use strict';
	function accumulate(str) {
	  return str.split('').map((item,index) => item.toUpperCase()+Array(index+1).join(item.toLowerCase())).join('-');
	}

	console.log(accumulate('aNktRb')); // A-Nn-Kkk-Tttt-Rrrrr-Bbbbbb
	console.log(accumulate('RywWpx')); // R-Yy-Www-Wwww-Ppppp-Xxxxxx
	console.log(accumulate('Cmrera')); // C-Mm-Rrr-Eeee-Rrrrr-Aaaaaa
})();
