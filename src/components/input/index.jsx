import React, {PropTypes} from 'react';
import Base from 'components/base';
import Label from 'components/label';
import {isString} from 'lib/assert';
import style from './style';
import {classNames, callIfFunc} from 'lib/util';

class Input extends React.Component {
  state = {
    dirty: false
  }

  component = null

  onFocus = () => {
    if (this.component) {
      console.log('focus');
    }
  }

  onBlur = () => {
    if (this.component) {
      console.log('blur');
    }
  }

  /**
   *
   */
  onUpdate = () => {
  }

  /**
   *
   */
  onChange = () => {
    console.log('update')
    const dirty = this.component ? !!this.component.value : false;
    this.setState({dirty})
  }


  /**
   *
   * @returns {XML}
   */
  render () {
    const {dirty} = this.state;
    const {...props, className, baseRef} = this.props;
    return (
      <InputComponent
        className={classNames(className, {[style.dirty]: dirty})}
        baseRef={(el, ...args) => {
            this.component = el;
            callIfFunc(baseRef, null, [el, ...args]);
          }
        }
        {...props}
        onChange={this.onChange}
        onBlur={this.onBlur()}
        onFocus={this.onFocus()}
        onUpdate={this.onUpdate()}
     />);
  }
}

/**
 *
 * @param children
 * @param props
 * @returns {XML}
 * @constructor
 */
const InputComponent = ({children, ...props}) => {
  const {
    type,
    label,
    name,
    onBlur,
    onFocus,
    onUpdate,
    onChange,
    className,
    ...elProps
  } = props;

  return (
    <Base
      className={classNames(style.inputContainer, className || null)}
    >
      {label && <Label value={label} htmlFor={name}/>}
      <Base
        tagName='input'
        className={style.input}
        type={type}
        name={name} {...elProps}
        onBlur={onBlur || null}
        onFocus={onFocus || null}
        onChange={onChange || null}
        onUpdate={onUpdate || null}
      />
      {children}
    </Base>
  );
};

/**
 *
 * @type {{type: *, name: *, label, children: (((predicate?:(value:T, index:number, source:Rx.Observable<T>)=>boolean, thisArg?:any)=>Rx.Observable<boolean>)|*), onFocus: (*), onBlur: (*), onChange: (*), onUpdate: (*)}}
 */
InputComponent.propTypes = {
  type: PropTypes.oneOf([
    'text', 'password', 'email', 'number'
  ]),
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  children: PropTypes.any,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onUpdate: PropTypes.func,
};

/**
 *
 * @type {{type: string, mayHaveChildren: boolean, children: null}}
 */
InputComponent.defaultProps = {
  type: 'text',
  mayHaveChildren: true,
  children: null
};

export default Input;
