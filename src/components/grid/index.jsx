import React, {PropTypes} from 'react';
import Base from 'components/base';
import {classNames} from 'lib/util';
import style from './style';

export const Columns = ({children, ...props}) => {
  return (<Base className={classNames(style.columns, props)} {...props}>{children || null}</Base>);
};

export const Column = ({children, ...props}) => {
  return (<Base className={classNames(style.column, props)} {...props}>{children || null}</Base>);
};

Columns.propTypes = {
  children: PropTypes.oneOfType([Column])
};
