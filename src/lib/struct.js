import {toFixed} from './num';

/**
 * Creates an array of given size determined by min and max.
 *
 * @param {Number} max
 * @param {Number} min
 * @param {Number} step
 * @returns {Array}
 */
export const range = (max, min = 0, step = 1) => {
  return (new Array(Math.round((max - min) / step))).fill(undefined).map((n, i) => {
    return toFixed((i * step), step);
  });
};

