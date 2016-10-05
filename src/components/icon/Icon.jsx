import React, {PropTypes} from 'react';
import Base from 'components/base';
import {classNames} from 'lib/util';
import style from './style';

const propTypes = {
  size: PropTypes.oneOf([16, 32, 48]).isRequired
};

const defaultProps = {
  size: 48
};

const Icon = (Element, dpName = 'Icon') => {
  const IconCmp = ({children, size, ...props}) => {
     return (<Base className={classNames(style.icon, style[`icon${size}`])}><Element {...props}/>{children}</Base>);
  };

  IconCmp.propTypes    = propTypes;
  IconCmp.defaultProps = defaultProps;
  IconCmp.displayName  = dpName;

  return IconCmp;
};

export default Icon;
