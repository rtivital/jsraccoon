# Нативное копирование в буфер обмена
Используйте метод `document.execCommand` для простого управления буфером обмена.
```js
document.querySelector('#input').select(); // выделение текста
document.execCommand('copy'); // копирование в буфер обмена
```

* [Caniuse](http://caniuse.com/#feat=document-execcommand)
* [Clipboard.js](https://clipboardjs.com/) – библиотека для кросбраузерного управления буфером обмена
