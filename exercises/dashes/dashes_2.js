(function() {
	'use strict';
	// Решение 1
	var dashes = function(num) {
		return num.toString().replace(/[02468](?=[02468])/g, "$&-");
	};

	console.log(dashes(35510267)); // '35512-67'
	console.log(dashes(2256472)); // '2-256-472'
	console.log(dashes(2226988)); // '2-2-2-698-8'
})();