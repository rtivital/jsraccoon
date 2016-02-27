# Аккумуляция символов 
## Задача
Напишите функцию `accumulate`, которая принимает произвольную строку, состоящую из буквенных символов. Функция обрабатывает строку по следующим правилам:

- на первое место ставится обрабатываемый символ в верхнем регистре
- после обрабатываемого символа в строке стоит обрабатываемый символ в нижнем регистре такое количество раз, какой номер символа в строке
- после завершения обработки символа в строку добавляется тире ('-')

```javascript
accumulate('aNktRb'); // A-Nn-Kkk-Tttt-Rrrrr-Bbbbbb
accumulate('RywWpx'); // R-Yy-Www-Wwww-Ppppp-Xxxxxx
accumulate('Cmrera'); // C-Mm-Rrr-Eeee-Rrrrr-Aaaaaa
```
## Решение 
### ES5 вариант
```javascript
var accumulate = function(str) {
	// Разбить строку на отдельные символы
	// и с помощью метода массивов map преобразовать каждое значение
	return str.split('').map(function(item, index) {
		// Создать пустой массив длинной index + 1
		// и соеденить его в строку с разделителем 
		return item.toUpperCase() + Array(index + 1).join(item.toLowerCase());
	}).join('-');
};
```

### ES6 вариант
```javascript
function accumulate(str) {
  return str.split('').map((item,index) => item.toUpperCase()+Array(index+1).join(item.toLowerCase())).join('-');
}
```