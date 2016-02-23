---
title:  "Что за треугольник?"
categories: JavaScript
date:   2016-02-02 12:50:58 +0300
type: exercise
identifier: exercise-triangles

description: "Всего существует 3 вида треугольников: остроугольные, прямоугольные и тупоугольные. В задаче требуется написать функцию, которая будет тестировать треугольники и сообщать, к какому виду они относятся."

tags: [javascript]
---

Напишите функцию `triangle`, которая тестирует переданный ей треугольник и возвращает его тип. Треугольники бывают: остроугольными, прямоугольными и тупоугольными. Функция принимает три числа, которые соответствуют длине каждой стороны.
{% highlight javascript %}
triangle(2, 4, 6); // Не существует
triangle(7, 3, 2); // Не существует
triangle(8, 5, 7); // Остроугольный
triangle(3, 4, 5); // Прямоугольный
triangle(7, 12, 8); // Тупоугольный
{% endhighlight %}

### Решение
Чтобы решить задачу придётся вспомнить немного школьной геометрии. Начнём с простого: треугольник не существует, если сумма длины двух любых его сторон меньше, либо равен длине третьей стороны:
{% highlight javascript %}
var triangle = function(a, b, c) {
  if (a + b <= c || a + c <= b || b + c <= a) {
    return 'Треугольник не существует';
  }
};
{% endhighlight %}

Условие выглядит громоздким и трудным для чтения. Его можно немного упростить с помощью методов массивов `sort`: если отсортировать аргументы по возрастанию, то мы точно будем знать, что на последнем месте будет находиться сторона с наибольшей длиной:
{% highlight javascript %}
var triangle = function() {
  var args = [].sort.call(arguments);
  if (args[0] + args[1] < args[2]) {
    return 'Треугольник не существует';
  }
};
{% endhighlight %}

Недостаток данного способа заключается в том, что функция будет обрабатывать все передаваемы ей аргументы, а не только первые три. Эту проблему достаточно просто решить с помощью метода массивов `slice`:
{% highlight javascript %}
var triangle = function() {
  var args = [].slice.call(arguments, 0, 3).sort();
  if (args[0] + args[1] < args[2]) {
    return 'Треугольник не существует';
  }
};
{% endhighlight %}

Данное дейтвие также приведёт к преобразованию псевдомассива `arguments` к массиву, поэтому можно сразу же воспользоваться методом `sort`.

Итак, что мы уже имеем? Отсортированный по возрастанию массив аргументов и вывод о том, что треугольника не существует. Задача практически решена. Остаётся только сравнивать квадраты длин сторон в соотвествие с правилами:

1. Если квадраты двух меньших сторон равны квадрату третьей стороны, то треугольник прямогульный.
2. Если меньше, то — треугольник тупоугольный.
3. Если больше, то — треугольник остроугольный.

Решение целиком:
{% highlight javascript %}
var triangle = function() {
  var sides = [].slice.call(arguments, 0, 3).sort();
  if (sides[0] + sides[1] < sides[2]) {
    return 'Треугольник не существует';
  }

  var sum = (Math.pow(sides[0], 2) + Math.pow(sides[1], 2)).toFixed(2);
  var side = Math.pow(sides[2], 2).toFixed(2);

  if (sum === side) { return 'Треугольник прямоугольный'; }
  if (sum < side) { return 'Треугольник тупоугольный'; }
  if (sum > side) { return 'Треугольник остроугольный'; }
};
{% endhighlight %}

Тесты
{% highlight javascript %}
console.log(triangle(2, 4, 6)); // Не существует
console.log(triangle(7, 3, 2)); // Не существует
console.log(triangle(8, 5, 7)); // Остроугольный
console.log(triangle(3, 4, 5)); // Прямоугольный
console.log(triangle(7, 12, 8)); // Тупоугольный
{% endhighlight %}

