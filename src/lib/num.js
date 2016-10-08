/**
 *
 * @param num
 * @returns {boolean}
 */
export const isFloat = (num) => {
  return Math.abs(num % 1) !== 0;
};

/**
 *
 * @param num
 * @param prec
 * @returns {Number}
 */
export const toFixed = (num, prec) => {

  if (!isFloat(prec)) {
    return Math.round(num);
  }

  const decLen = prec.toString().split('.').pop().length;

  return parseFloat(num.toFixed(decLen));
};
