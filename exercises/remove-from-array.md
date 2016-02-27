# Удаление элементов из массива по индексу

Автор задачи [Elnee](https://github.com/Elnee).

Напишите функцию, которая первым аргументом будет принимать массив, а все последующие аргументы — индексы элементов, которые следует удалить из массива. Индексов может быть несколько. В конце работы функция должна возвращать новый, отредактированный массив:

```javascript
var numbers = [2, 7, 1, 5, 7, 2, 5, 6, 3, 4];
var strings = ['JS', 'is', 'not', 'awesome'];
var data = [{i: 1}, {i: 2}, {i: 3}, {i: 4}, {i: 5}];
var random = [undefined, 'str', null, 42, {data: data}];

remove(strings, 2); // ['JS', 'is', 'awesome']
remove(numbers, 0, 2, 4); // [7, 5, 2, 5, 6, 3, 4]
remove(data, 1, 3, 4); // [{i: 1}, {i: 3}]
remove(random, 1, 3); // [undefined, null, {data: [...]}]
```

## Решение
Вот код готовой функции: 
```javascript
function remove (arr, indexes) {
  var arrayOfIndexes = [].slice.call(arguments, 1);  // (1)
  return arr.filter(function (item, index) {         // (2)
    return arrayOfIndexes.indexOf(index) == -1;      // (3)
  });
}
```

#### Объяснение
1. `arguments` — это псевдо массив, в котором хранятся все аргументы, переданные в функцию. Чтобы дальше не искать вхождение индекса перебором значений `arguments` в цикле, а использовать удобный метод `.indexOf()`, нужно перевести `arguments` в массив. Это осуществляется с помощью применения метода `.slice()` к пустому массиву и заменой значения параметра `this` на `arguments` с помощью функции `.call()`. Подробнее о работе `.call()` [здесь](https://learn.javascript.ru/call-apply#метод-call).
2. Теперь, используя метод `.filter()`, составим массив в который не будут входить элементы, подлежащие к удалению. Подробнее о `.filter()` [здесь](https://learn.javascript.ru/array-iteration#filter).
3. Если индекс текущего элемента входит в массив индексов элементов, которые подлежат удалению, то метод `.indexOf()` вернёт значение равное или больше нуля. Callback-функция вернёт false и текущий элемент не войдёт в новый массив.

## Решение #2
```javascript
const remove = (arr, ...args) => {
  return arr.filter((item) => {
    return !args.some((arg, index) => {
      return arr.indexOf(item) === arg;
    });
  });
};
```

## Решение #3
Автор решения [Сергій Гулько](https://github.com/Felytic). Решение показывает возможности использования сетов в ES6.
```javascript
function remove(arr, ...args){
  var set = new Set(args); 
  return arr.filter((v, k) => !set.has(k));
}
```

## Решение #4
Автор решений [Евгений Бовыкин](https://github.com/missingdays). Решения ориентированы на высокую производительность.
```javascript
/*
 * Works O(m+nlog(n)) where n is the amount of indexes
 */
function remove(arr){
  let ret = [];
  let indexes = [].slice.call(arguments, 1);

  indexes.sort();
  let j = 0;

  for(let i = 0; i < arr.length; i++){
    if(i !== indexes[j]){
      ret.push(arr[i]);
    } else {
      j += 1;
    }
  }

  return ret;
}

/*
 * Works O(m*n) where n is the amount of indexes
 */
function _remove(arr){
  let ret = [];

  let indexes = [].slice.call(arguments, 1);

  for(let i = 0; i < arr.length; i++){
    if(indexes.indexOf(i) === -1){
      ret.push(arr[i])
    } 
  }

  return ret;
}
```