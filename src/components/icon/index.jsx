import React, {PropTypes} from 'react';
import Base from 'components/base';
import {classNames} from 'lib/util';
import config from 'components/config';
import style from './style';

/**
 *
 * @type {{size: *}}
 */
const propTypes = {
  size: PropTypes.oneOf(config.iconSizes).isRequired
};

/**
 *
 * @type {{size: number}}
 */
const defaultProps = {
  size: config.defaultIconSize
};

/**
 * Wrapper component for creating Icon Compoments.
 *
 * @param {function} Element
 * @param {string} dpName Component display name
 * @returns {function({children: *, size: *, props: *})}
 * @constructor
 */
const Icon = (Element, dpName = 'Icon') => {
  const IconCmp = ({children, size, ...props}) => {
     return (
       <Base className={classNames(style.icon, style[`icon${size}`])}>
         <Element {...props}/>
         {children}
       </Base>
     );
  };

  IconCmp.propTypes    = propTypes;
  IconCmp.defaultProps = defaultProps;
  IconCmp.displayName  = dpName;

  return IconCmp;
};

export default Icon;
