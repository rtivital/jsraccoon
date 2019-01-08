# Объектно-ориентированный JavaScript: немного практики

В прошлых статьях мы рассмотрели [основы работы с объектами](http://jsraccoon.ru/oop-object-base), [функции конструкторы](http://jsraccoon.ru/oop-constructors) и [прототипы](http://jsraccoon.ru/oop-prototypes). А, значит, настало время окончательно во всём разобраться и написать боевой пример — небольшую библиотеку для валидации данных. Полный код библиотеки, которую будем создавать в этой статье, можно найти в [этом репозитории](https://github.com/rtivital/validate). Если же вы хотите в ходе чтения статьи следовать всем инструкциям, то вы можете скачать [стартовый шаблон](https://gist.github.com/rtivital/229191009ff742df62bd).

##### Идея
Библиотека предназначена для валидации данных из одного поля ввода (тега `<input>` или `<textarea>`) и предоставляет несколько простых методов проверки данных. Например, можно проверить правильность введённого email адреса или указать максимальное и минимальное количество символов. Сама по себе, библиотека не даёт огромного функционала, но очень проста в расширении, предлагая пользователю самому дописать необходимые ему методы для валидации данных. В комплекте с библиотекой идёт простой строковый шаблонизатор, который поможет выводить понятные сообщения об ошибках.

##### Параметры
Необходимо всегда точно осознавать, что будет делать созданная вами функция-конструктор перед тем, как вы начнёте писать код. Поэтому, для начала, попробуем описать, что будет делать валидатор данных. Мы уже знаем, что нам обязательно нужно передавать DOM элемент (`<input>` или `<textarea>`), но помимо этого нам также необходимо узнать правила валидации, шаблоны сообщений об ошибках и `callback` функции, которые будут срабатывать при успешном или, наоборот, неуспешном завершении валидации. Очевидно, что параметров достаточно много и передавать их в функцию по одному будет крайне неудобно. Как раз для таких целей и существуют объекты. Используя объект, мы можем удобно сгруппировать все передаваемые в функцию данные. Таким образом, все параметры, которые нужно предоставить функции-конструктору: DOM элемент и объект настроек.
```javascript
var email = document.getElementbyId('email');
var emailValidation = new Validator(email, { /* объект настроек */ });
```

##### Объект настроек
Итак, у нас уже есть поле ввода, данные из которого будут проверяться, но этого же недостаточно. По крайней мере, нужно указать правила, в соответствие с которыми будет проводиться валидация. Для этого создадим свойство `rules` в объекте настроек, которое будет содержать все правила:
```javascript
var settings = {
  rules: {
    min: 8,
    max: 50,
    match: 'email'
  }
};
```

Данная конфигурация скажет функции-конструктору, что поле ввода должно содержать валидный адрес электронной почты, длина которого не меньше 8 и не больше 50 символов. 

К каждому правилу должно прилагаться сообщение об ошибке, которое будет использовано, когда валидация данных будет провалена. Поэтому создадим ещё одно свойство объекта `settings`, которое будет содержать все сообщения об ошибках.
```javascript
var settings = {
  rules: { /* ... */ },
  messages: {
    min: 'Поле должно содержать больше 8 символов',
    max: 'Поле не должно содержать больше 50 символов',
    match: 'Поле должно содержать валидный адрес электронной почты'
  }
};
```

Теперь остался последний, но самый важный шаг для завершения конфигурации — `callback` функции. Для наглядности назовём их `onError` и `onSuccess`. Данные функции, передаваемые с объектом настроек, будут срабатывать при завершении валидации в зависимости от её результата. Они могут содержать всё что угодно, но пока для простоты будем просто выводить в консоль сообщения.
```javascript
var settings = {
  rules: { /* ... */ },
  messages: { /* ... */ },
  onError: function() { console.log('Валидация провалена'); },
  onSuccess: function() { console.log('Валидация прошла успешно'); }
};
```

Итак, основа нашего объекта настроек готова, и мы уже определились со всеми параметрами, передаваемыми в функцию, а, значит, половина работы мы уже сделали.
```javascript
var settings = {
  rules: {
    min: 8,
    max: 50,
    match: 'email'
  },
  messages: {
    min: 'Поле должно содержать больше 8 символов',
    max: 'Поле не должно содержать больше 50 символов',
    match: 'Поле должно содержать валидный адрес электронной почты'
  },
  onError: function() { console.log('Валидация провалена'); },
  onSuccess: function() { console.log('Валидация прошла успешно'); }
};

var email = document.getElementbyId('email');
var emailValidation = new Validator(email, settings);
```

##### Паттерн "Модуль"
При создании библиотеки мы не хотим, чтобы все наши "внутренние" переменные попали в чужие руки (кто знает, что задумали другие разработчики-злодеи). Может возникнуть конфликт имён и любую переменную из нашей библиотеки сможет перезаписать сторонний код. Чтобы этого не произошло, необходимо ограничить доступ. Удобнее всего это сделать с помощью [паттерна "Модуль"](http://forwebdev.ru/javascript/module-pattern/). Всё, что для этого нужно, — обвернуть весь наш код в немедленно вызываемую анонимную функцию и записать результат её выполнения в переменную, которая и будет использоваться другими разработчиками.
```javascript
var Validator = (function() {})();
```

Таким образом, мы создали новую область видимости. Всё, что находится внутри неё, не будет доступно для записи и чтения, если мы сами не запишем данные, как свойство объекта `window`, или не вернём значение — в этом случае то, что возвращает функция будет записано в переменную `Validator`. Создадим функцию-конструктор и экспортируем её из модуля:
```javascript
var Validator = (function() {
  'use strict';

  var Validate = function(element, options) {
    this.element = element;
    this.options = options;
  };

  return Validate;
})();
```

Теперь у нас есть возможность использовать функцию `Validate` вне модуля, так как она была записана в переменную `Validator`.
```javascript
var emailValidation = new Validator('element', 'options');
console.log(emailValidation); // { element: "element", options: "options" }
```

Как я уже писал выше, мы также можем записать любые данные, как свойство объекта `window`. При подобном подходе у нас уже не возникает необходимости возвращать что-либо из модуля. Поэтому и результат выполнения записывать в переменную нет необходимости. 
```javascript
(function() {
  'use strict';

  var Validate = function(element, options) {
    this.element = element;
    this.options = options;
  };

  window.Validator = Validate;
})();
```

##### Запись свойств
Мы уже приступили к созданию функции-конструктора `Validate` и записали два свойства: `element` и `options`. Этого вполне достаточно, но было бы удобно обращаться к некоторым свойствам напрямую, например, писать каждый раз не `this.options.rules`, а просто `this.rules`. Поэтому создадим ещё несколько свойств для удобства:

* `value` для обращения к введенным в поле ввода данным
* `length` — количество символов в полученном `value`
* `rules` — объект, содержащий все правила
* и `messages` — объект со всеми сообщениями

```javascript
var Validate = function(element, options) {
  this.element = element;
  this.options = options;

  this.value = this.element.value.trim();
  this.length = this.value.length;
  this.rules = this.options.rules;
  this.mesages = this.options.messages;
};
```

##### Методы
В начале статьи я писал, что библиотека достаточно минималистична и не располагает огромным количеством методов. Поэтому ограничимся самым минимальным набором:

* `required` — проверка наличия хотя бы одного непробельного символа
* `min` — минимальное количество символов
* `max` — максимальное количество символов
* `match` — проверка соответствия какому-либо паттерну

##### required
Всё, что необходимо сделать в методе — сравнить длину значения `this.length` с нулём. Таким, образом мы убедимся, что был введён хотя бы один непробельный символ: 
```javascript
Validate.prototype.required = function() {
  return this.length > 0;
};
```

##### min и max
Методы `min` и `max` практически повторяют метод `required`, но также принимают параметр, с которым будут сравнивать длину полученного значения `this.length`:
```javascript
Validate.prototype.min = function(param) {
  return this.length >= param;
};

Validate.prototype.max = function(param) {
  return this.length <= param;
};
```

##### match
Метод `match` работает с регулярными выражениями. Для простоты создадим объект, который будет содержать все наши регулярные выражения. Положим его в переменную `regExps` и объявим её вне метода.
```javascript
var regExps = {
  email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
  url: /^((https?):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
  numbers: /^\d+(\.\d{1,2})?$/,
  digits: /[0-9]*$/,
  letters: /[a-z][A-Z]*$/
};

Validate.prototype.match = function(param) {};
```

Теперь мы сможем получить к ним доступ внутри метода `match`. В будущем нам ещё понадобится этот объект, так что поместить его вне метода `match` — хорошая идея. 
Чтобы проверить соответствие значения `this.value` регулярному выражению нужно воспользоваться методом `test`:
```javascript
Validate.prototype.match = function(param) {
  // выбираем регулярное выражение
  var re = regExps[param];
  // Тестируем
  return re.test(this.value);
};

// Кратко
Validate.prototype.match = function(param) {
  return regExps[param].test(this.value);
};
```

##### Всё вместе
Итак, мы написали 4 метода для валидации данных:
```javascript
Validate.prototype.required = function() {
  return this.length > 0;
};

Validate.prototype.min = function(param) {
  return this.length >= param;
};

Validate.prototype.max = function(param) {
  return this.length <= param;
};

Validate.prototype.match = function(param) {
  return regExps[param].test(this.value);
};
```

Для их создания нам каждый раз приходилось обращаться к прототипу функции-конструктора `Validate`. Запись `Validate.prototype` достаточно громоздкая. Чтобы каждый раз не использовать её можно создать переменную, которая будет ссылаться на прототип. Так как любой прототип является не более чем простым объектом, мы можем смело задавать подобные переменные:
```javascript
var fn = Validate.prototype;
fn.required = function() { return this.length > 0; };
fn.min = function(param) { return this.length >= param; };
fn.max = function(param) { return this.length <= param; };
fn.match = function(param) { return regExps[param].test(this.value); };
```

##### Валидация
Сами по себе написанные нами ранее методы бесполезны. Они ничего не умеют, кроме проверки данных. То есть для создания сообщений, группировки этих методов и вызова `callback` функций они не подходят. Поэтому создадим ещё один метод `validate`, который будет отвечать за обработку всего выше перечисленного.
```javascript
fn.validate = function() {};
```

Первое, что нужно сделать — перезаписать значение для `this.value` и `this.length`. При каждом запуске метода `validate` мы хотим получать новые данные из поля ввода и только потом проверять их. 
```javascript
fn.validate = function() {
  this.value = this.element.value.trim();
  this.length = this.value.length;
};
```

Теперь у нас есть самые "свежие" данные и мы можем их использовать для проверки соответствия правилам, которые записаны в объекте `this.rules`. Свойства объекта `this.rules` соответствуют написанным нами ранее методам. Удобнее всего правила перебрать с помощью цикла `for .. in`:
```javascript
// Пример объекта правил
// {
//   min: 8,
//   max: 50,
//   match: 'email'
// }

fn.validate = function() {
  this.value = this.element.value.trim();
  this.length = this.value.length;

  for (var rule in this.rules) {
    var param = this.rules[rule];
  }
};
```

Итак, мы написали цикл, с помощью которого мы переберём все передаваемые в функцию правила. При каждой итерации внутри цикла у нас будет доступ к имени текущего правила, например, `min`, а также к параметру правила, например `8` для правила `min`. Всё, что нам остаётся сделать, — последовательно применить созданные нам ранее методы.
```javascript
fn.validate = function() {
  // ...
  for (var rule in this.rules) {
    var param = this.rules[rule];
    var result = this[rule](param);
  }
};
```

Переменная `result` всегда содержит значение типа `boolean`, с помощью которого мы можем сказать соответствует ли наше `this.value` требованиям, описанным в правилах. Если мы узнали, что значение не соответствует какому-либо правилу, то мы сразу же прерываем выполнение цикла и вызываем `callback` функцию `onError`. Если же значение прошло проверки на все заданные правила, то нужно вызвать функцию `onSuccess`. Перед циклом объявим переменную `isValid`, которая будет сигнализировать о состоянии валидации.
```javascript
fn.validate = function() {
  // ...
  // Изначально считаем, что все правила пройдены
  var isValid = true;
  for (var rule in this.rules) {
    var param = this.rules[rule];
    var result = this[rule](param);
    if (!result) {
      // Если вылидация провалилась, то выставляем значение false
      isValid = false;
      // Вызываем функцию onError
      this.options.onError.call(this);
      // И прерываем выполнение цикла
      break;
    }
  }

  // После завершения цикла проверяем isValid
  if (isValid) {
    // Если всё хорошо, то вызываем функцию onSuccess
    this.options.onSuccess.call(this);
  }
};
```

##### Пишем сообщения
Написанный нами метод `validate` уже сейчас достаточно хорошо. Он умеет проверять соответствие данных всем переданным правилам и вызывать функции в зависимости от результата проверки. Но мы также хотим передавать содержательные сообщения о полученных ошибках. В этом нам поможет простая функция для строковой шаблонизации. Допустим, что на выходе мы хотим получить сообщение, которое будет содержать введённые пользователем данные, а также параметр из наших правил. Чтобы получить подобную конструкцию мы можем составить строку:
```javascript
var rules = {
  min: 8
};
var messages = {
  min: 'Значение должно быть не менее %rule% символов. Значение "%data%" не подходит.'
};
```

В полученной строке необходимо заменить `%rule%` на параметр (в данном случае 8), а `%data%` на значение, полученное от пользователя. Таким образом, со всеми заменами строка будет выглядеть следующим образом: `'Значение должно быть не менее 8 символов. Значение "банан" не подходит.'`

Реализовать подобную шаблонизацию достаточно просто с помощью метода строк `replace`. Чтобы не забивать наш метод `validate` большим количеством кода, создадим для этого отдельную функцию `createMessage`:
```javascript
var createMessage = function(str, rule, data) {
  return str.replace('%rule%', rule).replace('%data%', data);
};

// Сразу же опробуем функцию
createMessage('Данные: %data%, Правило: %rule%','желтый', 'банан');
// Данные: банан, Правило: желтый
```

Функция работает. Но работает только для наших конкретных переменных. Если в будущем мы захотим передавать и другие значения, то у нас ничего не получится. Чтобы это исправить будем передавать в функцию не отдельные параметры, а объект, содержащий все значения, которые нужно заменить.
```javascript
var createMessage = function(str, settings) {
  for (var key in settings) {
    console.log(key, settings[key])
    str = str.replace('%' + key + '%', settings[key]);
  }
  return str;
};

// Сразу же опробуем функцию
createMessage('Данные: %data%, Правило: %rule%', {
  data: 'Банан',
  rule: 'Жёлтый'
});
// Данные: банан, Правило: желтый
```

Теперь функция принимает неограниченное число значений для замены и не зависит от порядка следования этих значений в объекте. Добавим эту функцию в наш модуль и будем использовать в методе `validate`.
```javascript
fn.validate = function() {
  // ...
  // Изначально считаем, что все правила пройдены
  var isValid = true;
  for (var rule in this.rules) {
    var param = this.rules[rule];
    var result = this[rule](param);
    if (!result) {
      isValid = false;
      // Получаем шаблон сообщения из переданного пользователем объекта messages
      var messageTemplate = this.messages[rule];
      // Создаем сообщение с параметрами data и rule
      this.message = createMessage(message, {
        data: this.value,
        rule: param
      })
      this.options.onError.call(this);
      break;
    }
  }
  if (isValid) {
    this.options.onSuccess.call(this);
  }
};
```

Теперь у нас есть сообщение. Но как его можно будет использовать? Как вы, наверное, уже заметили, мы вызываем функции `onError` и `onSuccess` с помощью метода `call`, с помощью которого можно задавать значение `this` для функций. Другими словами, первый аргумент, передаваемый в метод `call` будет использован функцией, как `this`. Таким образом, мы получим возможность использовать все свойства и методы внутри функций.
```javascript
var onError = function() {
  console.log('Ошибка: ' + this.message);
};
```

##### Обращение к прототипу
Чтобы обеспечить удобство создания методов в нашей библиотеке, мы можем экспортировать из нашего модуля не только ссылку на функцию конструктор, но и на её прототип.
```javascript
var Validator = (function(){
  
  var Validate = function() {};
  var fn = Validate.prototype;

  return {
    init: Validate,
    fn: fn
  }
})();
```

Теперь для создания новой валидации нам придется использовать следующую конструкцию:
```javascript
var emailValidation = new Validator.init(/* опции */);
```

Стало немного сложнее, но подобное решение позволяет создавать новые методы для конструктора `Validate`, обращаясь к его прототипу.
```javascript
Vaidator.fn.password = function() {
  return this.value === '1234qwerty';
};

var passwordValidation = new Validator.init(document.getElementById('password'), {
  rules: {
    password: true
  },
  messages: {
    password: 'Пароль %data% неверный'
  }
});
```

##### Код библиотеки целиком
Вы можете посмотреть результат применения библиотеки на [codepen](http://codepen.io/rtivital/pen/JGwaoV) или [скачать работающий пример](https://gist.github.com/rtivital/d5499b4b6c8377d79dd2/archive/4484ac046d7daba0adb1caa80632bc39f9305689.zip).

```javascript
var Validator = (function() {
  'use strict';

  var _createMessage = function(message, settings) {
    for (var key in settings) {
      message = message.replace('%' + key + '%', settings[key]);
    }
    return message;
  };

  // http://youmightnotneedjquery.com/#deep_extend
  var _extend = function(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];

      if (!obj)
        continue;

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object')
            out[key] = _extend(out[key], obj[key]);
          else
            out[key] = obj[key];
        }
      }
    }

    return out;
  };

  var regExps = {
    email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
    url: /^((https?):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
    numbers: /^\d+(\.\d{1,2})?$/,
    digits: /[0-9]*$/,
    letters: /[a-z][A-Z]*$/
  };

  var messages = {
    required: 'This field is required',
    min: 'This field should contain at least %rule% characters',
    max: 'This field should not contain more than %rule% characters',
    match: 'This field shold countain a valid %rule%'
  };

  var Validate = function(element, options) {
    var defaults = {
      regExps: regExps,
      messages: messages
    };

    this.options = _extend({}, defaults, options);
    this.element = element;
    this.regExps = regExps;
  };

  var fn = Validate.prototype;

  fn.validate = function() {
    var isValid = true;

    this.value = this.element.value.trim();
    this.length = this.value.length;

    for (var rule in this.options.rules) {
      var param = this.options.rules[rule];

      if (!this[rule](param)) {
        isValid = false;
        this.message = _createMessage(this.options.messages[rule], {rule: param, data: this.value});
        this.options.onError.call(this);
        break;
      }
    }

    if (isValid) {
      this.options.onSuccess.call(this);
    }
  };

  fn.required = function() { return this.length > 0;};
  fn.min = function(param) { return this.length >= param; };
  fn.max = function(param) { return this.length <= param; };
  fn.match = function(param) { return this.regExps[param].test(this.value); };

  return {
    init: Validate,
    fn: fn
  };
})();
```

Заметили, каким хитрым образом мы установили объект настроек `this.options`? Функция `_extend` широко используется в подобных ситуациях и позволяет переназначить параметры, заданные по умолчанию с помощью объекта настроек.

##### Что дальше?
Написанное нами решение небезопасно и недружелюбно к пользователю. Всё из-за того, что мы не включили ни одной обработки ошибок. Представьте, что будет, если пользователь попробует передать в функцию-конструктор `Validate` DOM элемент, у которого не будет свойства `value`. Или что случится, когда пользователь попробует воспользоваться несуществующим сообщением об ошибке или же регулярным выражением? Попробуйте сами предусмотреть подобные ситуации и улучшить библиотеку. Вы также можете посмотреть мои в [этом репозитории](https://github.com/rtivital/validate).

Если вы хотите ещё попрактиковаться на данном примере, то попробуйте написать следующие методы:

Метод `contain` проверяет нахождение всех переданных подстрок в проверяемых данных:
```javascript
var emailValidator = new Validator.init(email, {
  rules: {
    contain: ['@', '.com', 'gmail']
  }
});
```

Метод `only` проверяет сотоит ли введённое пользователем значение только из указанных символов:
```javascript
var phoneValidator = new Validator.init(phone, {
  rules: {
    only: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '(', ')']
  }
});
```