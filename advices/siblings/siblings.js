// Используйте метод массивов filter, чтобы получить 
// все соедние элементы относительно заданного
var _getSiblings = function(el) {
	return [].filter.call(el.parentNode.children, function(child) {
	  return child !== el;
	});
};