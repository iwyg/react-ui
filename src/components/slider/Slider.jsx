import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Input from 'components/input';
import classNames from '../util/classnames';
import style from 'style';
import {document} from 'global';

class Slider extends React.Component {

  state = {
    x: 0,
    y: 0,
    focused: false,
    bw: 0
  }

  elements = {
    inner: null,
    bar: null,
  }

  dragging = false

  handleDragMove(event) {
    if (this.dragging) {
      return;
    }

    this.dragging = true;
    requestAnimationFrame(() => {
      this.dragging = false;
      let pos = this.elements.inner.getBoundingClientRect().left;

      if (this.props.disabled) {
        return;
      }

      this.setValueFromHandlePos(event, pos);
    });
    //const rect = this.elements.inner.getBoundingClientRect();
    //const width = rect.width;
    //const offsetX = this.state.x - rect.left;
    //this.setState({x: e.pageX, y: e.pageY, bw: Math.min(100, (offsetX / width) * 100)});
  }

  onMouseMove = (e) => {
    this.handleDragMove(e);
  }

  onMouseDown = (e) => {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseUp = (e) => {
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  onTouchStart = (e) => {
  }

  onTouchCancel = (e) => {
  }

  onBlur = (e) => {
    this.setState({focused: false});
    document.removeEventListener('mousemove', this.onMouseMove);

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

  setValueFromHandlePos(e, pos) {
    pos = Math.min(0, Math.max(100, pos));

    let value = pos;
    const {min, max, step} = this.props;

    this.props.onUpdate(e, value);
  }

  render () {
    const {x, y, bw, focused} = this.state;
    return (
      <div
        ref="slider"
        className={classNames(style.slider)}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onTouchStart={this.onTouchStart}
        onTouchCancel={this.onTouchCancel}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
      >
        <div ref={(node) => this.elements.inner = node} className={style.inner}>
          <div ref='sliderRail' className={style.rail}>
            <div ref={(node) => this.elements.bar = node} className={style.bar} style={{width: `${bw}%`}}>
              <div className={style.handle}>
                {focused && (<div className={style.ripple}></div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Slider.propTypes = {
  min:      PropTypes.number.isRequired,
  max:      PropTypes.number.isRequired,
  step:     PropTypes.number,
  onUpdate: PropTypes.func.isRequired,
  onFocus:  PropTypes.func,
  onBlur:   PropTypes.func,
  disabled: PropTypes.bool
};

Slider.defaultProps = {
  onUpdate(e, value) {
    console.log(e, value);
  },
  step: 0.01,
  disabled: false,
};

export default Slider;
