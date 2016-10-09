import React, {PropTypes} from 'react';
import Base from 'components/base';
import Label from 'components/label';
import {isString} from 'lib/assert';
import style from './style';
import {classNames} from 'lib/util';

const handleBlur = (event) => {
  console.log('on blur');
  console.log(this);
};

const handleChange = (event) => {
  console.log('on change');
  console.log(this);
};

const handleFocus = (event) => {
  console.log('on focus');
  console.log(this);
};

const Input = ({...props}) => {
  const {
    type,
    label,
    name,
    mayHaveChildren,
    children,
    ...elProps
  } = props;
  const InputComponent = (
    <Base
      tagName='input'
      className={style.input}
      type={type}
      name={name}
      {...elProps}
    ></Base>
  );
  const dirtyClass = InputComponent.props.value ? 'loaded' : null;
  const LabelComponent = label ?
    <Label value={label} htmlFor={name}/>
    : null;

  console.log(elProps.value);
  return (
    <Base
      className={classNames(style.inputContainer, props.classNames || null, dirtyClass)}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onChange={handleChange}
    >
      {LabelComponent}
      {InputComponent}
      {mayHaveChildren && children}
    </Base>
  );
};

Input.propTypes = {
  type: PropTypes.oneOf([
    'text', 'password', 'email', 'number'
  ]),
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  mayHaveChildren: PropTypes.bool,
  children: PropTypes.any,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

Input.defaultProps = {
  type: 'text',
  mayHaveChildren: true,
  children: null
};

export default Input;
