console.time('New Array');
var arr = [];
for (var i = 0; i < 100; i++) {
  arr.push({ i: i });
}
console.timeEnd('New Array'); // New Array: 0.318ms