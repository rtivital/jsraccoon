# Вычисление остатка при делении
## Задача
Напишите функцию `remainder`, которая вычисляет остаток при делении одного числа на другое. Использовать оператор `%` нельзя.
```javascript
remainder(12, 2);  // 0
remainder(17, 12); // 5
remainder(11, 4);  // 3
remainder(5, 3);   // 2
remainder(5, 0);   // NaN
remainder(-10, 3); // -1
remainder(-1, 10); // -1
remainder(-1, 0); // NaN
```

## Решение 1
```javascript
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
```
Сокращенный вариант функции
```javascript
var remainder = function(num , divider){
	divider = (num > 0 && divider > 0) ? divider : -divider;
	return divider === 0 || isNaN(divider)
	  ? NaN 
	  : (Math.abs(num) >= Math.abs(divider)) 
  	  ? num - (Math.floor(num / divider) * divider) 
  	  : num;
}
```

## Решение 2
Автор решения - [Дмитрий Семиградский](https://github.com/Semigradsky)

```javascript
function remainder(dividend, divisor) {
  if (!isFinite(dividend) || isNaN(divisor) || divisor === 0) {
    return NaN;
  }
  
  if (!isFinite(divisor)) {
    return dividend;
  }

  return dividend - divisor*Math.trunc(dividend/divisor);
}
```

## Тесты
Автор тестов - [Дмитрий Семиградский](https://github.com/Semigradsky)

```javascript
function same(a, b) {
  if (isNaN(a) && isNaN(b)) { return true; }
  return a === b;
}
function test(a, b) {
  console.log(`${a} % ${b} ;`, same(remainder(a, b), a % b));
}

test(1, NaN);
test(NaN, 1);
test(Infinity, 1)
test(10, Infinity);

test(1, 1);
test(0, 2);
test(12, 2);
test(2, -12);
test(17, 12);
test(17, -12);
test(11, 4);
test(11, -4);
test(0, -4);
test(5, 3);
test(5, 0);
test(-10, 1);
test(-10, 3);
```