import React, {PropTypes} from 'react';
import Base from 'components/base';
import Slider from 'components/slider';
import Label from 'components/label';
import {ORIENT_VR} from 'components/constants'
import {toFixed} from 'lib/num';


const valueToDb = (value, prec = 0.01, base = 10) => {
  return toFixed(10 * Math.log10((Math.pow(base, value) - 1) / (base - 1)), prec);
};

const getDb = (value) => {
  return valueToDb(value / 100, .1, 5);
};

export default class Fader extends React.Component {
  state = {
    value: 100,
    db: null,
  }

  /**
   * Sets updated value.
   *
   * @param value
   */
  onUpdate = (value) => {
    const db = getDb(value);
    this.setState({value, db})
  }

  /**
   * Sets initial display value.
   */
  componentWillMount() {
    this.setState({db: getDb(this.state.value)});
  }

  /**
   * Render the fader component.
   *
   * @returns {XML}
   */
  render() {
    const {db, value} = this.state;
    const {style, ...props} = this.props;
    const elStyle = Object.assign({}, style, {height: '100%', float: 'left'});

    return (
      <Base style={elStyle} {...props}>
        <Slider appearance={ORIENT_VR} value={value} min={0} max={162} step={.1} onUpdate={this.onUpdate}/>
        <Label value={db}/>
      </Base>
    );
  }
}
