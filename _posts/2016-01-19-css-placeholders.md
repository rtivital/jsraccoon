---
title:  "Стилизация плэйсхолдеров"
categories: CSS
date:   2016-01-19 00:40:58 +0300

identifier: css-placeholders

description: "Применение стилей к тексту плэйсхолдеров не самое лёгкое занятие. Необходимо учитывать все префиксы для разных браузеров, в результате чего приходится писать достаточно объемное количество кода. К счастью CSS препроцессоры значительно облегчат его создание. В статье рассмотрим основы применения стилей к плэйсхолдерам, принципы их анимации, а также напишем небольшую библиотеку миксинов на Sass, которая значительно упростит работу с плэйсхолдерами."
---

Атрибут `placeholder` используется для создания подсказок внутри пустых полей ввода (теги `<input>` и `<textarea>`). В этой статье я рассмотрю способы стилизации плэйсхолдеров, а также, как сделать их более удобными в использовании.

Начнём с примера для тех, кто ещё не знает, что такое плэйсхолдер и как его использовать:
{% highlight html %}
<input type="email" placeholder="example@gmail.com">
{% endhighlight %}
<div class="demo demo-css-placeholders">
  <style>
    .demo-css-placeholders-input {
      display: block;
      width: 100%;
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
      border: 2px solid #ccc;
      border-radius: .4rem;
      transition: border 200ms;
    }

    .demo-css-placeholders-input:focus {
      outline: 0;
      border-color: #2e8ece;
    }
  </style>
  <input type="email" placeholder="example@gmail.com" class="demo-css-placeholders-input">
</div>

