import React, {PropTypes} from 'react'
import Slider from 'components/slider';

class SliderDemo extends React.Component {
  state = {
    value: 20
  }

  onUpdate = (value) => {
    this.setState({value});
  }

  componentWillMount() {
    let {value} = this.props;
    this.setState({value});
  }

  render() {
    const {...props} = this.props;
    const {value} = this.state;

    return (
    <div>
      <Slider {...props} value={value} onUpdate={this.onUpdate}/>
      <label>{this.props.displayValue(value)}</label>
    </div>
    );
  }
}

SliderDemo.propTypes = {
  displayValue: PropTypes.func
};

SliderDemo.defaultProps = {
  displayValue: value => value
};

export default SliderDemo;
