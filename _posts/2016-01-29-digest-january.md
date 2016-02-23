---
layout: post

title:  "Дайджест лучших материалов за январь"
categories: "Дайджест"
date: 2016-01-30 00:50:58 +0300
type: digest

comments: true
identifier: digest-january

description: "Дайджест лучших материалов из группы за первый месяц 2016 года."

tags: [javascript, css, es6]
---
Дайджест лучших материалов из [группы](http://vk.com/jsraccoon) за первый месяц 2016 года. 

#### Немного новостей

Январь стал одним из ключевых месяцев для развития веб-разработки, в больше степени из-за [прекращения поддержки](https://www.microsoft.com/en-us/WindowsForBusiness/End-of-IE-support) старых IE 8, 9 и 10. Да, всех разом. На прекращение поддержки незамедлительно среагировали разработчики React, заявив, что React DOM [больше не будет поддерживать IE8](http://facebook.github.io/react/blog/2016/01/12/discontinuing-ie8-support.html), начиная с релиза версии 0.15.

Флексбоксы [попрощались с экспериментальным статусом](http://css-live.ru/vecssti-s-polej/flexbox-ready-to-cr.html) и стали кандидатом в рекомендации. На сегодняшний день флексбоксы поддерживают больше 95% браузеров! В том числе больше 80% — без префиксов.

В свежей версии Chrome [появилась](https://twitter.com/addyosmani/status/687657702122717188) поддержка ES2015 прокси, очень полезных для "прослушки", виртуализации объектов и профилирования. 

Microsoft открыла свои [чакры](https://blogs.windows.com/msedgedev/2016/01/13/chakracore-now-open/), выложив в общих доступ [ChakraCore](https://github.com/Microsoft/ChakraCore) — сверхбыстрый JavaScript движок, который используется в браузере Microsoft Edge. 

#### Много интересных ссылок

##### CSS
* [Voxel.css](http://www.voxelcss.com/) — библиотека для 3D-рендеринга с помощью свойства transform и CSS анимаций
* [Bulma](http://bulma.io/) — новый css фреймворк. Сетка на flexbox, очень приятно подобранные цвета, хорошая документация
* <i class="fa fa-youtube"></i> [CSS эксперименты](https://www.youtube.com/playlist?list=PLLnpHn493BHGrSO0lNO-3SNuuoPuJrA1o) — подборка различных эффектов, реализованных с помощью CSS: эффект переворачивающейся карточки, аккордеон, пульсирующая кнопка, выпадающие и выдвигающиеся меню и некоторые другие
* [13 полезных советов по CSS](https://habrahabr.ru/post/273403/)
* [Solved by Flexbox](https://philipwalton.github.io/solved-by-flexbox/) — сайт, на котором собраны примеры часто возникающих проблем при вёрстке, а также подробный разбор того, как решить их без лишних велосипедов и костылей с помощью Flexbox.
* [Эволюция вёрстки](https://www.youtube.com/watch?v=9js_5MjiGFo), проблемы флексбокса и их решение с помощью Grid Layout
* [Создание очень крутого эффекта для текста при наведении](https://www.youtube.com/watch?v=qii-5ZpLLYY)
* [Практическое руководство по вёрстке с flexbox](https://css-tricks.com/designing-a-product-page-layout-with-flexbox/) на примере станицы товаров интернет магазина
* [Полное руководство по Flexbox](http://frontender.info/a-guide-to-flexbox/) на русском от css-tricks в переводе frontender.info
* [Цикл статей по Web Animation API от css-live.ru](http://vk.com/wall-97408246_2132)
* [Огромная статья, посвященная адаптивной типографике](http://www.zell-weekeat.com/responsive-typography)
* [Flexbox Froggy](http://flexboxfroggy.com/#ru) — интерактивный гайд по флексбоксу. На сайте можно пройти 24 урока, которые продемонстрируют все самые крутые возможности флексбокса. Уроки на русском языке.
* [Flexbox Playground](http://codepen.io/enxaneta/full/adLPwv/) — небольшой гайд по использованию flexbox. На сайте можно посмотреть, как различные свойства будут влиять на лэйауты.
* [CSS Diner](http://flukeout.github.io/) — небольшая игра, которая поможет выучить CSS-селекторы
* [min-width vs max-width](http://e-planet.ru/company/blog/vybiraem-mezhdu-min-width-i-max-width.html) разбор того, какой подход всё-таки лучше
* [Коллекция практических советов и заметок по вёрстке](http://habrahabr.ru/post/273471/)
* <i class="fa fa-youtube"></i> [Все CSS селекторы в одном видео](https://www.youtube.com/watch?v=WH7BNFo3A2s)
* [Где использовать CSS функцию calc()](http://css-live.ru/articles/kogda-byvaet-nuzhen-calc.html)
* [Все что вам нужно знать про вертикальное выравнивание и свойство vertical-align](http://christopheraue.net/2014/03/05/vertical-align/)
* <i class="fa fa-github"></i> [Milligram](https://github.com/milligram/milligram) — крошечный CSS фреймфорк, содержащий необходимый минимум для удобного чтения
* <i class="fa fa-youtube"></i> [Введение в использование flexbox](https://www.youtube.com/watch?v=G7EIAgfkhmg) и [практика на примере вёрстки главной страницы dribbble](https://www.youtube.com/watch?v=H1lREysgdgc)



##### JavaScript
* <i class="fa fa-github"></i> Подборка трёх репозиториев, которые помогут писать ванильный JavaScript без библиотек: [jQuery](https://github.com/oneuijs/You-Dont-Need-jQuery), [jQuery плагины](http://youmightnotneedjqueryplugins.com/), [undescore/lodash](https://github.com/cht8687/You-Dont-Need-Lodash-Underscore)
* [Почему все постоянно говорят про изоморфный JavaSript и почему это важно](http://www.capitalone.io/blog/why-is-everyone-talking-about-isomorphic-javascript/)
* <i class="fa fa-youtube"></i> Видео курс по [функциональному программированию](https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84) в JavaScript
* [Аналоговые часы на HTML5 c логикой на JavaScript](http://habrahabr.ru/post/275353/)
* [JavaScript — странный... и прекрасный](https://www.youtube.com/playlist?list=PLoYCgNOIyGABI011EYc-avPOsk1YsMUe_) 5 видео о том, почему вы полюбите JavaScript
* [5 малоизвестных фич для работы с объектами](http://www.2ality.com/2015/08/object-literals-es5.html)
* <i class="fa fa-youtube"></i> [Хорошие JavaScript привычки](https://www.youtube.com/watch?v=rBiaUnU1BVc) В видео рассмотрены распространённые ошибки, которые допускаются при использовании языковых конструкций JavaScript. В примерах показаны best practices, использующиеся при программировании на JavaScript
* [Структуры данных в JavaScript](http://vk.com/wall-97408246_1709) — цикл статей, посвященный организации данных. В большей степень статьи рассказывают не о самих структурах, а о способах их организации для правильного и удобного использования.
* [10 советов по использованию JavaScript без jQuery](http://tutorialzine.com/2014/06/10-tips-for-writing-javascript-without-jquery/): ожидание готовности документа, выбор элементов, установка и удаление обработчиков событий, получение и установка содержимого элементов, переходы по DOM-дереву и несколько других
* <i class="fa fa-youtube"></i> [Паттерны создания объектов в JavaScript](https://www.youtube.com/watch?v=xizFJHKHdHw): factory, constructor, prototype
* <i class="fa fa-youtube"></i> [Курс по модульному JavaScript](https://www.youtube.com/playlist?list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f)\
* [JavaScript шаблонизация без библиотек и фреймворков](https://jonsuh.com/blog/javascript-templating-without-a-library/)
* <i class="fa fa-github"></i> [JSTips](https://github.com/loverajoel/jstips/tree/master) — репозиторий, в котором ежедневно появляются полезные советы по нативному JavaScript, в том числе и ES6
* [Подробный обзор паттерна "модуль"](https://toddmotto.com/mastering-the-module-pattern/)
* <i class="fa fa-youtube"></i> [Самое простое и понятное видео, объясняющее принципы AJAX](https://www.youtube.com/watch?v=qqRiDlm-SnY)


##### ES6
* [Блочные области видимости](http://jsraccoon.ru/es6-block-scoped-declarations/)
* [Операторы Spread и Reset](http://jsraccoon.ru/es6-spread-rest/)
* [Параметры по умолчанию](http://jsraccoon.ru/es6-defaults/)
* [Реструктуризующее присваивание](http://jsraccoon.ru/es6-destructuring/)
* [Интерполяция](http://jsraccoon.ru/es6-interpolation/)
* [Стрелочные функции](http://jsraccoon.ru/es6-arrow-functions/)
* [Цикл for .. of](http://jsraccoon.ru/es6-for-of-loop/)
* [Расширение литерала объектов](http://jsraccoon.ru/es6-object-literal/)
* [Объектно ориентированный ES6 — глубокое погружение в классы](http://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/)
* [Как учить ES6?](https://medium.com/javascript-scene/how-to-learn-es6-47d9a1ac2620#.j553k8shk) Большая подборка полезных материалов для простого изучения нового стандарта.
* <i class="fa fa-youtube"></i> [Асинхронный JavaScript с колбэками, промисами и генераторами](https://www.youtube.com/watch?v=obaSQBBWZLk)
* <i class="fa fa-youtube"></i> [Генераторы... они изменят всё](https://www.youtube.com/watch?v=QO07THdLWQo)
* <i class="fa fa-youtube"></i> [Destructuring. Простое и весёлое объяснение](https://www.youtube.com/watch?v=PB_d3uBkQPs)
* <i class="fa fa-github"></i> [ES6 cheatsheet](https://github.com/DrkSephy/es6-cheatsheet) — репозиторий, в котором собрано огромное количество подсказок и сниппетов на ES6
* <i class="fa fa-github"></i> [Awesome promises](https://github.com/wbinnssmith/awesome-promises) — репозиторий, в котором собрано всё, что вы захотите знать про промисы. Материалы разделены по уровню вашей подготовки: для новичков и тех, кто уже немного освоился.

##### React
* [5 шагов к успешному изучению React](http://developer.telerik.com/featured/5-steps-for-learning-react-application-development/)
* [React — лучшие практики в 2016 году](https://blog.risingstack.com/react-js-best-practices-for-2016/)
* [Создание модульных адаптивных компонентов с помощью React Container Query](http://designhooks.com/build-modular-responsive-components-with-react-container-query/)
* [Введение в React для тех, кто знает jQuery](http://reactfordesigners.com/labs/reactjs-introduction-for-people-who-know-just-enough-jquery-to-get-by/)
* [Создание чата с помощью React и WebRTC](http://blog.mgechev.com/2014/09/03/webrtc-peer-to-peer-chat-with-react/)
* <i class="fa fa-youtube"></i> [Убедительные причины начать использовать React](https://www.youtube.com/watch?v=rOAK7ZQND_o)
* [Интеграция библиотеки D3 в приложение на React](http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/)
* [Интеграция React c Gulp](https://jonsuh.com/blog/integrating-react-with-gulp/): конвертирование jsx в js, линтинг с помощью ESLint и автоматическая компиляция jsx при сохранении файлов
* [React для глупых людей](http://habrahabr.ru/post/249107/) (нас вычислили)
* [5 практических примеров использования React](http://tutorialzine.com/2014/07/5-practical-examples-for-learning-facebooks-react-framework/): таймер, навигация, подгрузка изображений с помощью AJAX, мгновенный поиск и форма заказа. Отлично подойдет для изучения React на примерах
* [Создание галереи изображений с помощью React](http://www.eloquentwebapp.com/building-a-gallery-using-reactjs-webpack-bootstrap-and-sass/)
* [OverReact](http://www.overreact.io/) — инструмент для создания wireframe'ов компонента для React. Компонент экспортируется и у вас есть готовые файлы для самого компонента, сервера, Webpack/Gulp/Grunt. Поддерживается ES6 формат.
* [Awesome React](https://github.com/enaqx/awesome-react) — гигантский, постоянно пополняющийся список статей, туториалов, интсрументов, компонентов и вообще всего, что связано с React. 




##### Angular 2
* [Лучшие ресурсы](http://whatpixel.com/learn-angular2-from-scratch/) для изучения второй версии Angular с нуля
* [Angular 2 fundamentals](https://egghead.io/series/angular-2-fundamentals) — серия скринкастов, посвященных второй версии AngularJS
* [Angular 2 vs React](https://medium.freecodecamp.com/angular-2-versus-react-there-will-be-blood-66595faafd51#.qm8tvqhcz): будет много крови
* [Быстрый старт за 5 минут с Angular 2](http://habrahabr.ru/post/273545/)
* <i class="fa fa-youtube"></i> Видео курс [Angular 2 Getting Started](https://www.youtube.com/playlist?list=PLPCoRccv3E8WLMOhvcZp5iVaxZRdm0H_M)

##### Инструменты
* <i class="fa fa-youtube"></i> [Основы Gulp.js](https://www.youtube.com/playlist?list=PLLnpHn493BHE2RsdyUNpbiVn-cfuV7Fos). Рассматриваются все базовые вещи, которые должен уметь делать любой фронтенд разработчик: конкатенация и минифицирование css и js файлов, компилирование sass, использование BrowserSync, Live Reload и многое другое
* <i class="fa fa-github"></i> [WPGulp](https://github.com/ahmadawais/WPGulp) — стартовый проект для тем на Wordpress. Содержит всё, что вы только захотите получить от Gulp — компилирование Sass, конкатенация и сжатие CSS и JavaScript файлов и библиотек, source maps, autoprefixer, BrowserSync и оптимизация изображений
* [CMS.js](https://cdmedia.github.io/cms.js/) — генератор статических сайтов написанный на JavaScript. 
* [Nativefier](https://github.com/jiahaog/nativefier) — утилита для конвертирования любого сайта в десктопное приложение.
* [19 советов по повседневной работе с Git](http://habrahabr.ru/company/mailru/blog/267595/)
* <i class="fa fa-github"></i> [Kickup](https://github.com/kreativgebiet/kickup) — стартовый набор для современного веб-приложения. Gulp, BrowserSync, Autoprefixer, Sass, Browserify, Babel, ESLint — всё уже настроено за вас.
* <i class="fa fa-youtube"></i> [Введение в Browserify](https://www.youtube.com/watch?v=CTAa8IcQh1U) — инструмент, позволяющий использовать require('ваш-модуль') в клиентском JavaScript. 
* [40 самых полезных npm модулей](https://medium.com/startup-study-group/40-npm-modules-we-can-t-live-without-36e29e352e3a#.h624b29g6)
* <i class="fa fa-youtube"></i> [Самое простое и понятное объяснение принципов работы с Require.js](https://www.youtube.com/watch?v=eRqsZqLyYaU)
* <i class="fa fa-youtube"></i> [BrowserSync за 7 минут](https://www.youtube.com/watch?t=1&v=heNWfzc7ufQ)
* [Пакуем как боги](http://frontender.info/packing-the-web-like-a-boss/) — введение в Webpack на русском от frontender.info
* [Font Face Ninja](http://fontface.ninja/) — расширение для Chrome и Safari, позволяющее узнать, какие шрифты используются на странице

##### Разное
* [The elements of HTML](http://w3c.github.io/elements-of-html/) — занятный сайт, на котором собраны все HTML теги. В таблице показывается их отмирание или, наоборот, добавление в стандарт
* <i class="fa fa-youtube"></i> [Website Performance Tutorials](https://www.youtube.com/playlist?list=PLLnpHn493BHGpGXukqYsxwQw3ziW3uti6) — небольшой видео курс, в котором расскажут всё о производительности веб-страниц — как использовать google pagespeed, chrome dev tools, оптимизировать изображения и делать меньше запросов к серверу.
* <i class="fa fa-youtube"></i> [Небольшой видео курс](https://www.youtube.com/playlist?list=PLEyOhcqU3T9WLQSYtCdepuR_OIaDrTZ_C)  на русском языке про маленькую, но очень функциональную библиотеку Riot
* [20 лучших jQuery плагинов для создания анимации элементов сайта при прокрутке страницы](http://postovoy.net/20-jquery-plaginov-dlya-sozdaniya-animacii-pri-skrollinge.html)
* [Введение в Undescore/Lodash](http://www.sitepoint.com/getting-started-with-underscore-js/)
* [LightGallery](http://sachinchoolur.github.io/lightGallery/) — самый крутой jQuery плагин для создания лайтбоксов
* <i class="fa fa-youtube"></i> [Создание клона твиттера на node.js за 15 минут](https://www.youtube.com/watch?v=IxBXkFbUqtk)
* <i class="fa fa-youtube"></i> [Основы разработки продвинутых игр с HTML5](https://www.youtube.com/watch?v=zURMjg6aGIQ)
* [18 неожиданностей при чтении исходного кода jQuery](http://habrahabr.ru/post/230449/)
* [Создание контактной формы с помощью PHP, AJAX и Bootstrap](http://webdesign.tutsplus.com/tutorials/building-a-bootstrap-contact-form-using-php-and-ajax--cms-23068)
* [30 самых необходимых регулярных выражений для веб-разработчика](http://designposts.net/30-useful-regex-snippets-code-for-web-developers/)
* [FullPage](http://alvarotrigo.com/fullPage/) — библиотека для реализации посекционного скрола старницы.
* [Подробный разбор того, как работает jQuery](http://benmccormick.org/2015/06/08/how-jquery-works-an-introduction/)
* [StickyStack](http://codepen.io/mike-zarandona/full/Dasnw) — jQuery плагин для создания эффекта перекрытия при скролле
* <i class="fa fa-youtube"></i> [Learn All The Nodes](https://www.youtube.com/playlist?list=PLQmX5gaHg2SXyKuT9BQ_nbFIdZ39yeRxH) — серия скринкастов для изучения node.js с нуля
* <i class="fa fa-youtube"></i> [Jade за одно видео](https://www.youtube.com/watch?v=l5AXcXAP4r8)
* <i class="fa fa-youtube"></i> [Создание игры на HTML5 за 5 минут](https://www.youtube.com/watch?v=KoWqdEACyLI)
* [RegexOne](http://regexone.com/) — сайт для изучения регулярных выражений. Всего на сайте 25 уроков, прохождение которых позволит вам написать регулярное выражение практически для любой проверки. После каждого урока предлагается решить интерактивный пример.

##### Немного дизайна из группы [Freebies Truck](http://vk.com/freebiestruck)
* [Как сделать так, чтобы пользователи наслаждались загрузкой сайта](http://www.sitepoint.com/make-users-enjoy-waiting/)
* [Урок по созданию постера в стиле омерзительной восьмёрки](http://blog.spoongraphics.co.uk/tutorials/how-to-create-your-own-hateful-eight-movie-poster-design)
* [3 совета о том, как создавать хорошие wirefram'ы](http://blog.teamtreehouse.com/3-steps-better-ui-wireframes)
* [Как НЕ надо разрабатывать логотипы](http://www.webdesignerdepot.com/2009/01/how-not-to-design-a-logo/)
* [Что нужно изучить, чтобы стать проектировщиком интерфейсов?](https://spark.ru/startup/projektorat/blog/13455/chto-nuzhno-izuchit-chtobi-stat-proektirovschikom-interfejsov)
* [Call To Idea](http://www.calltoidea.com/) — сайт, на котором собраны самые интересные UI элементы и UX идеи
* <i class="fa fa-youtube"></i> [Как создать сильное портфолио](https://www.youtube.com/watch?v=YIrhbccAaik)
* [10 UX секретов, которые я украл у людей, которые умнее меня](http://www.fastcodesign.com/3055425/9-ux-secrets-i-stole-from-people-smarter-than-me)
* [Пошаговый курс по созданию продающего Landing Page c нуля](http://vk.com/wall-69328684_1439)
* [Coverr](http://coverr.co/) — сайт с подборкой бесплатных видео, которые можно использовать в качестве фона на сайте
* [Как сделать свой первый набор векторных иконок](https://medium.com/russian/%D0%BA%D0%B0%D0%BA-%D1%81%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C-%D1%81%D0%B2%D0%BE%D0%B9-%D0%BF%D0%B5%D1%80%D0%B2%D1%8B%D0%B9-%D1%81%D1%8D%D1%82-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%8B%D1%85-%D0%B8%D0%BA%D0%BE%D0%BD%D0%BE%D0%BA-69994cb5038a#.gio2eg5wu)
* <i class="fa fa-youtube"></i> [Урок по рисованию хипстерских персонажей в иллюстраторе](https://www.youtube.com/watch?v=cTVR4JVg_NY)
* [Несколько простых способов улучшить ваши дизайнерские навыки](http://speckyboy.com/2016/01/03/developing-your-design-skills)
* [Преимущества и недостатки меню "гамбургера"](https://medium.com/readme-mic/is-the-hamburger-menu-a-problem-d606d40a105f#.8ctqvpg91)
* [Подборка ссылок на материалы, развивающие умение писать хорошие тексты](https://spark.ru/startup/relap-io/blog/11829/chto-pochitat-chtobi-pisat-normalno)
* [Подробный разбор процесса создания дествительно хорошего лэндинга](http://habrahabr.ru/post/273917/)
* [GetCover](http://getcover.ru/) — онлайн-сервис для вставки изображений в мокапы.
* [Собеседование на UX дизайнера: решение тестового задания](http://habrahabr.ru/post/273711/)