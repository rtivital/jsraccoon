# Объектно-ориентированный JavaScript: наследование на практике
В [прошлой статье](http://jsraccoon.ru/oop-example-validation) мы подробно рассмотрели процесс создания библиотеки для валидации данных, полученных из поля ввода. Библиотека хорошо работает и справляется со своей задачей. Тем не менее, если оценить библиотеку в более глобальном масштабе, то можно заметить, что она состоит из двух частей: валидации данных и коммуникации с DOM. 

Для нетерпеливых: посмотреть весь приведённый ниже код и опробовать можно на [codepen](http://codepen.io/rtivital/pen/xVGGEV), также код доступен на [gist.github.com](https://gist.github.com/rtivital/ae1ef6cb529901584d14), можно скачать [zip архив](https://gist.github.com/rtivital/ae1ef6cb529901584d14/archive/ebb77664dd75ef991e64da9d16cd5c6a5d5de1d3.zip) с готовым примером использования.

#### Идея

Валидация данных не зависит от того, что будет происходит с DOM элементами, поэтому всё, что с ней связано можно выделить в отдельный модуль и использовать наследование для доступа к отдельным методам. Создадим для этих целей новый конструктор `DataValidator`, который будет отвечать только за проверку переданных ему данных и на выходе предоставлять полный отчёт по проделанной работе в виде подобного объекта:

```javascript
var results = {
  data: 'email.gmail.com',
  passed: [{ rule: 'max', param: 50 }, { rule: 'min', param: 5 }],
  failed: [{ rule: 'match', param: 'email' }],
  valid: false
}
```

На входе конструктор принимает только сами данные и с помощью метода `init`, в который передаётся объект с правилами, проводит их валидацию:

```javascript
var dataValidation = new DataValidator('email@gmail.com');
var results = dataValidation.init({
  min: 5,
  max: 50,
  match: 'email'
});
```

Другими словами, всё, что требуется от `DataValidator` — провести проверку данных и вернуть полный отчёт по результатам. Конструктор не будет манипулировать DOM элементами, писать сообщения или выводить ошибки. С подобными вещами будут работать его потомки.

#### Конструктор-родитель

Процесс создания валидатора данных уже [должен быть вам знаком](http://jsraccoon.ru/oop-example-validation), поэтому я не буду детально описывать каждый аспект его создания. Новый конструктор обладает лишь одним новым методом `init`, который отвечает за валидацию и создание объекта об ошибках:

```javascript
DataValidator.prototype.init = function(rules) {
  var results = { data: this.data, passed: [], failed: [] };

  for (var rule in rules) {
    var param = rules[rule];
    var config = { rule: rule, param: param };

    if (!this[rule](param)) { results.failed.push(config); }
    else { results.passed.push(config); }
  }

  results.valid = results.failed.length === 0;

  return results;
};
```

После получении объекта с правилами метод `init` создаёт объект результатов валидации, который будет содержать четыре свойства: 

1. `data` — данные, полученные от конструктора, с которыми и будут проводиться все проверки
2. `passed` — массив всех правил, прошедших валидацию
3. `failed` — массив всех правил, проваливших валидацию
4. `valid` — свойство, показывающее были ли переданные данные полностью валидными

Объект результатов получается достаточно ёмким и решение кардинально отличается от предыдущего, где при нахождении ошибки итерации по объекту правил немедленно прекращалась. Новое подход менее оптимизированный, но, тем не менее, `DataValidator` даёт полную оценку переданным ему данным и в результате пользователь получает может выбрать то, что ему нужно.

Полный код модуля с конструктором-родителем:

```javascript
var DataValidator = (function() {
  'use strict';

  var regExps = {
    email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
    url: /^((https?):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
    numbers: /^\d+(\.\d{1,2})?$/,
    digits: /[0-9]*$/,
    letters: /[a-z][A-Z]*$/
  };

  var DataValidator = function(data) {
    this.data = data.trim();
    this.length = this.data.length;
  };

  DataValidator.prototype.min = function(param) { return this.length >= param; };
  DataValidator.prototype.max = function(param) { return this.length <= param; };
  DataValidator.prototype.required = function() { return this.length > 0; };
  DataValidator.prototype.match = function(param) { return regExps[param].test(this.data); };

  DataValidator.prototype.init = function(rules) {
    var results = { data: this.data, passed: [], failed: [] };

    for (var rule in rules) {
      var param = rules[rule];
      var config = { rule: rule, param: param };

      if (!this[rule](param)) { results.failed.push(config); }
      else { results.passed.push(config); }
    }

    results.valid = results.failed.length === 0;

    return results;
  };

  return DataValidator;
})();
```

#### Дочерний конструктор

Теперь, когда у нас есть удобный способ работы с данными мы можем приступать к созданию "грязной" части — конструктора, который будет заниматься работой с DOM, писать сообщения об ошибках и вызывать callback функции. Конструктор `InputValidator` должен иметь доступ к методу `init` и здесь нам поможет наследование. Перед тем, как приступим к созданию конструктора, я ещё раз напомню, как он работает и что принимает на входе:

1. Объект с правилами `rules`, в соответсвие с которыми и будет проводиться валидация
2. Объект `messages` с шаблонами сообщений, которые будут формироваться на основе ошибок валидации
3. Callback функции `onError` и `onSuccess`, которые будут вызваны в зависимости от результатов проверки

```javascript
var emailInput = new InputValidator(document.getElementById('email'), {
  rules: {
    min: 5,
    max: 20,
    match: 'email'
  },
  messages: {
    min: 'Это поле должно содержать минимум %rule% символов. Значение %data% не подходит',
    max: 'Это поле должно содержать максимум %rule% символов. Значение %data% не подходит',
    match: 'Это поле должно содержать адрес электронной почты. Значение %data% не подходит'
  },
  onError: function() { console.log(this.message); },
  onSuccess: function() { console.log('Валидация прошла успешно'); }
});
```

У нас уже есть функция `_createMessage`, отвечающая за генерирование понятных сообщений об ошибках, поэтому сразу добавим её в новый модуль. Также мы знаем, что при инициализации конструктора нам необходимо записать свойство `element`, которое будет ссылать на переданный DOM элемент, а также свойство `settings`, содержащее объект настроек.

```javascript
var InputValidator = (function() {
  'use strict';

  var _createMessage = function(message, settings) {
    for (var key in settings) {
      message = message.replace('%' + key + '%', settings[key]);
    }
    return message;
  };

  var InputValidator = function(element, settings) {
    this.element = element;
    this.settings = settings;
  };

  return InputValidator;
})();
```

#### Наследование

Конструктор `DataValidator` работает со свойством `data`, и это значит, что и `InputValidator` должен обладать данным свойством. Разумеется, мы можем просто записать в конструкторе `this.data = element.value`, но такой подход не обеспечит нам полной безопасности: со временем конструктор `DataValidator` может обновиться и оперировать уже совсем другим свойством. Чтобы избежать подобных проблем достаточно вызвать функцию-конструктор родителя без ключевого слова `new` внутри конструктора потомка. Подобное подход позволит записать все необходимые свойства, выборочно с помощью метода `call` или полностью с помощью `apply` ([подробнее об использовании конструкторов, как обычных функций](http://jsraccoon.ru/oop-inheritance)):

```javascript
var InputValidator = function(element, settings) {
  DataValidator.call(this, element.value);
  this.element = element;
  this.settings = settings;
};
```

В данном случае мы не можем использовать метод `apply`, так как хотим передать не список аргументов, а значение, получаемое в результате операции с исходным аргументом.

Итак, у нас есть свойство `data`, а значит мы можем приступить к наследованию. Всё реализуется достаточно просто — необходимо всего лишь перезаписать прототип `InputValidator` с помощью `Object.create`:

```javascript
InputValidator.prototype = Object.create(DataValidator.prototype);
InputValidator.prototype.construnctor = DataValidator;
```

Теперь у нас есть доступ ко всем свойствам `DataValidator` внутри конструктора `InputValidator`, в том числе и к необходимому нам свойству `init`. Остаётся создать ещё один метод `validate`, который будет проводить валидацию и заниматься "грязной" работой:

```javascript
InputValidator.prototype.validate = function() {
  DataValidator.call(this, this.element.value);
  var results = this.init(this.rules);
  if (!results.valid) {
    var failed = results.failed[0];
    this.message = _createMessage(this.settings.messages[failed.rule], {
      data: results.data,
      rule: failed.param
    });
    this.settings.onError.call(this);
  } else {
    this.settings.onSuccess.call(this);
  }
};
```

При каждом запуске метода `validate` мы хотим перезаписать свойство `data`, чтобы всегда проверять свежие данные. После проведения валидации мы хотим записать первый неудачный результат в переменную `failed`, на основе которой и будет строиться сообщение об ошибке. 

На самом деле, записывать свойство `data` при инициализации конструктора `InputValidator` необязательно, так как оно в любом случае будет перезаписано при использовании метода `validate`.

Весь код модуля `InputValidator`:

```javascript
var InputValidator = (function() {
  'use strict';

  var _createMessage = function(message, settings) {
    for (var key in settings) {
      message = message.replace('%' + key + '%', settings[key]);
    }
    return message;
  };

  var InputValidator = function(element, settings) {
    this.element = element;
    this.settings = settings;
  };

  InputValidator.prototype = Object.create(DataValidator.prototype);
  InputValidator.prototype.construnctor = DataValidator;

  InputValidator.prototype.validate = function() {
    DataValidator.call(this, this.element.value);
    var results = this.init(this.settings.rules);
    if (!results.valid) {
      var failed = results.failed[0];
      this.message = _createMessage(this.settings.messages[failed.rule], {
        data: results.data,
        rule: failed.param
      });
      this.settings.onError.call(this);
    } else {
      this.settings.onSuccess.call(this);
    }
  };

  return InputValidator;
})();
```

#### Расширение возможностей

Прошлая версия библиотеки располагала достаточно скудным набором методов для валидации данных, так как предполагалось, что пользователь сам допишет всё, что ему будет необходимо. В новой версии добавлять свои способы для валидации данных настолько же просто, но новые методы необходимо добавлять родителю `DataValidator`:

```javascript
// Отдельный файл с кодом пользователя, подключенный после DataValidator и InputValidator
DataValidator.prototype.password = function() {
  return this.data.toLowerCase() === '12345qwerty';
};
```

Посмотреть весь приведённый выше код и опробовать можно на [codepen](http://codepen.io/rtivital/pen/xVGGEV), также код доступен на [gist.github.com](https://gist.github.com/rtivital/ae1ef6cb529901584d14), можно скачать [zip архив](https://gist.github.com/rtivital/ae1ef6cb529901584d14/archive/ebb77664dd75ef991e64da9d16cd5c6a5d5de1d3.zip) с готовым примером использования.