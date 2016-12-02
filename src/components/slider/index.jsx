import React, {PropTypes} from 'react';
import {classNames, callIfFunc} from 'lib/util';
import {document} from 'global';
import style from 'style';
import {toFixed} from 'lib/num';
import {ORIENT_VR, ORIENT_HR} from 'components/constants';

const PROPERTY_MAP = {
  [ORIENT_VR]: {
    RECT_POS: 'top',
    RECT_PROP: 'height',
    AXIS: 'y'
  },
  [ORIENT_HR] : {
    RECT_POS: 'left', 
    RECT_PROP: 'width', 
    AXIS: 'x' 
  }
};

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
 * @param value {number}
 * @param min {Number}
 * @param max {Number}
 * @returns {Number}
 */
const mapValueToPosition = (value, min, max) => {
  return (value - min) / ((max - min) / 100);
};

/**
 * Slider constructor
 *
 * @TODO: Add keycode support.
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
   * Gets the rect position depending on its appearance (left or top).
   *
   * @returns {string|string}
   */
  getRectPosition() {
    return PROPERTY_MAP[this.props.appearance].RECT_POS;
  }

  /**
   * Gets the rect property depending on its appearance (width or height).
   *
   * @returns {string|string}
   */
  getRectProperty() {
    return PROPERTY_MAP[this.props.appearance].RECT_PROP;
  }

  /**
   * Gets the axis key depending on appearance (x or y).
   *
   * @returns {string|string}
   */
  getDragAxis() {
    return PROPERTY_MAP[this.props.appearance].AXIS;
  }

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

      const {
        max,
        min,
        step,
        appearance
      }          = this.props;
      const n    = mPos[this.getDragAxis()];
      const rect = this.elements.inner.getBoundingClientRect();
      const lt   = rect[this.getRectPosition()];
      const wh   = rect[this.getRectProperty()];
      const m    =  appearance === ORIENT_VR ?
        Math.max(0, Math.min(wh, 0 - ((n - lt) - wh))) :
        n - lt;

      let pos    = Math.max(0, Math.min(1, (m / wh))) * 100;
      let value  = toFixed((pos * (max - min) / 100) + min, step);

      // call onUpdate callback
      if (Math.round(value % step) === 0) {
        this.updateValue(value);
      }
    });
  }

  /**
   * Calls the onUpdate callback.
   *
   * Only calls if value has actually changed.
   *
   * @param value {Number}
   */
  updateValue(value) {
    if (this.props.value !== value) {
      this.props.onUpdate(value);
    }
  }

  /**
   * Updates the handle position.
   *
   * @param pos {Number}
   */
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

  /**
   * @param {MouseEvent} e
   */
  onClick = (e) => {
    this.onMouseMove(e);
    this.setState({moving: false});
  }

  /**
   * @param {TouchEvent} e
   */
  onTouch = (e) => {
    this.onTouchMove(e);
    this.setState({moving: false});
  }

  /**
   * Handle blur event.
   *
   * @param e {Event}
   */
  onBlur = (e) => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('touchmove', this.onMouseMove);

    this.setState({focused: false, moving: false});
    callIfFunc(this.props.onBlur, null, e);
  }

  /**
   * Handle focus event.
   *
   * @param e {Event}
   */
  onFocus = (e) => {
    this.setState({focused: true});
    callIfFunc(this.props.onFocus, null, e);
  }

  /**
   * Update slider
   */
  componentWillReceiveProps(props) {
    const {value, min, max, appearance} = props;
    const {pos}                         = getValueAndPos(value, min, max, appearance === ORIENT_VR);

    this.updatePosition(pos);
  }

  /**
   * Prepare slider
   */
  componentWillMount() {
    const {min, max, value, appearance} = this.props;
    const {val, pos}                    = getValueAndPos(value, min, max, appearance === ORIENT_VR);

    this.updatePosition(pos);
    this.updateValue(val);
  }

  /**
   * Renders the component.
   *
   * @returns {XML}
   */
  render () {

    const {focused, pos, moving}        = this.state;
    const {appearance, value, disabled} = this.props;
    const elStyle                       = {[this.getRectProperty()] : `${pos}%`};

    return (
      <div
        ref="slider"
        onClick={this.onClick}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        className={classNames(
          style.slider,
          {[style[appearance]]: true},
          {[style.moving]: moving},
          {[style.focused]: focused}
        )}
        onMouseUp={this.onMouseUp}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onTouchStart}
        onTouchCancel={this.onTouchCancel}
      >
        <div ref={(node) => this.elements.inner = node} className={style.inner}>
          <div ref='sliderRail' className={style.rail}>
            <div ref={(node) => this.elements.bar = node} className={style.bar} style={elStyle}>
              <div className={style.handle}>
                <div className={style.ripple}></div>
              </div>
            </div>
          </div>
        </div>
        <input type="hidden" disabled={disabled} value={value} />
      </div>
    );
  }
}

/**
 * @type {{disabled: (*), snap: (*), min, max, values: *, step, value, onUpdate: *, onFocus: (*), onBlur: (*)}}
 */
Slider.propTypes = {
  onUpdate:   PropTypes.func.isRequired,
  onFocus:    PropTypes.func,
  onBlur:     PropTypes.func,
  disabled:   PropTypes.bool,
  snap:       PropTypes.bool,
  min:        PropTypes.number,
  max:        PropTypes.number,
  step:       PropTypes.number,
  value:      PropTypes.number,
  appearance: PropTypes.oneOf([ORIENT_HR, ORIENT_VR])
};

/**
 * @type {{onUpdate: ((value {Numbner})), min: number, max: number, value: number, step: number, disabled: boolean, snap: boolean}}
 */
Slider.defaultProps = {
  onUpdate : value => value,
  min: 0,
  max: 100,
  value: 0,
  step: 0.01,
  disabled: false,
  snap: false,
  appearance: ORIENT_HR
};

export default Slider;
