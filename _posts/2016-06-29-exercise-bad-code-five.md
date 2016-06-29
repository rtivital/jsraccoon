---
title:  "Плохой код #5"
categories: JavaScript
date:   2016-06-29 11:00:00 +0300
author_name: "Евгений Бовыкин"
author: missingdays
type: exercise
identifier: exercise-bad-code-5

description: "Исправляем плохой код. Тесты"

tags: [javascript]
---

Все мы любим автоматическое тестирование. Любой проект, переходя из стадии "ручного" во что-то рабочее покрывается тестами, чтобы при каждом рефакторинге или изменении функционала быть увереным, что в код незаметно не вкрались ошибки, не заметные при беглом ручном тестировании. 

Одним из базовых типов тестов являются юнит-тесты. Их задача проста - определить, что функция или класс полностью выполняют свою роль. Писать их чаще всего легко, особенно когда заранее обдуманы все интерфейсы и особенности работы алгоритмов.

Удобнее всего писать юнит-тесты для "чистых" функций, то есть тех, которые возвращают один и тот же результат при одних и тех же входных данных. Например, функция возведения в квадрат всегда будет возвращать именно квадрат числа. Ничто больше не должно влиять на ее функционал. 

Примером "нечистой" функции является запрос в базу данных или ввод числа с экрана. Вызываются они всегда одинаково `Users.findOne({ _id: 42 })` или `input()`, однако результат они возвращают разный, поскольку информация о пользователе в базе данных часто обновляется, а вводить с клавиатуры пользователь может что угодно. Такие функции тестировать сложнее, однако тоже возможно.

Сейчас мы поговорим о качестве юнит-тестов как таковых. С первого взгляда может показаться, что код тестов не влияет на функционал продукта, и поэтому не стоит задумываться о его качестве. Ведь нам не нужно поддерживать его, рефакторить и ускорять, верно? Вовсе нет. Код тестов меняется вместе с кодом функционала. Код тестов должен быть быстрым, иначе кому захочется запускать их? Зачем ждать результатов два часа, если сделал всего-лишь маленькое изменение. В результате тесты запускаются редко, затем не запускаются совсем, и весь их смысл теряется. Поэтому тесты должны быть быстрыми, насколько это возможно, но не в ущерб своей полноте!

Кроме того, тесты могут быть отличными примерами работы ваших классов и методов. Ведь в тестах описаны буквально все крайние случаи и все поведения. Это еще один повод поддерживать код тестов чистым и не менее читабельным, чем "обычный" код.

Ниже приведены юнит-тесты и использованием Mocha + Expect.js. Не страшно, если вы не знакомы с их принципами работы - все должно быть понятно из самого кода. В крайнем случае советую бегло ознакомиться с вводной документацией.

В каждом примере в тестах допущена одна конкретная ошибка (однако возможны и дополнительные некритичные недостатки, которые тоже лучше устранить). Постарайтесь ее найти и подумать, как бы вы переписали их.

{% highlight javascript %}
describe("factorial", ()=>{
  it("should compute factorial of 1", ()=>{
    expect(factorial(1)).to.be(1);
  });

  it("should compute factorial of 2", ()=>{
    expect(factorial(2)).to.be(2);
  });

  it("should compute factorial of 3", ()=>{
    expect(factorial(3)).to.be(6);
  });

  it("should compute factorial of 4", ()=>{
    expect(factorial(4)).to.be(24);
  });

  it("should compute factorial of 5", ()=>{
    expect(factorial(5)).to.be(120);
  });
  /* еще 10 аналогичных тестов */
});
{% endhighlight %}

{% highlight javascript %}

// Здесь можно использовать отдельный модуль
// для всех фейковых данных, однако для упрощения кода
// создадим его здесь
let fakeUser = {
  name: "David"
};

describe("DataBase", ()=>{
  describe("#init", ()=>{
    it("should be empty when created", ()=>{
      let db = new DataBase("127.0.0.1:1337");

      expect(db.size()).to.be(0);
    });
  });

  describe("#add", ()=>{

    it("should add user", ()=>{
      let db = new DataBase("127.0.0.1:1337");

      db.add(fakeUser);

      expect(db.all()[0].name).to.be(fakeUser.name);

      db.clean();
    });

    it("should throw when _id set manually", ()=>{
      let db = new DataBase("127.0.0.1:1337");

      function addUserWithId(){
        db.add({ _id: 42 });     
      } 

      expect(addUserWithId).to.throw(Error);
    });

  });
});
{% endhighlight %}

{% highlight javascript %}

describe("random", ()=>{
  it("should generate numbers close to normal distribution", ()=>{
    let n = 1e10;

    let zeroes = 0, ones = 0;

    for(int i = 0; i < n; i++){
      let r = Math.random();

      if(r < 0.5){
        zeroes += 1;
      } else {
        ones += 1;
      }

    }

    expect(zeroes).to.be.closeTo(ones, n * 1e-8);
  });
});

{% endhighlight %}

{% highlight javascript %}
class SquareBB extends BB {
  /* ... */

  setWidth(width){
    this.setSize(width);
  }

  setHeight(height){
    this.setSize(height);
  }

  setSize(size){
    this.width = size;
    this.height = size;
  }
}

describe("SquareBB", ()=>{

  let squareBB;

  let defaultSize = 500;

  beforeEach(() => {
    squareBB = new SquareBB();
  });

  describe("#setWidth", ()=>{
    it("should set width and height", ()=>{
        squareBB.setWidth(defaultSize);

        expect(squareBB.width).to.be(defaultSize);
        expect(squareBB.height).to.be(defaultSize);
    });
  });

  describe("#setHeight", ()=>{
    it("should set height and width", ()=>{
        squareBB.setWidth(defaultSize);

        expect(squareBB.width).to.be(defaultSize);
        expect(squareBB.height).to.be(defaultSize);
    });
  });

  describe("#setSize", ()=>{
    it("should set height and width", ()=>{
        squareBB.setSize(defaultSize);

        expect(squareBB.width).to.be(defaultSize);
        expect(squareBB.width).to.be(defaultSize);
    });
  });
});
{% endhighlight %}
