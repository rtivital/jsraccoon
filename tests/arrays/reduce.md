# Метод массивов reduce
Метод `Array.prototype.reduce` используется для последовательной обработки (слева направо) каждого перечисляемого элемента массива с приведением всех значений к одному. 

Метод принимает 2 аргумента - функцию (`callback`) и начальное значение (необязательный параметр):
```javascript
[1, 2, 3].reduce(function() {}, 0);
```

Функция `callback` принимает 4 аргумента:

1. `previous` - значение, полученное при прошлом вызове функции `callback`
2. `current` - значение элемента, обрабатываемого в данный момент
3. `index` - индекс элемента, обрабатываемого в данный момент
4. `arr` - ссылка на мыссив

Таким образом, вызов метода `reduce` будет выглядеть следующим образом:
```javascipt
// Получение суммы всех элементов массива
[1, 2, 3].reduce(function(previous, current, index, arr) {
	return previous + current;
}, 0);  // 6
```

Если нет необходимости использовать параметры index и arr, то при написании функции `callback` их можно опустить (результат выполнения от этого не изменится):
```javascript
[1, 2, 3].reduce(function(previous, current) {
	return previous + current;
}, 0);  // 6
```

## Примеры использования
### Вычисление суммы
```javascript
var data = [10, 20, 30, 40, 50];

var sum = data.reduce(function(sum, num) {
	return sum + num;
}, 0);

console.log(sum);  // 150
```
### Генерирование списков
```javascript
var data = ['item-1', 'item-2', 'item-3'];

var list = data.reduce(function(list, item){
	return list + '<li>' + item + '</li>';
}, ''); 

console.log(list); // <li>item-1</li><li>item-2</li><li>item-3</li>
```

### Приведение массива к объекту
```javascript
var data = [
	['first', 1],
	['second', 2],
	['third', 3]
];

var newData = data.reduce(function(obj, value) {
	obj[value[0]] = value[1];
	return obj;
}, {});

console.log(newData);  // {first: 1, second: 2, third: 3}
```

### Получение всего содержимого DOM элементов
HTML
```html
<ul class="nav">
	<li><a href="index.html">Home</a></li>
	<li><a href="about.html">About</a></li>
	<li><a href="blog.html">Blog</a></li>
	<li><a href="contact.html">Contact</a></li>
	<li><a href="sub.html">Subscribe</a></li>
</ul>
```

Javascript
```javascript
var data = [].reduce.call(document.querySelector('.nav').children, function(list, element) {
	list.push(element.innerHTML);
	return list;
}, []);

console.log(data); 
// ["<a href="index.html">Home</a>", 
// "<a href="about.html">About</a>", 
// "<a href="blog.html">Blog</a>", 
// "<a href="contact.html">Contact</a>", 
// "<a href="sub.html">Subscribe</a>"]
```