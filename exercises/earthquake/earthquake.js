(function() {
	'use strict';
	var earthquake = function(waves, age) {
		var wavesStrength = waves.reduce(function(sum, wave) {
			return wave.reduce(function(tremorSum, tremor) {
				return tremorSum + tremor;
			}, 0);
		}, 1);
		var buildingAge = new Date().getFullYear() - age;

		var buildingStrength = 1000 * Math.pow(0.98, buildingAge);

		return wavesStrength > (buildingStrength + 10);
	};

	// Сокращенный вариант функции
	var earthquake = function(waves, age) {
		return waves.reduce(function(sum, wave) {
			return wave.reduce(function(tremorSum, tremor) {
				return tremorSum + tremor;
			}, 0);
		}, 1) > 1000 * Math.pow(0.98, (new Date().getFullYear() - age));
	};
})();