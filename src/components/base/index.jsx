import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {callIfFunc, classNames} from 'lib/util';
import config from 'components/config';
import defaultStyle from './style';

/**
 * Internal base compenent used to render all ui components.
 */
class Base extends React.Component {

  static contextTypes = {
    ui: PropTypes.object,
  };

  static propTypes = {
    tagName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.element
    ]),
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),
    baseStyle: PropTypes.object,
    style: PropTypes.object,
    baseRef: PropTypes.func
  };

  static defaultProps = {
    baseRef: x => x,
    style: {},
    baseStyle: {}
  }

  constructor(props, {ui}) {
    super();
    const pureRender = {...config, ...ui};
    if (pureRender) {
      this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
  }

  render() {
    const {
      tagName, style, baseStyle, className,
      baseRef, ...elProps
    } = this.props;

    const Component = tagName || 'div';
    const css = Object.assign({}, baseStyle, style);
    const cn  = classNames(defaultStyle.base, callIfFunc(className) || className);

    return (
      <Component
        ref={ref => baseRef(ref)}
        style={css}
        className={cn}
        {...elProps}/>
    );
  }
}

export default Base;
