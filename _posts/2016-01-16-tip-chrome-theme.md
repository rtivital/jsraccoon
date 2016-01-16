---
layout: post

title:  "Темы для мобильного Chrome"
categories: HTML
author: "Виталий Ртищев"
date:   2016-01-16 12:50:58 +0300
type: advice

comments: true
identifier: tip-chrome-theme

description: "Мобильный браузер Chrome начиная с 39 версии поддеживает темы. Теперь вы можете задать тему с помощью всего одного тега <code>&lt;meta&gt;</code>."
---

Мобильный браузер Chrome начиная с 39 версии (Android 5.0+) поддеживает темы. Теперь вы можете задать тему с помощью всего одного тега `<meta>` и аттрибутов `name` и `content`.

Делается это следующим образом:
{% highlight html %}
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
{% endhighlight %}

Атрибут `content` работает с любым валидным цветом. 