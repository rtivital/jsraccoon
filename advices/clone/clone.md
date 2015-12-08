# Клонирование объекта
Самый быстрый способ клонировать объект - пропустить его через функции JSON.parse() и JSON.stringify() - таким образом будут клонированы все свойства объекта на любой глубине вложенности:
```javascript
var clonedObject = (JSON.parse(JSON.stringify(originalObject)));
```

Подробнее о том, как это работает можно узнать в [статье](http://ilikekillnerds.com/2015/12/deep-cloning-objects-in-javascript-without-dependencies/).