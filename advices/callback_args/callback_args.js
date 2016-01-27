// Замыкания
var sum = function(a, b) {
  return function() {
    console.log(a + b);
  };
};
// теперь можно передавать аргументы
document.querySelector('a').addEventListener('click', sum(1, 5), false);

// методы функций bind
var log = function(message) {
  console.log(message);
};

var link = document.querySelector('a');

link.addEventListener('click', log.bind(this, 'Hello world'), false);