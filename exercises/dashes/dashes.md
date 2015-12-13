# Тире между двумя четными числами
## Задача
Напишите функцию `dashes`, которая вставляет тире ('-') между каждыми двумя четными числами. Например, если было получено число `223467988` функция вернет строку `'2-234-6798-8'`. Ноль считайте четным числом.
```javascript
dashes(3551267); // '35512-67'
dashes(2256472); // '2-256-472'
dashes(2226988); // '2-2-2-698-8'
```
## Решение 1
С использование регулярных выражений:
```javascript
var dashes = function(num) {
  return num.toString().replace(/[02468](?=[02468])/g, "$&-");
};
```

## Решение 2
Без использования регулярных выражений:
```javascript
var dashes = function(num) {
  // Перевести число в строку
  num = num.toString();

  // Перевести строку в массив
  num = num.split('');

  num = num.reduce(function(all, current) {
    if (all && all.length) {
      var isEven = 
        parseInt(all.charAt(all.length - 1)) % 2 !== 0 
        && parseInt(current) % 2 !== 0;
      // Если оба числа четные
      if (isEven) {
        // Добавить тире и число
        all = all + '-' + current;
      } else {
        // Если нет, то просто добавить число
        all = all + '' + current;
      }
    } else {
      // При первой итерации присвоить переменной all значение первого числа
      all = '' + current;
    }

    return all;
  }, '');
  
  return num;
};
```

Краткий вариант функции:
```javascript
var dashes = function(num) {
    return num.toString().split('').reduce(function(all, current) {
      return all && all.length ?
        parseInt(all.charAt(all.length - 1)) % 2 === 0 && parseInt(current) % 2 === 0
          ? all + '-' + current
          : all + '' + current
        : '' + current;
    }, '');
  };
```
Подробнее о методе массивов `reduce` можно узнать [здесь](../../tests/arrays/reduce.md)