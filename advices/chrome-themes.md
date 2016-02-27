# Темы для мобильного Chrome
Мобильный браузер Chrome начиная с 39 версии (Android 5.0+) поддеживает темы. Теперь вы можете задать тему с помощью всего одного тега `<meta>` и аттрибутов `name` и `content`. Атрибут `content` работает с любым валидным CSS цветом. 

Делается это следующим образом:
```html
<!DOCTYPE html>
<html>
  <head>
    <!--
      Чтобы установить цветовую схему для мобильного Chrome
      достаточно добавить один тег <meta> в <head> страницы
    -->
    <meta name="theme-color" content="#e74c3c">
  </head>

  <body>
    ...
  </body>
</html>
```

Посмотреть пример можно у нас на [сайте](http://jsraccoon.ru). 

![Chrome Theme](./chrome_themes.png)