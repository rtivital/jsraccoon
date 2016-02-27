# Землетрясение
## Задача
О нет! Вы узнали, что совсем скоро будет землетрясение. Взглянув на свой старенький дом, построенный еще несколько десятков лет назад, вы решаете не мучить себя ожиданиями плохого и выяснить разрушится ли ваш дом в ходе катастрофы. 

![Расчет силы землетрясения](/images/earthquake.png) 

Про будущее землетрясение от правительства поступили следующие данные: "Всего будет 3 волны, каждая волна может содержать от одного до трех толчков. Землетрясение не сильное - сила каждого толчка не превышает 5 единиц. О силе и количество толчков будет сообщено за несколько дней до землетрясения".

Ваш дом был построен еще в 1973 году. Каждый год ваш дом теряет 2% своей прочности (подобно правилу полураспада - http://vk.cc/3tWMea). 

Как настоящий программист вы решаете написать программу, которая позволит рассчитать выстоит ли ваш дом или нет. Проанализировав данные вы пришли к следующим выводам:

- силу толчков нужно хранить в двухмерном массиве: пример - `[[2], [2, 4, 2], [3, 4], [1, 2, 1]]`. Для каждой волны есть отдельный массив, в котором находятся все значения силы толчков.

- общую силу землетрясения можно рассчитать перемножив суммы силы толчков каждой волны. Пример - `(1+2+1)*(2+4+2)*(3+5+4)*(1+2+1) = 448`.

- изначально любой дом облает прочностью в `1000` единиц. 

- если общая сила землетрясения превысит прочность дома больше, чем на `10` единиц - дом рухнет. 

Напишите функцию earthquake, которая скажет вам есть ли необходимость укреплять ваш дом, основываясь на силе землетрясения и возрасте вашего дома:
```javascript
earthquake([[2], [2,4,2], [1,4], [1,2,1]], 1973); // Укреплять не нужно
earthquake([[2,5,3], [4,4,5], [3], [5,2]], 1973); // Нужно укрепить 
```

## Решение 1 (два reduce)
### ES5 вариант
Сила землетрясения вычисляется с помощью двух вложенных методов `reduce`:
```javascript
// Вычисление производения волн
var wavesStrength = waves.reduce(function(sum, wave) {
	// Вычисление суммы толчков
	return wave.reduce(function(tremorSum, tremor) {
		return tremorSum + tremor;
	}, 0); // Начальное значение 0, так как вычисляется сумма
}, 1);   // Начальное значение 1, так как вычисляется произведение
```
Вложенный `reduce` применяется к массиву толчков и вычисляет их сумму. Второй `reduce` отвечает за вычисление произведений значений всех волн.

Для вычисления возраста дома используем объект `Date`, с помощью которого можно получить текущий год с помощью метода `getFullYear`:
```javascript
var buildingAge = new Date().getFullYear() - age;
```

Каждый год дом теряет 2% своей прочности прошлого года. Таким образом, для вычисления прочности дома на данный момент необходимо возвести чило `0.98` в степень равную возрасту дома:
```javascript
var buildingStrength = 1000 * Math.pow(0.98, buildingAge);
```

Расчитав прочность дома и силу землетрясений нам остается только сравнить их:
```javascript
wavesStrength > (buildingStrength + 10)
  ? 'Дом необходимо укрепить'
  : 'Дом выдержит землетрясение';
```

Все вместе:
```javascript
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

		return wavesStrength > (buildingStrength + 10) 
             ? 'Дом необходимо укрепить'
             : 'Дом выдержит землетрясение';
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
```

### ES6 вариант
Автор решения - [Дмитрий Семиградский](https://github.com/Semigradsky)
```javascript
function earthquake(tremors, year) {
  const durability = 1000 * Math.pow(0.98, new Date().getFullYear() - year);
  const tremorsStrength = tremors.reduce((strength, tremors) => {
    return strength * tremors.reduce((a, b) => a + b);
  }, 1);
  return tremorsStrength > durability + 10;
}
```

## Решение 2 (map и два reduce)
Автор решения - [Даниил Колесниченко](https://github.com/KolesnichenkoDS)
```javascript
function earthquake(quake, year) {
  return quake.map(wave => wave.reduce((a, b) => a + b)).reduce((a, b) => a * b) - 1000 * Math.pow(0.98, new Date().getFullYear() - year) > 10
}
```

## Решение 3 (преждевременный выход из цикла)
Автор решения - [Дмитрий Семиградский](https://github.com/Semigradsky)
```javascript
function earthquake(tremors, year) {
  const durability = 1000 * Math.pow(0.98, new Date().getFullYear() - year);
  
  let strength = 1;
  for (const wave of tremors) {
    const waveStrength = wave.reduce((a, b) => a + b);
    strength *= waveStrength;
    if (strength > durability + 10) {
      return true;
    }
  }

  return strength > durability + 10;
}
```