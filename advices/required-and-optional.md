# Псевдоклассы :required и :optional
Используйте псевдокласс `:required` для стилизации всех полей ввода, которые содержат атрибут `required`, а псевдокласс `:optional` для всех полей ввода без атрибута `required`.
```css
:required {
	border-color: #400f4d;
}

:optional {
	border-color: #245ad5;
}
```

Поддержка браузерами:

* Chrome 10+
* IE10+
* FF10+
* Opera 10+
* Safari 10+