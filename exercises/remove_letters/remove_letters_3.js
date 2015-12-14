(function() {
	'use strict';
	var escapeRegExp function(str) {
	  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}

	var removeLetters function(str, letters) {
	  return str.replace(new RegExp(escapeRegExp(letters), 'g'), '');
	}
})();