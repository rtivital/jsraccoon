# Hoisting: поднятие переменных вверх
## Вопрос
Что содержится в переменной `test`?
```javascript
var a = 1;
function f(){
    window.test = a;
    var a = 2;
}
f();
```