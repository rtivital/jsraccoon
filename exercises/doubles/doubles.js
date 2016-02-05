var doubleNum = function(num) {
  var str = num.toString(),
      half = str.slice(str.length / 2);
  return half + half === str ? num : num * 2;
}

function doubleNum(n){
  var div = Math.pow(10, Math.floor((1 + Math.log10(n)) / 2));
  return ((2 - (Math.floor(n / div) == (n % div))) * n  );
}

function doubleNum(num) {
  return /^([0-9]+)\1$/.test(num.toString()) ? num : num * 2;
}