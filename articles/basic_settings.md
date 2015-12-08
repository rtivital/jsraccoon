# Объект settings для глобальных настроек вёрстки сайта
Часто при вёрстке страницы возникает необходимость поменять название некоторых классов или вообще полностью изменить селектор для определенных элементов (особенно часто такая проблема возникает при верстке шаблонов для CMS). 

Без объекта настроек подобные изменения классов или селекторов могут стать очень проблематичными. Пример:

HTML разметка:
```html
<nav class="navbar">
	<ul class="nav">
		<li class="nav-item"><a href="#0" class="nav-link">Home</a></li>
		<li class="nav-item"><a href="#1" class="nav-link">About</a></li>
		<li class="nav-item"><a href="#2" class="nav-link">Blog</a></li>
	</ul>
</nav>

...

<footer class="site-footer">
	...
	<button class="to-top"><i class="fa fa-arrow-up"></i></button>
	...
</footer>
``` 

Javascript код:
```javascript
(function() {
	'use strict';
	var $navbar = $('.navbar'),
		$navLinks = $navbar.find('.nav-links');

	$navbar.on('mouseover', function() {
		// Do something here...
	});
	$navLinks.on('click', function() {
		// Do something here...
	});

	var $toTop = $('.to-top');

	$toTop.on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, 'slow');
	});
})();
```

Данный код будет отлично работать до тех пор, пока не появится необходимость изменить верстку. В таком случае придется пройти по всему файлу с JavaScript кодом и вручную поменять все настройки, что окажется очень неприятно, особенно если файл достаточно большой.

Есть два способа избежать подобную ситуацию:

1. Перенести все объявленные переменные в самый верх программы - от этого пострадает структура программы, но редактировать js файл станет значительно проще:

```javascript
(function() {
	'use strict';
	var $navbar = $('.navbar'),
		$navLinks = $navbar.find('.nav-links'),
		$toTop = $('.to-top');

	$navbar.on('mouseover', function() {
		// Do something here...
	});
	$navLinks.on('click', function() {
		// Do something here...
	});

	$toTop.on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, 'slow');
	});
})();
```

2. Перенести все строковые и числовые значения в объект settings, из которого в последствие при необходимости можно получить любое свойство:

```javascript
(function() {
	'use strict';
	var settings = {
		selectors: {
			navbar: '.navbar',
			navLinks: '.nav-links',

			toTop: '.to-top'
		},
		transitions: {
			fast: 200,
			medium: 300,
			slow: 400
		}
	};

	var $navbar = $(settings.selectors.navbar),
		$navLinks = $navbar.find(settings.selectors.navLinks);

	$navbar.on('mouseover', function() {
		// Do something here...
	});
	$navLinks.on('click', function() {
		// Do something here...
	});

	var $toTop = $(settings.selectors.toTop);

	$toTop.on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, settings.transitions.slow);
	});
})();
```

Помимо селекторов в объект settings можно добавить и другие значения, например, продолжительность переходов для создания общности анимаций на всем сайте.

При использовании объекта settings код становится более громоздким, но его поддержка упрощается в несколько раз. 