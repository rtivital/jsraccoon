function earthquake(quake, year) {
  return quake.map(wave => wave.reduce((a, b) => a + b)).reduce((a, b) => a * b) - 1000 * Math.pow(0.98, new Date().getFullYear() - year) > 10
}