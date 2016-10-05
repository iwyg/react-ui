/*
 *
 *
 */

const _typeErr = (expected, thing) => {
  const type = typeof thing;
  throw new TypeError(`Expected ${expected}, got ${type}.`);
};

export const typeOf = (thing, type) => {
  return typeof thing === type;
};

export const isFunc = (thing) => {
  return typeOf(thing, 'function');
};

export const isString = (thing) => {
  return typeOf(thing, 'string');
};

export const isObject = (thing) => {
  return null !== thing && typeOf(thing, 'object');
};

export const isArray = (thing) => {
  return typeOf(thing, 'array');
};

export const isNumber = (thing) => {
  return isNaN(thing) === false && typeOf(thing, 'number');
};

export const stringable = (thing) => {
  return isFunc(thing.toString);
};

export const isDefined = (thing) => {
  return !typeOf(thing, 'undefined');
};

export const assertTypeOf = (thing, type) => {
  if (typeOf(thing, type)) {
    return;
  }

  _typeErr(type, thing);
};

export const assertIsFunc = (thing) => {
  if (isFunc(thing)) {
    return;
  }

  _typeErr('function', thing);
};

export const assertIsObject = (thing) => {
  if (isObject(thing)) {
    return;
  }

  _typeErr('object', thing);
};

export const assertIsArray = (thing) => {
  if (isArray(thing)) {
    return;
  }

  _typeErr('array', thing);
};

export const assertIsNumber = (thing) => {
  if (isNumber(thing)) {
    return;
  }

  _typeErr('number', thing);
};

export const assertIsString = (thing) => {
  if (isString(thing)) {
    return;
  }

  _typeErr('string', thing);
};

export const assertStringable = (thing) => {
  if (stringable(thing)) {
    return;
  }

  throw new Error(`Expected given value to be stringable.`);
};

export const assertDefined = (thing) => {
  if (stringable(thing)) {
    return;
  }

  throw new Error(`Argument is undefined.`);
};
