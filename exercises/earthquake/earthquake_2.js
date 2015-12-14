function earthquake(tremors, year) {
  const durability = 1000 * Math.pow(0.98, new Date().getFullYear() - year);
  const tremorsStrength = tremors.reduce((strength, tremors) => {
    return strength * tremors.reduce((a, b) => a + b);
  }, 1);
  return tremorsStrength > durability + 10;
}