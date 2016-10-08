import React, {PropTypes} from 'react';
import {classNames, className as cn} from 'lib/util';
import {document} from 'global';
import style from 'style';
import {toFixed} from 'lib/num';
import {range} from 'lib/struct';

/**
 * @type {string}
 */
const ORIENT_HR = 'horizontal';

/**
 * @type {string}
 */
const ORIENT_VR = 'vertical';

/**
 *
 * @param value
 * @param min
 * @param max
 * @returns {{val: number, pos: *}}
 */
const getValueAndPos = (value, min, max) => {
  const val = Math.max(min, Math.min(max, value));
  const pos = mapValueToPosition(val, min, max);
return {val, pos};
};

/**
 * @param value
 * @param min
 * @param max
 * @returns {number}
 */
const mapValueToPosition = (value, min, max) => {
  return (value - min) / ((max - min) / 100);
};

/**
 * Slider constructor
 */
class Slider extends React.Component {
  /**
   * @type {{pos: number, focused: boolean}}
   */
  state = {
    pos: 0,
    focused: false,
    moving: false
  }

  /**
   * @type {{inner: null, bar: null}}
   */
  elements = {
    inner: null,
    bar: null,
  }

  /**
   *
   * @type {boolean}
   */
  dragging = false

  /**
   * Calculates the value based on the current dragging point.
   *
   * @param {{x: number, y: number}} mPos
   */
  handleDragMove(mPos) {

    if (!this.state.moving) {
      this.setState({moving: true});
    }

    if (this.dragging) {
      return;
    }

    this.dragging = true;

    requestAnimationFrame(() => {
      this.dragging = false;

      if (this.props.disabled) {
        return;
      }

      const {step, max, min} = this.props;

      let {x, y} = mPos;
      let rect = this.elements.inner.getBoundingClientRect();
      let pos  = Math.max(0, Math.min(1, ((x - rect.left) / rect.width))) * 100;

      let value = toFixed((pos * (max - min) / 100) + min, step);

      // call onUpdate callback
      if (Math.round(value % step) === 0) {
        this.props.onUpdate(value);
      }
    });
  }

  updatePosition(pos) {
    this.setState({pos});
  }

  /**
   * Handles dragging.
   * @param e {MouseEvent}
   */
  onMouseMove = (e) => {
    e.preventDefault();
    this.handleDragMove({x: e.pageX, y: e.pageY});
  }

  /**
   * Handles dragging.
   * @param e {TouchEvent}
   */
  onTouchMove = (e) => {
    e.preventDefault();
    this.handleDragMove({x: e.touches[0].pageX, y: e.touches[0].pageY});
  }

  /**
   * Initialize dragging events.
   */
  onMouseDown = () => {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  /**
   * Initialize dragging events.
   */
  onTouchStart = () => {
    document.addEventListener('touchmove', this.onTouchMove);
    document.addEventListener('touchcancel', this.onTouchCancel);
  }

  /**
   * Cancels dragging events.
   */
  onMouseUp = () => {
    document.removeEventListener('mousemove', this.onMouseMove);
    this.setState({moving: false});
  }

  /**
   * Cancels dragging events.
   */
  onTouchCancel = () => {
    document.removeEventListener('touchmove', this.onTouchMove);
    this.setState({moving: false});
  }

  onBlur = (e) => {
    this.setState({focused: false});
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('touchmove', this.onMouseMove);

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  onFocus = (e) => {
    this.setState({focused: true});

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  componentWillReceiveProps(props, state) {
    const {value, min, max} = props;
    let {pos} = getValueAndPos(value, min, max);

    this.updatePosition(pos);
  }

  componentWillMount() {
    const {min, max, value} = this.props;

    let {val, pos} = getValueAndPos(value, min, max);

    this.updatePosition(pos);

    this.props.onUpdate(val);
  }

  render () {

    const {focused, pos, moving} = this.state;
    const {display} = this.props;

    return (
      <div
        ref="slider"
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        className={classNames(style.slider, {[style.moving]: moving})}
        onMouseUp={this.onMouseUp}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onTouchStart}
        onTouchCancel={this.onTouchCancel}
      >
        <div ref={(node) => this.elements.inner = node} className={style.inner}>
          <div ref='sliderRail' className={style.rail}>
            <div ref={(node) => this.elements.bar = node} className={style.bar} style={{width: `${pos}%`}}>
              <div className={style.handle}>
                <div className={style.ripple}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * @type {{disabled: (*), snap: (*), min, max, values: *, step, value, onUpdate: *, onFocus: (*), onBlur: (*)}}
 */
Slider.propTypes = {
  onUpdate:  PropTypes.func.isRequired,
  onFocus:   PropTypes.func,
  onBlur:    PropTypes.func,
  disabled:  PropTypes.bool,
  snap:      PropTypes.bool,
  min:       PropTypes.number,
  max:       PropTypes.number,
  step:      PropTypes.number,
  value:     PropTypes.number,
  appearance: PropTypes.oneOf([ORIENT_HR, ORIENT_VR])
};

/**
 * @type {{onUpdate: ((e?, value?)), min: number, max: number, value: number, step: number, disabled: boolean, snap: boolean}}
 */
Slider.defaultProps = {
  onUpdate(e, value) {
    console.log(e, value);
  },
  min: 0,
  max: 100,
  value: 0,
  step: 0.01,
  disabled: false,
  snap: false,
  appearance: ORIENT_HR
};

export default Slider;
