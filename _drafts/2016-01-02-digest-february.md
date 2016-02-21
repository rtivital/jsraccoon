---
layout: post

title:  "Дайджест лучших материалов за январь"
categories: Дайджест
hideCat: true
date:   2016-01-14 22:50:58 +0300
type: digest

identifier: digest-february

description: "Дайджест лучших материалов из группы за второй месяц 2016 года"
---
Дайджест лучших материалов из [группы](http://vk.com/jsraccoon) за второй месяц 2016 года. 

#### В центре внимания
* [Перебирающие методы массивов](http://jsraccoon.ru/fn-array-methods) — статья, которую должен прочитать любой начинающий JavaScript разработчик. В статье рассматриваются способы использования всех перебирающих методов массивов: `forEach`, `map`, `reduce`, `filter`, `some` и `every`. Для каждого метода написана функция, которая делает всё то же самое — подобный подход важен для понимания принципов работы данных методов.
* [Скринкаст по Gulp](https://learn.javascript.ru/screencast/gulp) от Ильи Кантора. Первые 8 уроков по продвинотому использованию Gulp.js.
* Google [выпустил огромный гайд](https://developers.google.com/web/fundamentals/getting-started/your-first-progressive-web-app/?hl=en) по созданию прогрессивных веб-приложений, то есть тех, которые работают на любом устройстве и в любом браузере, обязательно адаптивные и похожи на нативные приложения.
* Введение в обектно-ориентированный JavaScript:
	* [Что такое объект](http://jsraccoon.ru/oop-primitives), или почему утверждение: "Всё в JavaScript является объектом" неверное
	* [Основы работы с объектами](http://jsraccoon.ru/oop-object-base): чтение и запись свойств, цикл for .. in, как перебрать объект с помощью Object.keys() и методов массивов 
	* [Функции конструкторы и ключевое слово this](http://jsraccoon.ru/oop-constructors)
	* [Наследование объектами свойств и методов с помощью прототипов](http://jsraccoon.ru/oop-prototypes)
	* [Объектно-ориентированный JavaScript в действии](http://jsraccoon.ru/oop-example-validation): пример создания библиотеки для валидации данных с возможностями последующего расширения функционала и встроенным строковым шаблонизатором 

* [Самый адекватный гид по функциональному программированию от профессора Фрисби](https://www.gitbook.com/book/drboolean/mostly-adequate-guide/details) — книга о функциональном программирование вообще и его использовании с JavaScript в частности

#### Немного новостей

В этом месяце хром многому научился: появилась поддержка фичи под названием [URLSearchParams](https://developers.google.com/web/updates/2016/01/urlsearchparams), позволяющей обрабатывать URL и извлекать отдельные параметры — мелочь, а приятно. Была добалена [плавная прокрутка](https://plus.google.com/+RickByers/posts/RdYaYF5DTF4) страниц, так что если вы используете сторонние библиотеки для её реализации, то пора уже их отключить. И последнее, самое приятное и значительное, обновление получили [инструменты разработчика](https://developers.google.com/web/updates/2016/02/devtools-digest-devtools-go-dark): умный автокомплит при работе в консоле, быстрое редактирование CSS анимаций, поддержка кастомных CSS свойств и тёмные темы.

Вышел ESLint [версии 2.0.0](http://eslint.org/docs/user-guide/migrating-to-2.0.0) c большим количеством обратно несовместимых изменений. 

React переходит на новую систему версионирования. Следующий релиз состоится [под версией 15.0.0](https://facebook.github.io/react/blog/2016/02/19/new-versioning-scheme.html). Подобная схема поможет обозначить стабильность и надёжность.


#### Много интересных ссылок

##### CSS
* [Checkbox.css](http://jorge8168711.github.io/Checkbox.css/) — очень приятная на вид библиотека для стилизации чекбоксов и радио кнопок. Только CSS никакого JavaScript.
* [Новое свойство display: contents](http://css-live.ru/articles/display-contents-practice.html)
* [Принципы создания анимаций для чекбоксов и радио-кнопок](http://designmodo.com/css3-checkboxes/)
* [Свежий вгляд на адаптивные таблицы](http://joshnh.com/weblog/getting-responsive-tables-to-behave/)
* [Подробный гайд по использованию свойства background-clip](https://css-tricks.com/the-backgound-clip-property-and-use-cases/)
* [Learn CSS Layout — the pedantic way](http://book.mixu.net/css/) — учебник полностью посвященный CSS лэйаутам. Всё разложено по полочкам и описано максимально доступно, есть Flexbox, а в последней главе рассказывают про крутые малоизвестные трюки
* [Подробное руководство по использованию Grid Layout и способах размещения элементов](http://css-live.ru/articles/podrobno-o-razmeshhenii-elementov-v-grid-raskladke-css-grid-layout.html)
* [Адаптивные изображения с умной автоматической обрезкой](http://cloudinary.com/blog/automatically_art_directed_responsive_images)
* [5 вещей, которые вы возможно не знали про позиционирование в CSS](https://scotch.io/bar-talk/5-things-you-might-not-know-about-the-css-positioning-types)
* [Где и когда использовать calc()](https://www.smashingmagazine.com/2015/12/getting-started-css-calc-techniques/)
* [Техники создания полосатых фонов с помощью CSS](https://css-tricks.com/stripes-css/)
* [Flexbox Patterns](http://www.flexboxpatterns.com/home) — сайт, на котором можно посмотреть хорошие примеры использования flexbox
* [Очень подробный учебник по CSS транформациям](https://desandro.github.io/3dtransforms/): содержит много отличных примеров использования для каждой главы
* [Подборка современных CSS фич](http://12devsofxmas.co.uk/2016/01/day-7-surprising-css-properties-you-can-use-today/), которые можно безболезненно внедрять в свои проекты уже сейчас: фильтры, анимации, 3D-трансформации, новые селекторы
* [Флексбокс за 5 минут: интерактивный гайд](http://cvan.io/flexboxin5/)
* [Эффект нарисованных от руки кнопок с помощью свойства border-radius](http://codepen.io/tmrDevelops/pen/VeRvKX)

##### Sass
* [Эстетичный Sass](http://vk.com/wall-97408246_2527) — cерия статей на русском о том, как писать хороший Sass код
* [Цикл статьей про модульный CSS c Sass](http://vk.com/wall-97408246_2733)
* [Наиболее удобный способ использования медиа запросов в Sass](http://www.sitepoint.com/sass-mixin-media-merging/)
* [Небольшая подборка полезных утилит для Sass](https://habrahabr.ru/company/ua-hosting/blog/276509/)
* [Сортировка пузырьком с Sass](http://thesassway.com/advanced/implementing-bubble-sort-with-sass)
* [Создание ромбовидных сеток с Sass](http://www.chenhuijing.com/blog/diamond-grid-using-sass/)
* [Организация кода для адаптивной типографики](https://www.smashingmagazine.com/2015/06/responsive-typography-with-sass-maps/)
* [Использование Объектно-ориентированного CSS (OOCSS) вместе с Sass](http://thesassway.com/intermediate/using-object-oriented-css-with-sass)
* [Несколько советов по написанию хорошо читаемого Sass кода](http://www.toptal.com/front-end/sass-style-guide-a-sass-tutorial-on-how-to-write-better-css-code)

##### JavaScript
* [50 лучших JavaScript библиотек](http://speckyboy.com/2015/12/13/javascript-resources-2015/), релиз которых состоялся в 2015 году
* <i class="fa fa-youtube"></i> [JSONP на пальцах](https://www.youtube.com/watch?v=3AoeiQa8mY8)
* <i class="fa fa-youtube"></i> [Видео курс с подробным обзором всех способов создания эффекта параллакса на веб-страницах](https://www.youtube.com/playlist?list=PLqGj3iMvMa4IyCbhul-PdeiDqmh4ooJzk)
* [Полный список фич, которые будут добавлены в ES2016 (ES7)](http://www.2ality.com/2016/01/ecmascript-2016.html)
* [JavaScript модули — руководство для начинающих](https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.24gzgwsqh)
* [Хардкорный JavaScript](http://ipestov.com/hardcore-javascript-or-power-of-30-lines/): что можно сделать за 30 строчек кода
* [JS Patterns](http://shichuan.github.io/javascript-patterns/) — коллекция JavaScript паттернов с примерами их использования. На каждый паттерн приводится код и в комментариях автор рассказывает, как это все работает, как влияет на оптимизацию и зачем это вообще нужно. 
* [Создание таймера обратного отсчета в 18 строк нативного JavaScript](http://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/)
* [Medium Editor](http://yabwe.github.io/medium-editor/) — текстовый редактор для встраивания на сайт, за идею взят редактор с сайта Medium
* [Введение в использование async/await](https://ponyfoo.com/articles/understanding-javascript-async-await): промисы, генераторы, обработка ошибок
* [Gridifier](http://gridifier.io/) — библиотека для создания самых разнообразных сеток. Присутствует Drag'n'drop и сортировка с приятными анимациями
* <i class="fa fa-github"></i> [JS by Examples](https://github.com/bmkmanoj/js-by-examples) — репозиторий, в котором собрано огромное количество примеров, на которых можно изучить тонкости JavaScript.
* [ES6 в деталях: символы](http://frontender.info/es6-in-depth-symbols/)
* [Создание головоломки наподобие игры "пятнашки"](https://www.smashingmagazine.com/2016/02/javascript-ai-html-sliding-tiles-puzzle/) с искусственным интеллектом на JavaScript
* [5 вопросов, на которые стоит знать ответ любому JavaScript разработчику](http://www.sitepoint.com/5-typical-javascript-interview-exercises/): замыкания, области видимости переменных, создание нативных методов, как работает ключевое слово this и использование методов функций call и apply
* [ToProgress](http://djyde.github.io/ToProgress/) — библиотека для создания прогрессбара в верхней части страницы
* <i class="fa fa-youtube"></i> [Две видео-шпаргалки про ES6](http://vk.com/wall-97408246_2988):всё самое крутое из нового стандарта за полчаса
* [Headroom.js](http://wicky.nillia.ms/headroom.js/) — библиотека для реализации ненавязчивой навигации. Скроллите вниз навигация плавно уходит за пределы страница и не мешает читать. Скроллите вверх навигация снова появляется. Никаких зависимостей.
* [Шаблоны объектно-ориентированного подхода в языке JavaScript](https://john-dugan.com/object-oriented-javascript-pattern-comparison/)
* <i class="fa fa-github"></i> [Репозиторий, в котором собраны примеры использования ES6](https://github.com/sgaurav/understanding-es6), отлично подойдёт, чтобы ознакомиться с новым стандартом на примерах
* [Подробный разбор способов работы с методом строк replace](http://codersblock.com/blog/javascript-string-replace-magic/)
* [Замыкания — это не магия. Подробное объяснение того, как всё работает](http://renderedtext.com/blog/2015/11/18/closures-are-not-magic/)
* [Добавление полноценных CSS правил (не инлайновых) с помощью JavaScript](https://davidwalsh.name/add-rules-stylesheets)
* [Основы разработки API в JavaScript](https://www.youtube.com/watch?v=HYl7ReNB5TA)
* [Minigrid](http://alves.im/minigrid/) — библиотека для создания адаптивных masonry-сеток, написанная на чистом JavaScript
* [Mousetrap](https://craig.is/killing/mice) — библиотека, дающая возможность задать действия для сочетания клавиш
* [Введение в события DOM](http://frontender.info/an-introduction-to-dom-events/)
* [PhotoSwipe](http://photoswipe.com/) — htbox плагин на чистом JavaScript. Работает быстро, UX не портит, поддерживает свайпы и прочие жесты. В общем, лучшее решение из тех, что существуют сейчас
* [10 вопросов, на которые должен знать ответ каждый JavaScript разработчик](https://medium.com/javascript-scene/10-interview-questions-every-javascript-developer-should-know-6fa6bdf5ad95#.havpdfmgb)
* [JavaScript F.A.Q в двух частях на Хабре. Заковыристые вопросы с подробным объяснением](http://vk.com/wall-97408246_3627)
* [Подробный разбор новых методов массивов в ES6](https://ponyfoo.com/articles/es6-array-extensions-in-depth)

##### jQuery
* <i class="fa fa-github"></i> [17 базовых вещей](https://github.com/AllThingsSmitty/jquery-tips-everyone-should-know/), которые каждый разработчик должен уметь делать с помощью jQuery: кнопка наверх, предзагрузка изображений, как находить DOM-элементы по содержащемуся в них тексту, автоматическая замена изображений, которые не были получены браузером, и многое другое. 
* <i class="fa fa-youtube"></i> [Основы jQuery за одно видео](https://www.youtube.com/watch?v=BWXggB-T1jQ)
* <i class="fa fa-github"></i> [Mini-preview](https://github.com/lonekorean/mini-preview) — jQuery плагин для предпросмотра ссылок
* [Заменяем jQuery на D3](http://blog.webkid.io/replacing-jquery-with-d3/)

##### React
* <i class="fa fa-youtube"></i> [React + Meteor = real-time чат за 40 минут](https://www.youtube.com/watch?v=xcej5OboUVM)
* <i class="fa fa-smile-o"></i> [10 причин, по которым каждый разработчик должен выучить React](https://medium.com/@cassiozen/10-reasons-why-every-developer-should-learn-react-87fbfef2cb91#.m3tg9yl03)
* <i class="fa fa-github"></i> [Стартовый шаблон](https://github.com/estkin/boilerplate) для работы с react, react-router, postcss, cssnext и webpack + автоматическая перезагрузка
* [Причины, по которым вы не захотите использовать MVC на клиенте](http://www.infoq.com/articles/no-more-mvc-frameworks), или почему React наилучшее решение
* [React Designer](http://fatiherikli.github.io/react-designer/) — набор компонентов для работы с векторной графикой, даёт огромные возможности для создания всяких онлайн редакторов. Разумеется всё на лету можно экспортировать в SVG
* [Использование React с канвасом](https://habrahabr.ru/post/276585/): подборка и сравнение плагинов
* <i class="fa fa-youtube"></i> [Способы ускорить сервер-сайд рендеринг приложения на React](https://www.youtube.com/watch?v=PnpfGy7q96U)
* [How to ReactJS](http://habrahabr.ru/post/275227/) — статья на русском языке, раскрывающая тайны экосистемы React приложений. В статье освещается неоднозначные вопросы, которые могут возникнуть у новичка — ES6, роутинг, Flux, инлайновые стили, Immutable.js и рендеринг на стороне сервера
* <i class="fa fa-youtube"></i> [Видео курс: React для всех](http://www.youtube.com/playlist?list=PLLnpHn493BHFfs3Uj5tvx17mXk4B4ws4p)
* <i class="fa fa-youtube"></i> [Первая часть видео курса от LearnCode Academy про React](https://www.youtube.com/playlist?list=PLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b)
* [9 вещей, которые должен знать каждый разработчик, начинающий изучать React](https://camjackson.net/post/9-things-every-reactjs-beginner-should-know)
* [Прощай MEAN, здравствуй MERN!](http://mern.io/)


##### Angular
* [Создание директивы для бесконечной прокрутки с Angular 2](http://orizens.com/wp/topics/angular-2-attribute-directive-creating-an-infinite-scroll-directive/)
* [Angular 2 компоненты и провайдеры: классы, фабрики и значения](http://www.sitepoint.com/angular-2-components-providers-classes-factories-values/)
* [Создание многопользовательских игр с Angular](http://www.ng-newsletter.com/posts/building-games-with-angular.html)

##### Ember
* [10 шагов для того чтобы быстро понять и начать использовать Ember.js](https://spin.atomicobject.com/2015/08/24/learn-ember-js-quickly/)
* [Введение в использование Ember с Webpack](https://medium.com/@tulios/using-ember-with-webpack-e03290b61dec#.xyp50m3lu)
* [Лучшие ресурсы для изучения Ember.js в 2016 году](http://emberigniter.com/new-to-ember-cli-start-here-2016-tutorial/)

##### Инструменты
* <i class="fa fa-youtube"></i> [Какими плагинами и настройками для Sublime пользуются разработчики из Google](https://www.youtube.com/watch?v=2eu23_if6Lw)
* [DevDocs.io](http://devdocs.io/) — сайт на котором собрано огромное количество документаций к разным frontend и backend технологиям и фреймворкам.
* [GridLover](http://www.gridlover.net/try) — инструмент для подборки идеального вертикального ритма
* [Введение в тестирование с Mocha и Chai](http://www.sitepoint.com/unit-test-javascript-mocha-chai/)
* [Подробный разбор](https://thesocietea.org/2016/01/building-es6-javascript-for-the-browser-with-gulp-babel-and-more/) настройки вашего workflow для работы с Gulp, Browserify и Babel
* [Настройка Sublime Text](http://marketblog.envato.com/buyer-resources/sublime-text-wordpress-development/) для работы с Wordpress темами и плагинами
* [10 самых необходимых JavaScript разработчику плагинов для Sublime Text](http://www.sitepoint.com/essential-sublime-text-javascript-plugins/)
* <i class="fa fa-youtube"></i> [Продвинутая автоматизация фронтенда с npm скриптами](https://www.youtube.com/watch?v=0RYETb9YVrk)
* [TestMyCSS](http://www.testmycss.com/) — инструмент, позволяющий проанализировать ваш CSS код. Просто киньте ссылку на ваш CSS файл, а сервис скажет, где вы сплоховали.
* [Создание пятизвёздочной системы рейтинга с Flexbox и jQuery](http://www.zell-weekeat.com/star-rating/)
* [Способы генерации SVG-спрайтов](https://habrahabr.ru/post/276463/) на примере библиотеки svg-sprite
* [Отладка Node.js в Chrome DevTools](http://canonium.com/articles/debugging-nodejs-in-chrome-devtools)
* [33 самых крутых и полезных плагинов для Sublime Text](http://aslanbakan.com/en/blog/33-essential-sublime-text-plugins-for-all-developers/)
* <i class="fa fa-youtube"></i> [Самый быстрый способ настроить live reload для любого редактора кода и любого браузера](https://www.youtube.com/watch?v=q78u9lBXvj0)
* [Как создать свой блог на Jekyll и бесплатно хостить его на гитхабе](http://frontender.info/build-blog-jekyll-github-pages/)
* <i class="fa fa-youtube"></i> [BrowserSync по-русски](http://vk.com/wall-97408246_3779): автоматическая перезагрузка страниц с любым редактором кода и любым браузером + интеграция с Gulp
* [Jade для начинающих](): введение в использование одного из самых популярных шаблонизаторов для nodejs, который, разумеется, можно использовать и вне ноды для ускорения вёрстки
* [Как написать свой первый модуль для node.js, дополнить всё документацией и опубликовать его](http://modernweb.com/2014/12/08/building-first-node-js-module/)


##### Разное
* [div, section, article — где использовать каждый тег](http://bitsofco.de/sectioning-content-in-html5/)
* [Различия](https://davidwalsh.name/html5-buttons) между ссылкой (`<a>`), кнопкой (`<button>`) и инпутом (`<input type="button">`)
* [18 советов по оптимизации производительности сайтов](https://www.keycdn.com/blog/website-performance-optimization/)
* [Создаем блог используя Jekyll и GitHub Pages](http://frontender.info/build-blog-jekyll-github-pages/) 
* [Большое руководство по использованию SVG иконок](http://blog.cloudfour.com/our-svg-icon-process/)
* [Повысьте уровень вашего JavaScript кода за несколько простых шагов](http://developer.telerik.com/featured/leveling-up-your-javascript/)
* [Тема для Wordpress за 60 секунд](https://www.youtube.com/watch?v=LLalnlN5ud8)
* <i class="fa fa-youtube"></i> [Создаём свой браузер](https://www.youtube.com/watch?v=7n3YpNVbs4o) с node.js, HTML и CSS
* <i class="fa fa-youtube"></i> [Подборка видео про тестирование JavaScript кода](http://vk.com/wall-97408246_3487)
* [Подробное руководство по выбору фронтенд фреймворка для вашего проекта](https://top.fse.guru/how-to-pick-a-frontend-web-framework-652186bbf6c5#.p2dxzli1g)
* <i class="fa fa-github"></i> [Минималистичный чат Express + Socket.io + ванильный JavaScript](https://github.com/pakastin/chat-example)
* [Исрользование SVG-масок](http://css.yoksel.ru/svg-masks/)
* [Всё о вёрстке писем](http://rightblog.ru/2953): подборка из 60 полезных ресурсов, руководств, уроков и исследований
* [HTML5 Elements](http://html5accessibility.com/html5elements/) — сайт на котором используются все HTML5 элементы. Причем используются правильно. Каждый раздел на сайте подписан: какой тег используется и что в него вложено. Посмотрите, если ещё не овладели искусством создания семантической разметки
* [Bones](http://themble.com/bones/) артовая тема для wordpress, которая в разы ускорит разработку, хорошая альтернатива [Underscores](http://underscores.me/)
* <i class="fa fa-youtube"></i> [Развёртывание node.js приложения на хостинге](http://vk.com/wall-97408246_3084)
* [Front-end Handbook]() — бесплатная книга, которая расскажет абсолютно про все аспекты современной frontend разработки. В книге не так много внимания уделено написанию кода, как различным инструментам, таким как git, nodejs, requirejs. Также в книге хорошо освещается социальная сторона разработки - работа в команде, поиск работы, зарплаты, вопросы с интервью. Каждая глава представляет собой небольшое описание от авторов и набор ссылок, по которым вы сможете найти все, что необходимо знать по данной теме.
* <i class="fa fa-youtube"></i> [Отправление писем с помощью node.js и express](http://vk.com/wall-97408246_3042)
* <i class="fa fa-github"></i> [Список всех свойств, приводящих к перерисовке страницы](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
* [FreeCodeCamp](http://www.freecodecamp.com/) — сайт на котором вы сможете отточить свои навыки программирования на реальных и полезных проектах
* [Готовимся к HTTP/2](https://www.smashingmagazine.com/2016/02/getting-ready-for-http2/): всё, что вы знали ранее про оптимизацию — ложь

##### Немного дизайна из группы [Freebies Truck](http://vk.com/freebiestruck)

* [11 лучших UX книг, которые стоит прочитать в 2016 году](http://www.sitepoint.com/11-free-ux-e-books-worth-reading-2016/)
* [5 неожиданных мест на вашем сайте, где можно проявить свою оригинальность](http://www.sitepoint.com/5-unexpected-places-to-inject-personality-into-your-site/)