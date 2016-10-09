import React, {PropTypes} from 'react';
import Base from 'components/base';
import {classNames} from 'lib/util';
import style from './style';
import config from 'components/config';

const sizes = config.sizes;
console.log(style);

/**
 * Reduces possible shape props to a single string representing the shapes' name.
 * @param circle
 * @param square
 * @param diamond
 * @returns {string}
 */
const findShape = ({circle, square, diamond}) => {
  return [{circle}, {square}, {diamond}].map((shape) => {
    const key = Object.keys(shape).pop();
    return [key, shape[key]]
  })
    .filter(shape => shape.pop())
    .reduce((prev, shape) => shape.shift());
};

/**
 *
 * @type {{size: Enum(sizes), circle: bool, diamond: bool, square: bool}}
 */
const propTypes = {
  size: PropTypes.oneOf(sizes),
  circle: PropTypes.bool,
  diamond: PropTypes.bool,
  square: PropTypes.bool,
};

/**
 *
 * @type {{size: number, circle: boolean, diamond: boolean, square: boolean}}
 */
const defaultProps = {
  size: 48,
  circle: true,
  diamond: false,
  square: false
};

/**
 *
 * @param {String} src
 * @param {Number} size
 * @param {object} props
 * @returns {XML}
 * @constructor
 */
const Avatar = (Component, dpName = 'Avatar') => {
  const AvatarCmp = ({size, children, ...props}) => {
    const shape  = findShape(props) || 'circle';

    return (
      <Base className={classNames(style.avatar, style[shape], style[`avatar${size}`])} {...props}>
        <Component {...props}>{children}</Component>
      </Base>
    );
  };

  AvatarCmp.propTypes    = propTypes;
  AvatarCmp.defaultProps = defaultProps;
  AvatarCmp.displayName  = dpName;

  return AvatarCmp;
};

export default Avatar;
