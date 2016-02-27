# Наследование свойства box-sizing
Чтобы задать одинаковый `box-sizing` для всех элементов следует использовать наследование:
```css
html {
	box-sizing: border-box;
}

*, *::before, *::after {
	box-sizing: inherit;
}
```
Отмените свойство `box-sizing` для изображений для предотвращения резайзинга:
```css
img {
	box-sizing: content-box;
}
```

Почему задавать свойство `box-sizing` следует именно так читайте в [статье](https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/)