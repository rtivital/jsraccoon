function earthquake(tremors, year) {
  const durability = 1000 * Math.pow(0.98, new Date().getFullYear() - year);
  
  let strength = 1;
  for (const wave of tremors) {
    const waveStrength = wave.reduce((a, b) => a + b);
    strength *= waveStrength;
    if (strength > durability + 10) {
      return true;
    }
  }

  return strength > durability + 10;
}