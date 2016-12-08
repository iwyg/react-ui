import React, {PropTypes} from 'react';
import Base from 'components/base';
import style from './style';
import {classNames, callIfFunc} from 'lib/util';

/**
 *
 * @param props
 */
const Input = ({...props}) => {
  const {label, ...elProps} = props;
  return (
    <Base className={style.inputContainer}>
      <Base className={style.input}>
        <input {...elProps}/>
        <label className={classNames(style.label, {[style.dirty]: props.value })}>
          {label}
        </label>
        <div className={classNames(style.baseLine, {[style.dirty]: props.value })}></div>
      </Base>
    </Base>
  );
};

Input.propTypes = {
  value: PropTypes.any,
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'email']),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
};

class InputComponent extends React.Component {
  state = {
    value: undefined
  }

  onChange = (event) => {
    const {onChange} = this.props;
    const {value} = event.target;
    this.setState({value});

    callIfFunc(onChange, this, value);
  }

  render () {
    const {onChange, ...props} = this.props;
    const {value} = this.state;

    return (<Input value={value} onChange={this.onChange} {...props}/>);
  }
}

InputComponent.propTypes = {
  onChange: PropTypes.func
};


export default InputComponent;