При разработке интерфейсов следует учитывать особенности поведения плэйсхолдеров. Текст плэйсхолдера исчезает, как только начинается ввод. Именно поэтому не стоит использовать их для передачи информации о самом поле ввода (сколько и какие именно символов оно должно содержать). Для данных целей лучше всего использовать тег `<label>` или параграф с небольшой подсказкой. Подробнее об особенностях использования плэйсхолдеров можно почитать [здесь](https://www.nngroup.com/articles/form-design-placeholders/).

## Стилизация
Для стилизации плэйсхолдеров используются следующие правила:
{% highlight css %}
::-webkit-input-placeholder { color: blue; }
::-moz-placeholder          { color: blue; } /* Firefox 19+ */
:-moz-placeholder           { color: blue; } /* Firefox 18- */
:-ms-input-placeholder      { color: blue; }
{% endhighlight %}

Выглядит ужасно, не так ли? И на это есть причина — до сих пор CSS правила для плэйсхолдеров не были стандартизированы и имплементация в каждом браузере различная. Подробнее о всех необходимых префиксах можно узнать на [caniuse](http://caniuse.com/#feat=css-placeholder).

Если вы используете CSS-препроцессор, то, скорее всего, для применения стилей к плэйсхолдерам вам будет удобнее всего написать простой миксин. Пример на Sass:
{% highlight scss %}
@mixin placeholder {
  &::-webkit-input-placeholder { @content; }
  &:-moz-placeholder           { @content; }
  &::-moz-placeholder          { @content; }
  &:-ms-input-placeholder      { @content; }  
}
{% endhighlight %}

В зависимости от контекста миксин можно использовать как для глобального применения стилей, так и для отдельных элементов ([опробуйте на SassMeister](http://www.sassmeister.com/gist/60195e45fcbbdf50cf4f)):

{% highlight scss %}
// Глобально для каждого поля ввода
@include placeholder {
  color: blue;
}
// Для определённых полей ввода
.input {
  @include placeholder {
    color: green;
  }
}
{% endhighlight %}

#### Пример
Синий текст для плэйсхолдера (никогда так не делайте):
{% highlight css %}
.blue-text::-webkit-input-placeholder {
  color: #2e8ece;
}

.blue-text:-moz-placeholder {
  color: #2e8ece;
}

.blue-text::-moz-placeholder {
  color: #2e8ece;
}

.blue-text:-ms-input-placeholder {
  color: #2e8ece;
}
{% endhighlight %}
<div class="demo demo-css-placeholders">
  <style>
  .pl-blue-text::-webkit-input-placeholder {
    color: #2e8ece;
  }

  .pl-blue-text:-moz-placeholder {
    color: #2e8ece;
  }

  .pl-blue-text::-moz-placeholder {
    color: #2e8ece;
  }

  .pl-blue-text:-ms-input-placeholder {
    color: #2e8ece;
  }
  </style>
  <input type="text" placeholder="Начните печатать здесь" class="demo-css-placeholders-input pl-blue-text">
</div>

## Поддерживаемые свойства
Не каждое CSS свойство можно использовать с плэйсхолдерами. Вот полный список поддерживаемых свойств:

* `font` и все связанные свойства (`font-size`, `font-family` и т.д.)
* `background` и все связанные свойства (`background-color`, `background-image` и т.д.)
* `opacity`
* `text-indent`
* `text-overflow`
* `color`
* `text-transform`
* `line-height`
* `word-spacing`
* `letter-spacing`
* `text-decoration`
* `vertical-align`

## Анимации
Идеи анимаций принадлежит блогу [html5.by](http://html5.by/blog/placeholder/).

Все следующие примеры написаны с использованием препроцессора [Sass](http://sass-lang.com/). К каждому прилагается ссылка на SassMeister, по которой вы сможете найти скомпилированный CSS код.

Скорее всего, вы захотите применять анимации к плэйсхолдерам при фокусе на поле ввода. Делается всё это достаточно просто. Достаточно всего несколько раз использовать написанный ранее миксин `placeholder`:

{% highlight scss %}
.input {
  @include placeholder {
    // Стили для нормального состояния
  }
  
  &:focus {
    @include placeholder {
      // Стили после события focus
    }
  }
}
{% endhighlight %}

### Изменение прозрачности
[Посмотреть на SassMeister](http://www.sassmeister.com/gist/d32a2b8e6716c223cf53)
{% highlight scss %}
.input {
  @include placeholder {
    color: #aaa;
    opacity: 1;
    transition: opacity 300ms;
  }
  
  &:focus {
    @include placeholder {
      opacity: 0;
    }
  }
}
{% endhighlight %}

<div class="demo demo-css-placeholders">
  <style>
    .pl-opacity::-webkit-input-placeholder {
      color: #aaa;
      opacity: 1;
      transition: opacity 300ms;
    }

    .pl-opacity:-moz-placeholder {
      color: #aaa;
      opacity: 1;
      transition: opacity 300ms;
    }

    .pl-opacity::-moz-placeholder {
      color: #aaa;
      opacity: 1;
      transition: opacity 300ms;
    }

    .pl-opacity:-ms-input-placeholder {
      color: #aaa;
      opacity: 1;
      transition: opacity 300ms;
    }

    .pl-opacity:focus::-webkit-input-placeholder {
      opacity: 0;
    }

    .pl-opacity:focus:-moz-placeholder {
      opacity: 0;
    }

    .pl-opacity:focus::-moz-placeholder {
      opacity: 0;
    }

    .pl-opacity:focus:-ms-input-placeholder {
      opacity: 0;
    }
  </style>
  <input type="text" placeholder="Демо: изменение прозрачности" class="demo-css-placeholders-input pl-opacity">
</div>

### Сдвиг вправо и влево
[Посмотреть на SassMeister](http://www.sassmeister.com/gist/75caebe3bff350e44930)

Чем больше ширина поля ввода, тем больше должно быть значение свойства `text-indent`. Для стандартного поля ввода будет достаточно `500px`, для более широких стоит подбирать вручную. От ширины поля ввода и значения `text-indent` зависит скорость анимации. Для сдвига влево нужно использовать отрицательные значения, например `-500px`.
{% highlight scss %}
.input {
  @include placeholder {
    text-indent: 0px;
    transition: text-indent 300ms;
  }
  
  &:focus {
    @include placeholder {
      text-indent: 500px;
    }
  }
}
{% endhighlight %}

<div class="demo demo-css-placeholders">
  <style>
    .pl-shift-right::-webkit-input-placeholder {
      color: #aaa;
      text-indent: 0px;
      transition: text-indent 300ms;
    }

    .pl-shift-right:-moz-placeholder {
      color: #aaa;
      text-indent: 0px;
      transition: text-indent 300ms;
    }

    .pl-shift-right::-moz-placeholder {
      color: #aaa;
      text-indent: 0px;
      transition: text-indent 300ms;
    }

    .pl-shift-right:-ms-input-placeholder {
      color: #aaa;
      text-indent: 0px;
      transition: text-indent 300ms;
    }

    .pl-shift-right:focus::-webkit-input-placeholder {
      text-indent: 1200px;
    }

    .pl-shift-right:focus:-moz-placeholder {
      text-indent: 1200px;
    }

    .pl-shift-right:focus::-moz-placeholder {
      text-indent: 1200px;
    }

    .pl-shift-right:focus:-ms-input-placeholder {
      text-indent: 1200px;
    }

    .pl-shift-left {
      margin-top: 1rem;
    }

    .pl-shift-left::-webkit-input-placeholder {
      color: #aaa;
      text-indent: 0px;
      transition: text-indent 300ms;
    }

    .pl-shift-left:-moz-placeholder {
      color: #aaa;
      text-indent: 0px;
      transition: text-indent 300ms;
    }

    .pl-shift-left::-moz-placeholder {
      color: #aaa;
      text-indent: 0px;
      transition: text-indent 300ms;
    }

    .pl-shift-left:-ms-input-placeholder {
      color: #aaa;
      text-indent: 0px;
      transition: text-indent 300ms;
    }

    .pl-shift-left:focus::-webkit-input-placeholder {
      text-indent: -500px;
    }

    .pl-shift-left:focus:-moz-placeholder {
      text-indent: -500px;
    }

    .pl-shift-left:focus::-moz-placeholder {
      text-indent: -500px;
    }

    .pl-shift-left:focus:-ms-input-placeholder {
      text-indent: -500px;
    }

  </style>
  <input type="text" placeholder="Демо: сдвиг вправо" class="demo-css-placeholders-input pl-shift-right">
  <input type="text" placeholder="Демо: сдвиг влево" class="demo-css-placeholders-input pl-shift-left">
</div>

### Сдвиг вниз
[Посмотреть на SassMeister](http://www.sassmeister.com/gist/e44b656477afd1b3f943)

Как и в прошлом примере анимация зависит от размеров воля ввода, но в этом случае внимание своит обратить на высоту. Для подавляющего большинства полей ввода искомое значение `line-height` будет находиться в пределах `100px`. К сожалению, с помощью свойства `line-height` невозможно реализовать эффект сдвига вверх, так как свойство не принимает отрицательные значения.

{% highlight scss %}
.input {
  @include placeholder {
    text-indent: 0px;
    transition: text-indent 300ms;
  }
  
  &:focus {
    @include placeholder {
      text-indent: 500px;
    }
  }
}
{% endhighlight %}

<div class="demo demo-css-placeholders">
  <style>
    .pl-shift-down::-webkit-input-placeholder {
      color: #aaa;
      line-height: 15px;
      transition: line-height 300ms;
    }

    .pl-shift-down:-moz-placeholder {
      color: #aaa;
      line-height: 15px;
      transition: line-height 300ms;
    }

    .pl-shift-down::-moz-placeholder {
      color: #aaa;
      line-height: 15px;
      transition: line-height 300ms;
    }

    .pl-shift-down:-ms-input-placeholder {
      color: #aaa;
      line-height: 15px;
      transition: line-height 300ms;
    }

    .pl-shift-down:focus::-webkit-input-placeholder {
      line-height: 50px;
    }

    .pl-shift-down:focus:-moz-placeholder {
      line-height: 50px;
    }

    .pl-shift-down:focus::-moz-placeholder {
      line-height: 50px;
    }

    .pl-shift-down:focus:-ms-input-placeholder {
      line-height: 50px;
    }
  </style>
  <input type="text" placeholder="Демо: сдвиг вниз" class="demo-css-placeholders-input pl-shift-down">
</div>

### Всё вместе
Чтобы использовать код анимаций для плэйсхолдеров было приятно и удобно, можно написать небольшую библиотеку миксинов для любого препроцессора. Библиотека выглядит следующим образом ([посмотреть на SassMeister](http://www.sassmeister.com/gist/3b3ee316ae83698f82f2)):

{% highlight scss %}
@mixin placeholder {
  &::-webkit-input-placeholder {@content}
  &:-moz-placeholder           {@content}
  &::-moz-placeholder          {@content}
  &:-ms-input-placeholder      {@content}  
}

@mixin pl-shift($side: left, $position: 500px, $duration: 200ms) {
  @include placeholder {
    text-indent: 0;
    transition: text-indent $duration;
  }
  &:focus {
    @include placeholder {
      text-indent: if($side == left, -$position, $position);
    }
  }
}

@mixin pl-slide-down($position: 5, $duration: 200ms) {
   @include placeholder {
    line-height: 1;
    transition: line-height $duration;
  }
  &:focus {
    @include placeholder {
      line-height: $position;
    }
  } 
}

@mixin pl-fade-out($duration: 200ms) {
  @include placeholder {
    opacity: 1;
    transition: opacity $duration;
  }
  &:focus {
    @include placeholder {
      opacity: 0;
    }
  } 
}
{% endhighlight %}

Использовать её очень просто. Достаточно подключить желаемый миксин к любому полю ввода или просто создать одно глобальное правило для всех пэйсхолдеров на странице:
{% highlight scss %}
// Для отдельных элементов
.pl-shift-right {
  @include pl-shift( right ); 
}

.pl-fade-out {
  @include pl-fade-out; 
}

// Для всего остального
@include pl-shift( left );
{% endhighlight %}

## Autoprefixer
Если вы не используете препроцессор и всё ещё не хотите, чтобы ваш исходный CSS файл превратился в кашу из префиксов для всех возможных браузеров, то обратите внимание на [Autoprefixer](https://github.com/postcss/autoprefixer). С его помощью чистый CSS можно сделать грязным (но уже в другом файле), добавив все необходимые префиксы ко всем свойствам. Чтобы заставить плагин работать с пэйсхолдерами достаточно использовать псевдоэлемент `::placeholder`:
{% highlight scss %}
::placeholder { color: orange; }

.input::placeholder { color: blue; }
{% endhighlight %}
После парсинга ваших стилей Autoprefixer создаст отдельный CSS файл, в котором пропишет все необходимые префиксы для всех указанных вами браузеров.

## Что дальше
Как я уже писал выше, всё, что связано с применением стилей к плэйсхолдерам ещё не стандартизировано. Скоро это исправят. В спецификацию [Selector Level 4](https://www.w3.org/TR/selectors4/#placeholder-shown-pseudo) был добавлен псевдокласс `:placeholder-shown`, который, наконец-то, приведёт к стандарту всю ту безумную смесь из псевдоклассов и псевдоэлементов, которая существует сейчас. Следить за поддержкой можно на [caniuse](http://caniuse.com/#feat=css-placeholder-shown) (сейчас не поддерживается ни в одном браузере).

Применять стили с помощью `:placeholder-shown` будет гораздо проще:
{% highlight scss %}
.input:placeholder-shown {
  color: blue;
}
{% endhighlight %}