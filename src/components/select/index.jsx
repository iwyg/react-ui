import React, {PropTypes} from 'react';
import Base from 'components/base';
import {classNames} from 'lib/util';
import style from './style';

const Select = ({options, className, ...props}) => {
  return (
    <Base className={classNames(style.selectContainer, className)}>
      <Base tagName='select' {...props}>
        {Object.keys(options).map((key, i) => {
          return (<option key={i} value={key}>{options[key]}</option>);
        })}
      </Base>
      <Base className={style.selectSlate}></Base>
    </Base>
  );
};

Select.propTypes = {
  options: PropTypes.object,
  onChange: PropTypes.func,
  className: PropTypes.string
};

Select.defaultProps = {
  options: {}
};

export default Select;
