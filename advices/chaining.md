# Простой chaining

**Chaining** — приём, при котором после вызова каждого метода возвращается исходный объект, таким образом, появляется возможность выполнять несколько методов последовательно, а не вызывать их по отдельности. На его использовании построены методы многих библиотек, например, jQuery:

```javascript
$('div').addClass('active').on('click', function() {
  $(this).toggleClass('active');
});
```

При создании своих функций конструкторов достаточно закончить каждый метод строчкой `return this`, чтобы появилась возможность выполнять методы последовательно:

```javascript
// конструктор в любом случае вернёт объект
// здесь писать строчку return this необязательно
var Sword = function(isSharp) {
  this.isSharp = isSharp;
};

Sword.prototype.sharpen = function() {
  if (!this.isSharp) {
    this.isSharp = true;
  }
  console.log('Sword was sharpened');
  // возвращаем this
  return this;
};

Sword.prototype.kill = function() {
  console.log(this.isSharp ? 'Fatality!' : 'Done some damage');
  this.isSharp = false;
  // возвращаем this
  return this;
};
```

Теперь, когда каждый метод возвращает исходный объект, можно последовательно использовать методы:

```javascript
var sword = new Sword(false);
sword
  .kill()    // Done some damage
  .sharpen() // Sword was sharpened
  .kill()    // Fatality!
  .kill();   // Done some damage
```
