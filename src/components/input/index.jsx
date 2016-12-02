import React, {PropTypes} from 'react';
import Base from 'components/base';
import style from './style';
import {classNames} from 'lib/util';

const Input = ({...props}) => {
  const {label, ...elProps} = props;

  console.log(props.value);

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
  type: PropTypes.oneOf(['text', 'password', 'mail']),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
};

class InputComponent extends React.Component {
  state = {
    value: undefined
  }

  onChange = (event) => {
    const {value} = event.target;
    this.setState({value});
  }

  render () {
    const {onChange, ...props} = this.props;
    const {value} = this.state;
    return (<Input value={value} onChange={this.onChange} {...props}/>);
  }
}

export default InputComponent;
