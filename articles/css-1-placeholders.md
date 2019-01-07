# Стилизация плэйсхолдеров

Атрибут `placeholder` используется для создания подсказок внутри пустых полей ввода (теги `<input>` и `<textarea>`). В этой статье я рассмотрю способы стилизации плэйсхолдеров, а также, как сделать их более удобными в использовании.

Начнём с примера для тех, кто ещё не знает, что такое плэйсхолдер и как его использовать:
```html
<input type="email" placeholder="example@gmail.com">
```

При разработке интерфейсов следует учитывать особенности поведения плэйсхолдеров. Текст плэйсхолдера исчезает, как только начинается ввод. Именно поэтому не стоит использовать их для передачи информации о самом поле ввода (сколько и какие именно символы оно должно содержать). Для данных целей лучше всего использовать тег `<label>` или параграф с небольшой подсказкой. Подробнее об особенностях использования плэйсхолдеров можно почитать [здесь](https://www.nngroup.com/articles/form-design-placeholders/).

## Стилизация
Для стилизации плэйсхолдеров используются следующие правила:
```css
::-webkit-input-placeholder { color: blue; }
::-moz-placeholder          { color: blue; } /* Firefox 19+ */
:-moz-placeholder           { color: blue; } /* Firefox 18- */
:-ms-input-placeholder      { color: blue; }
```

Выглядит ужасно, не так ли? И на это есть причина — до сих пор CSS правила для плэйсхолдеров не были стандартизированы и имплементация в каждом браузере различная. Подробнее о всех необходимых префиксах можно узнать на [caniuse](http://caniuse.com/#feat=css-placeholder).

Если вы используете CSS-препроцессор, то, скорее всего, для применения стилей к плэйсхолдерам вам будет удобнее всего написать простой миксин. Пример на Sass:
```scss
@mixin placeholder {
  &::-webkit-input-placeholder { @content; }
  &:-moz-placeholder           { @content; }
  &::-moz-placeholder          { @content; }
  &:-ms-input-placeholder      { @content; }  
}
```

В зависимости от контекста миксин можно использовать как для глобального применения стилей, так и для отдельных элементов ([опробуйте на SassMeister](http://www.sassmeister.com/gist/60195e45fcbbdf50cf4f)):

```scss
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
``` 

#### Пример
Синий текст для плэйсхолдера (никогда так не делайте):
```scss
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
```

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

```scss
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
```

### Изменение прозрачности
[Посмотреть на SassMeister](http://www.sassmeister.com/gist/d32a2b8e6716c223cf53)
```scss
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
```

### Сдвиг вправо и влево
[Посмотреть на SassMeister](http://www.sassmeister.com/gist/75caebe3bff350e44930)

Чем больше ширина поля ввода, тем больше должно быть значение свойства `text-indent`. Для стандартного поля ввода будет достаточно `500px`, для более широких стоит подбирать вручную. От ширины поля ввода и значения `text-indent` зависит скорость анимации. Для сдвига влево нужно использовать отрицательные значения, например `-500px`.
```scss
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
```

### Сдвиг вниз
[Посмотреть на SassMeister](http://www.sassmeister.com/gist/e44b656477afd1b3f943)

Как и в прошлом примере анимация зависит от размеров воля ввода, но в этом случае внимание стоит обратить на высоту. Для подавляющего большинства полей ввода искомое значение `line-height` будет находиться в пределах `100px`. К сожалению, с помощью свойства `line-height` невозможно реализовать эффект сдвига вверх, так как свойство не принимает отрицательные значения.

```scss
.input {
  @include placeholder {
    color: #aaa;
    line-height: 15px;
    transition: line-height 300ms;
  }
  
  &:focus {
    @include placeholder {
      line-height: 50px;
    }
  }
}
```

### Всё вместе
Чтобы использовать код анимаций для плэйсхолдеров было приятно и удобно, можно написать небольшую библиотеку миксинов для любого препроцессора. Библиотека выглядит следующим образом ([посмотреть на SassMeister](http://www.sassmeister.com/gist/3b3ee316ae83698f82f2)):

```scss
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
```

Использовать её очень просто. Достаточно подключить желаемый миксин к любому полю ввода или просто создать одно глобальное правило для всех плэйсхолдеров на странице:
```scss
// Для отдельных элементов
.pl-shift-right {
  @include pl-shift( right ); 
}

.pl-fade-out {
  @include pl-fade-out; 
}

// Для всего остального
@include pl-shift( left );
```

## Autoprefixer
Если вы не используете препроцессор и всё ещё не хотите, чтобы ваш исходный CSS файл превратился в кашу из префиксов для всех возможных браузеров, то обратите внимание на [Autoprefixer](https://github.com/postcss/autoprefixer). С его помощью чистый CSS можно сделать грязным (но уже в другом файле), добавив все необходимые префиксы ко всем свойствам. Чтобы заставить плагин работать с плэйсхолдерами, достаточно использовать псевдоэлемент `::placeholder`:
```scss
::placeholder { color: orange; }

.input::placeholder { color: blue; }
```
После парсинга ваших стилей Autoprefixer создаст отдельный CSS файл, в котором пропишет все необходимые префиксы для всех указанных вами браузеров.

## Что дальше
Как я уже писал выше, всё, что связано с применением стилей к плэйсхолдерам ещё не стандартизировано. Скоро это исправят. В спецификацию [Selector Level 4](https://www.w3.org/TR/selectors4/#placeholder-shown-pseudo) был добавлен псевдокласс `:placeholder-shown`, который, наконец-то, приведёт к стандарту всю ту безумную смесь из псевдоклассов и псевдоэлементов, которая существует сейчас. Следить за поддержкой можно на [caniuse](http://caniuse.com/#feat=css-placeholder-shown) (сейчас не поддерживается ни в одном браузере).

Применять стили с помощью `:placeholder-shown` будет гораздо проще:
```scss
.input:placeholder-shown {
  color: blue;
}
```
