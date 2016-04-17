---
title:  "React на практике: приложение с сортировкой и поиском данных"
categories: JavaScript
date:   2016-04-15 12:50:58 +0300
identifier: react-practice-search-and-sort

description: "В первом выпуске React Challenge я предложил вам построить небольшое приложение на React, чтобы вы смогли прощупать библиотеку на более сложном проекте, чем, например, TODOList. Для выполнения челенджа у вас был небольшой стартовый шаблон, который отвечал за компилирование JavaScript и Sass, а также за генерирование случайных данных для приложения. Всего в первом челендже по официальным данным (количество форков на Github) приняло участие более 150 человек и многие даже довели дело до конца. Настало время во всём разобраться и подвести итоги."

tags: [react]
---

В первом выпуске [React Challenge](http://rtivital.github.io/react-challenge-sort-and-search/) я предложил вам построить небольшое [приложение](http://rtivital.github.io/react-challenge-sort-and-search-solution/) на React, чтобы вы смогли прощупать библиотеку на более сложном проекте, чем, например, TODOList. Для выполнения челенджа у вас был небольшой [стартовый шаблон](https://github.com/rtivital/react-challenge-sort-and-search), который отвечал за компилирование JavaScript и Sass, а также за генерирование случайных данных для приложения. Всего в первом челендже по официальным данным (количество форков на Github) приняло участие более 150 человек и многие даже довели дело до конца. Настало время во всём разобраться и подвести итоги.

Весь исходный код, который будет описываться в этой стате вы сожете найти в [этом репозитории](https://github.com/rtivital/react-challenge-sort-and-search-solution). Но не забывайте также и о том, что это не единственное решение данного челенджа, есть много других (во многом более элегантных или продвинутых), которые вы сможете найти [здесь](https://vk.com/wall-97408246_7667).

## Загружаем данные
Для загрузки данных напишем для себя отдельный модуль, который назовём `load.js` и положим в папку `utils`. Загрузка данных будет происходить асинхронно после инициализации самого приложения, поэтому удобно воспользоваться [промисами](https://learn.javascript.ru/promise):
{% highlight javascript %}
// load.js с промисами
export default url => {
  return new Promise((success, fail) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.addEventListener('load', () => {
      request.status >= 200 && request.status < 400
        ? success(request.responseText)
        : fail(new Error(`Request Failed: ${request.statusText}`));
    });

    request.addEventListener('error', () => {
      fail(new Error('Network Error'));
    });

    request.send();
  });
};
{% endhighlight %}

Теперь мы можем асинхронно загрузить любой файл с сервера подобным образом
{% highlight javascript %}
// импортируем функцию для загрузки
import load from './utils/load';

load('data.json')
  .then(data => {
    /* эта функция сработает для загруженных данных */
  });
{% endhighlight %}

Напомню, что данные, которые мы хотим загрузить с сервера представляют собой массив объектов вида
{% highlight javascript %}
{
  "id": 0,
  "name": "Chad Snyder",
  "age": 28,
  "phone": "(629) 653-9041",
  "image": "owl",
  "phrase": "Owmeco jen be tezpoksim vojuz..."
}
{% endhighlight %}

## Главный компонент App
Во главе всего приложения стоит большой начальнык `<App />`, который группирует все остальные компоненты и указывает им своим состоянием, когда нужно ререндериться. После инициализации приложения `<App />` проводит загрузку данных и обновляет содержимое страницы. 

### Состояние
У приложения есть всего три свойства, которые необходимо использовать в состоянии: данные, полученные с сервера, номер активного пользователя и поисковый запрос, введённый в строку поиска. Изначальные настройки для состояния будут выглядеть следующим образом: данных нет, поискового запроса тоже, активный пользователь под номером 0.
{% highlight javascript %}
this.state = {
  data: null,
  term: '',
  active: 0
};
{% endhighlight %}

### Загружаем данные
Для загрузки данных проще всего создать отдельный метод. Назовём его условно `loadData`. Используя компонент, мы можем указать его свойства, передавая "атрибуты". В данном случае будет очень удобно указать подобный параметр для компонента `<App />` для обозначения того, какой файл необходимо загрузить. 
{% highlight javascript %}
// Метод loadData()
loadData() {
  // Загружаем данные из файла, переданного в качестве параметра
  load(this.props.data).then(users => {
    // После загрузки обновляем состояние
    this.setState({
      data: JSON.parse(users)
    });
  });
}

// инициализируем компонент в index.js
render(<App data='data.json' />, document.getElementById('app'));
{% endhighlight %}

### Общаемся с другими компонентами
Чтобы дать возможность дочерним компонентам обновлять состояние, создадим ещё один метод, который назовём `updateData`. Метод будет принимать объект и просто устанавливать его в качестве текущего состояния:

{% highlight javascript %}
updateData(config) {
  this.setState(config);
}
{% endhighlight %}

Позже при использовании метода `render` мы сможем передать данную функцию в качестве параметра другому компоненту, и он сможет обновить состояние родительского компонента.
{% highlight javascript %}
render() {
  return (<div update={this.updateData.bind(this)}></div>)
}
{% endhighlight %}

### Всё вместе
Мы хорошо подготовились к созданию других компонентов, но до сих пор не написали содержимое метода `render`. Но приступим к этому только в самом конце, когда будут готовы все остальные компоненты. Пока же ограничимся обычным `Hello, World!`:
{% highlight javascript %}
export default class App extends Component {
  constructor(props) {
    super(props);
    // Устанавливаем состояние
    this.state = {
      data: null,
      active: 0,
      term: ''
    };
    // Сразу загружаем данные
    this.loadData();
  }

  loadData() {
    load(this.props.data).then(users => {
      this.setState({
        data: JSON.parse(users)
      });
    });
  }

  updateData(config) {
    this.setState(config);
  }

  render() {
    return (<div>Hello, World!</div>)
  }
}
{% endhighlight %}

## Отображение
Данные на странице отображаются в двух областях: первая область отвечает непосредственно за отображение всех существующих пользователей (выделим для неё компонент `<UserList />`), вторая область отображает текущего пользователя, которого можно выбрать по клику из `<UserList />` (назовём `<ActiveUser />`).

### Отображение всех данных (компонент UserList)
Очевидно, что для простого отображения данных нет необходимости создавать компоненты с состоянием. Поэтому для такой простой операции воспользуемся функциональным компонентом (functional stateless component). 

Итак, у нас есть массив данных, которые следует отобразить на странице в виде таблицы. Нам понадобится немного шаблонизации, с которой отлично справится React. Составим для себя шаблон, по которому будут отображаться каждый пользователь.
{% highlight HTML %}
<tr>
  <td><img src="image.svg" class="user-image" /></td>
  <td>Имя пользователя</td>
  <td>Возраст</td>
  <td>Телефон</td>
</tr>
{% endhighlight %}

Получается ряд таблицы со всеми нужными нам данными. Что-то напоминает? Вы угадали, это ещё один компонент! Назовём его `UserData`.
{% highlight javascript %}
import React from 'react';

export default ({ user, update, key }) => {
  return (
    <tr onClick={() => update({ active: key })}>
      <td><img src={`images/${user.image}.svg`} className="user-image" /></td>
      <td>{user.name}</td>
      <td>{user.age}</td>
      <td>8 {user.phone}</td>
    </tr>
  );
};
{% endhighlight %}

И сразу возникает много вопросов:

1. *Компонент получился в виде обычной стрелочной функции?* Всё так и есть. 
2. *Что это за странная конструкция `({ data, update, index })`?* По умолчанию функциональный компонент принимает в качестве аргумента объект, который содержит все параметры, которые передаются компоненту. Здесь же мы сразу используем [реструктуризирующее присваивание](http://jsraccoon.ru/es6-destructuring) и выделяем все свойства, которыми хотим воспользоваться.
3. *Что означает каждый аргумент?* `data` — объект, содержащий информацию об одном пользователе, `update` — функция, написанная нами ранее в компоненте `<App />`, отвечающая за обновление состояния компонента-начальника, `index` — номер пользователя в общей таблице данных — он нам понадобится, когда будем устанавливать содержимое компонента `<ActiveUser />`.
4. *Что будет происходить при клике по ряду?* С помощью `onClick` мы указываем, что хотим обновить состояние нашего приложения. При клике мы воспользуемся написанной нами ранее функцией `updateData`, которую передадим в качестве аргумента. 
5. *Но разве у нас не удалятся все остальные свойства из состояния, если мы устанавливаем только `active`?* Нет, React достаточно умный, чтобы понять, что нам необходимо установить только свойство `active`.
6. *Зачем импортировать React, если мы его не используем?* Несмотря на то что React не используется нами, библиотека всё равно нужна для работы компонента. Без импорта ничего работать не будет.

Отлично! Теперь у нас есть заготовка для шаблонизации и мы смело можем переходить к построению всего списка в `<UserList />`. 

#### Магия шаблонизации
Мы уже выяснили, что для компонента `<UserList />` нет необходимости в состоянии, поэтому, как и в примере выше, мы можем обойтись функциональным вариантом. Компонент представляет из себя таблицу с четырьмя столбцами: изображением, именем, возрастом и телефоном. На ряду с "динамическими" данными, загруженными с сервера, компонент содержит статическую часть — заголовки для таблиц. Поэтому сразу можем наметить для себя базовую разметку:
{% highlight javascript %}
import React from 'react';
import UserData from './UserData';
// Необходимо импортировать и написанный нами ранее компонент UserData

export default ({ data, update }) => {
  return (
    <table className="user-list table table-striped">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Age</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        // Здесь будут отображаться все пользователи
      </tbody>
    </table>
  );
};
{% endhighlight %}

Данные есть, компонент для шаблонизации данных есть, осталось только придумать способ, как все из наших данных (обычных объектов) сделать компонент. Всё просто. Пройдёмся по массиву данных с помощью `map` и создадим новый массив компонентов.
{% highlight javascript %}
const users = data.map((user, index) => {
  return (<UserData user={user} index={index} update={update} />);
});
{% endhighlight %}

У нас есть массив компонентов `<UserData />`, и что дальше? Помним, что React чрезвычайно умный и знает, как решить нашу проблему. Чтобы вывести все данные, всё, что нам необходимо сделать это показать, где они необходимы.
{% highlight javascript %}
import React from 'react';
import UserData from './UserData';
// Необходимо импортировать и написанный нами ранее компонент UserData

export default ({ data, update }) => {
  return (
    <table className="user-list table table-striped">
      // ...
      <tbody>
        // Отображаем всех пользователей
        {users}
      </tbody>
    </table>
  );
};
{% endhighlight %}

И это всё, что от нас требуется. Почти. Остаётся только подумать о том, что будет происходить, если мы не получили данные. В текущем состоянии мы получим ошибку, `data` будет содержать `null` и, соответственно, не получится использовать `map`. Чтобы не попасть в такую неприятную ситуацию, первое, что нам необходимо сделать — проверить, были ли получены данные.
{% highlight javascript %}
// Если данных нет, то отобразим параграф
if (!data) { return (<p>Loading...</p>); }
{% endhighlight %}

Теперь все данные отображаются на странице и работает магическая шаблонизация. Весь код компонента `<UserList />`:
{% highlight javascript %}
import React from 'react';
import UserData from './UserData';

export default ({ data, update }) => {
  if (!data) { return (<p>Loading...</p>); }

  const users = data.map((user, index) => {
    return (<UserData user={user} key={index} update={update} />);
  });

  return (
    <table className="user-list table table-striped">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Age</th>
          <th>Phone</th>
        </tr>
      </thead>

      <tbody>
        {users}
      </tbody>
    </table>
  );
};
{% endhighlight %}

### Текущий пользователь (компонент ActiveUser)
Компонент для отображения текущего пользователя практически ничем не отличается от написанного нами ранее `<UserData />`. Только в данном случае нет необходимости использовать шаблонизацию (на странице за раз может быть только один компонент `<ActiveUser />`), поэтому отличается только разметка для компонента:
{% highlight javascript %}
import React from 'react';

export default ({ data, active }) => {
  if (!data || !data[active]) { return <h3>Nothing found :(</h3>; }

  const user = data[active];

  return (
    <div className="thumbnail">
      <img src={`images/${user.image}.svg`} />

      <div className="thumbnail-caption">
        <h3>{user.name}</h3>
        <table className="user-info table table-responsive">
          <tbody>
            <tr>
              <td>Age:</td>
              <td>{user.age}</td>
            </tr>
            <tr>
              <td>Favorite animal:</td>
              <td>{user.image}</td>
            </tr>
            <tr>
              <td>Phone:</td>
              <td>8 {user.phone}</td>
            </tr>
          </tbody>
        </table>

        <p><b>Favorite phrase:</b> {user.phrase}</p>
      </div>
    </div>
  );
};
{% endhighlight %}

Всё готово! Теперь можно обновить метод `render` главного компонента и увидеть результат:
{% highlight javascript %}
render() {
  return (
    <div className="app container-fluid">
      <div className="row">
        <div className="col-sm-4 col-md-3 col-lg-2">
          <ActiveUser data={this.state.data} active={this.state.active} />
        </div>
        <div className="col-sm-8 col-md-9 col-lg-10">
          <UserList data={this.state.data} update={this.updateData.bind(this)} />
        </div>
      </div>
    </div>
  );
}
{% endhighlight %}

## Ищем пользователей
Искать пользователей будем по имени. Для реализации поиска создадим компонент `<SearchBar />`. Для этого в компоненте создадим поле ввода, которое будем отслеживать на событие change. При вводе или удалении текста событие будет незамедлительно срабатывать и отсеивать или добавлять результаты в поиск. Компонент опять будет написан в функциональном стиле.

{% highlight javascript %}
import React from 'react';

export default ({ term, data, update }) => {
  const dataSearch = e => {};
  return (
    <div className="searchbar form-group">
      <input
        value={term}
        type="text"
        className="form-control"
        placeholder="Search people by name..."
        onChange={dataSearch}
      />
    </div>
  );
};
{% endhighlight %}

Базовая разметка для компонента готова. Также мы создали функцию `dataSearch`, которая и будет творить чудеса. На входе компонент принимает три параметра: `term` — строка, показывающая приложению, что мы ищем в данный момент, `data` — исходные данные, которые будем фильтровать и `update` — функция для обновления состояния компонента `<App />`. Приступим к фильтрации:
{% highlight javascript %}
const dataSearch = e => {
  const value = e.target.value.toLowerCase();

  const filter = data.filter(user => {
    return user.name.toLowerCase().includes(value);
  });

  update({
    data: filter,
    active: 0,
    term: value
  });
};
{% endhighlight %}

Вроде всё понятно и очевидно: полученные данные фильтруются в соответствие с вызываемым событием `change`, заново устанавливается состояние с новыми данными и выбирается первый текущий пользователь. Компонент будет отлично работать. Но у нас есть проблема, большая проблема. Данные, которые находятся в состоянии компонента `<App />` динамические. Мы не можем их использовать для фильтрации, потому что с каждым введённым в поле символом количество данных будет только уменьшаться, пока мы не дойдём до нулевого количества пользователей (пустого массива). Другими словами, использовать данные из состояния нельзя.

Вернёмся немного назад (к моменту загрузки данных) и сохраним исходные данные, которые и будем передавать в компонент `<SearchBar />`. Вспоминаем, что компонент является не более чем обычным классом, а, значит, мы можем записать любое свойство на текущий экземпляр (`this`). Воспользуемся этим и сохраним данные в свойство `this.initialData` при загрузке:
{% highlight javascript %}
// Переписанный метод компонента App
loadData() {
  load(this.props.data).then(users => {
    this.initialData = JSON.parse(users);
    this.setState({
      data: this.initialData
    });
  });
}
{% endhighlight %}

Теперь мы всегда сможем получить доступ к исходным данным внутри любого компонента нашего приложения. Весь код для компонента `<SearchBar />`:
{% highlight javascript %}
import React from 'react';

export default ({ term, data, update }) => {

  const dataSearch = e => {
    const value = e.target.value.toLowerCase();

    const filter = data.filter(user => {
      return user.name.toLowerCase().includes(value);
    });

    update({
      data: filter,
      active: 0,
      term: value
    });
    
  };

  return (
    <div className="searchbar form-group">
      <input
        value={term}
        type="text"
        className="form-control"
        placeholder="Search people by name..."
        onChange={dataSearch}
      />
    </div>
  );
};
{% endhighlight %}

Отобразим поиск на странице:
{% highlight javascript %}
// метод render компонента App
render() {
  return (
    <div className="app container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <Searchbar
            term={this.state.term}
            data={this.initialData}
            update={this.updateData.bind(this)}
          />
        </div>
      </div>

      //... данные
  );
}
{% endhighlight %}

## Сортируем данные (компонент Toolbar)
Сортировка данных является наиболее сложной задачей в первом челендже, поэтому здесь мы не сможем обойтись функциональным компонентом. Сортировка должна работать с текущими данными, то есть теми, которые находятся в состоянии компонента `<App />`. Метод массивов `sort`, с которым мы будем работать имеет не самую приятную особенность — он сортирует исходный массив. При работе с состоянием действует правило: "изменять любые данные можно только с помощью функции `this.setState`". Поэтому при реализации механизма сортировки каждый раз нам придётся создавать новый массив. Заготовка для компонента будет иметь следующий вид:
{% highlight javascript %}
import React, { Component } from 'react';
export default class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.sorted = { age: true, name: true };
  }

  sort(type) {}
  reset() {}

  render() {
    return (
      <div className="toolbar">
        <button className="btn btn-default" onClick={() => this.sort('name')}>
          <i className="fa fa-sort-alpha-asc"></i>  Sort by name
        </button>
        <button className="btn btn-default" onClick={() => this.sort('age')}>
          <i className="fa fa-sort-numeric-desc"></i>  Sort by age
        </button>
        <button className="btn btn-danger" onClick={this.reset.bind(this)}>
          <i className="fa fa-ban"></i>  Reset
        </button>
      </div>
    );
  }
}
{% endhighlight %}

В тулбаре присутствует три кнопки: сортировка по имени, по возрасту и третья, бонусная (изначально не предполагалась) кнопка для очистки поля ввода и удаления всех сортировок. Первые две кнопки запускают сортировку данных с помощью метода `sort` в зависимости от переданного им параметра (`name` или `age`). Также для определения того, в каком порядке стоит сортировать данные, мы создали свойство `sorted` с объектом, указывающим на очерёдность. Теперь мы полностью готовы написать метод `sort`:
{% highlight javascript %}
sort(type) {
  // с помощью реструктуризации создаём две переменные
  const { update, data } = this.props;
  // получаем порядок сортировки
  const isSorted = this.sorted[type];
  // устанавливаем направление
  let direction = isSorted ? 1 : -1;

  // создаём новый массив из данных, чтобы не перезаписывать 
  // состояние и сортируем его
  const sorted = [].slice.call(data).sort((a, b) => {
    // чтобы сортировка всегда была одинаковой учтём все условия
    // функция может вернуть 0, 1 или -1, в зависимости от возвращаемого
    // значения метод массивов sort сделает свой выбор
    if (a[type] === b[type]) { return 0; }
    return a[type] > b[type] ? direction : direction * -1;
  });

  // меняем порядок сортировки
  this.sorted[type] = !isSorted;

  // обновляем состояние
  update({
    data: sorted,
    active: 0
  });
}
{% endhighlight %}

Методом `sort` будут пользоваться первые две кнопки тулбара, для третьей кнопки необходимо написать ещё один метод `reset`, который восстановит изначальное состояние приложения:
{% highlight javascript %}
reset() {
  this.props.update({
    data: this.props.initialData,
    term: '',
    active: 0
  });
}
{% endhighlight %}

Мы почти закончили. Осталось добавить компонент `<Toolbar />` в `<App />`:
{% highlight javascript %}
// метод render компонента App
render() {
  return (
    <div className="app container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <Searchbar
            term={this.state.term}
            data={this.initialData}
            update={this.updateData.bind(this)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <Toolbar initialData={this.initialData} data={this.state.data} update={this.updateData.bind(this)} />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-4 col-md-3 col-lg-2">
          <ActiveUser data={this.state.data} active={this.state.active} />
        </div>
        <div className="col-sm-8 col-md-9 col-lg-10">
          <UserList data={this.state.data} update={this.updateData.bind(this)} />
        </div>
      </div>

    </div>
  );
}
{% endhighlight %}

## Итоги
Написанное мной решение, которое я попробовал вам подробно описать не является единственным или же лучшим. В течении прошедших трёх недель в рамках первого выпуска React Challenge данную задачу решили ещё несколько десятков человек. Всё, что у них получилось, вы сможете найти [здесь](https://vk.com/wall-97408246_7667). Демо конечного приложения можно посмотреть [здесь](http://rtivital.github.io/react-challenge-sort-and-search/), весь исходный код, написанный в данной статье можно найти в [этом репозитории](https://github.com/rtivital/react-challenge-sort-and-search-solution). Спасибо за участие! Буду жать вас на следующем челендже!