function remainder(dividend, divisor) {
  if (!isFinite(dividend) || isNaN(divisor) || divisor === 0) {
    return NaN;
  }
  
  if (!isFinite(divisor)) {
    return dividend;
  }

  return dividend - divisor*Math.trunc(dividend/divisor);
}