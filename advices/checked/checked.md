# Применение стилей тегу <label> выбранного чекбокса
[Демо на codepen](http://codepen.io/rtivital/pen/ZQWGZa)

Используйте псевдо-класс `:checked` для стилизации отмеченного чекбокса. Чтобы получить доступ к соответствующему ему лейблу используйте селектор `input:checked + label`:
```scss
input:checked + label {
	background-color: black;
	color: white;
}
```