Немного короче с ES6 ([посмотреть на babejs.io](https://babeljs.io/repl/#?experimental=true&evaluate=true&loose=false&spec=false&code=const%20triangle%20%3D%20(...args)%20%3D%3E%20%7B%0D%0A%20%20const%20sides%20%3D%20args.slice(0%2C%203).sort()%3B%0D%0A%20%20if%20(sides%5B0%5D%20%2B%20sides%5B1%5D%20%3C%3D%20sides%5B2%5D)%20%7B%0D%0A%20%20%20%20return%20'%D0%A2%D1%80%D0%B5%D1%83%D0%B3%D0%BE%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA%20%D0%BD%D0%B5%20%D1%81%D1%83%D1%89%D0%B5%D1%81%D1%82%D0%B2%D1%83%D0%B5%D1%82'%3B%0D%0A%20%20%7D%0D%0A%0D%0A%20%20const%20sum%20%3D%20(Math.pow(sides%5B0%5D%2C%202)%20%2B%20Math.pow(sides%5B1%5D%2C%202)).toFixed(2)%3B%0D%0A%20%20const%20side%20%3D%20Math.pow(sides%5B2%5D%2C%202).toFixed(2)%3B%0D%0A%0D%0A%20%20if%20(sum%20%3D%3D%3D%20side)%20%7B%20return%20'%D0%A2%D1%80%D0%B5%D1%83%D0%B3%D0%BE%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA%20%D0%BF%D1%80%D1%8F%D0%BC%D0%BE%D1%83%D0%B3%D0%BE%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9'%3B%20%7D%0D%0A%20%20if%20(sum%20%3C%20side)%20%7B%20return%20'%D0%A2%D1%80%D0%B5%D1%83%D0%B3%D0%BE%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA%20%D1%82%D1%83%D0%BF%D0%BE%D1%83%D0%B3%D0%BE%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9'%3B%20%7D%0D%0A%20%20if%20(sum%20%3E%20side)%20%7B%20return%20'%D0%A2%D1%80%D0%B5%D1%83%D0%B3%D0%BE%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA%20%D0%BE%D1%81%D1%82%D1%80%D0%BE%D1%83%D0%B3%D0%BE%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9'%3B%20%7D%0D%0A%7D%3B%0D%0A%0D%0Aconsole.log(triangle(2%2C%204%2C%206))%3B%20%2F%2F%20%D0%9D%D0%B5%20%D1%81%D1%83%D1%89%D0%B5%D1%81%D1%82%D0%B2%D1%83%D0%B5%D1%82%0D%0Aconsole.log(triangle(7%2C%203%2C%202))%3B%20%2F%2F%20%D0%9D%D0%B5%20%D1%81%D1%83%D1%89%D0%B5%D1%81%D1%82%D0%B2%D1%83%D0%B5%D1%82%0D%0Aconsole.log(triangle(8%2C%205%2C%207))%3B%20%2F%2F%20%D0%9E%D1%81%D1%82%D1%80%D0%BE%D1%83%D0%B3%D0%BE%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%0D%0Aconsole.log(triangle(3%2C%204%2C%205))%3B%20%2F%2F%20%D0%9F%D1%80%D1%8F%D0%BC%D0%BE%D1%83%D0%B3%D0%BE%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9%0D%0Aconsole.log(triangle(7%2C%2012%2C%208))%3B%20%2F%2F%20%D0%A2%D1%83%D0%BF%D0%BE%D1%83%D0%B3%D0%BE%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9)):
{% highlight javascript %}
const triangle = (...args) => {
  const sides = args.slice(0, 3).sort();
  if (sides[0] + sides[1] <= sides[2]) {
    return 'Треугольник не существует';
  }

  const sum = (Math.pow(sides[0], 2) + Math.pow(sides[1], 2)).toFixed(2);
  const side = Math.pow(sides[2], 2).toFixed(2);

  if (sum === side) { return 'Треугольник прямоугольный'; }
  if (sum < side) { return 'Треугольник тупоугольный'; }
  if (sum > side) { return 'Треугольник остроугольный'; }
};
{% endhighlight %}