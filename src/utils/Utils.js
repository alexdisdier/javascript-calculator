export const numberIsDecimal = n => {
  const result = n - Math.floor(n) !== 0;

  if (result) return true;
  else return false;
};
