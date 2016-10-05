import {isString, isObject} from 'lib/assert';

const classNames = (...args) => {
  return args.map((name) => {
    return isString(name) ? name : isObject(name) ? classNames.apply(null, Object.keys(name).filter(n => name[n])) : '';
  }).join(' ');
};

export default classNames;
