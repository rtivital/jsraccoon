# Удаление всех ложных свойств из массива
Используйте метод массивов `filter`, чтобы удалить все ложные свойства из массива:
```javascript
var arr = ['', 1, 'str 1', 0, false, 'str 2', null];
arr.filter(Boolean); // [1, 'str1', 'str 2'];
```
Функция `Boolean()` возвращает только значения `true` и `false`. Подобная запись является сокращенным вариантом функции:
```javascript
arr.filter(function(item) {
	return !!item;
});
```