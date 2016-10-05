import React from 'react';
import ReactDOM, {render} from 'react-dom';
import Slider from './components/slider';
//import N from './components/input';
import css from './style';

console.log(style);

let style = document.createElement('link');
style.rel = 'stylesheet';
style.href = 'css/main.css';

document.head.appendChild(style);

let div = document.createElement('div');
div.id = 'main';
document.body.appendChild(div);

let val = 0;
let onChange = (...args) => {
  val = args[0];
};

class Wrapper extends React.Component {
  state = {
    value: 12
  }

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    console.log(value);
    this.setState({value});
  }

  render() {
    return (
      <div>
        <label>{this.state.value}</label>
        <Slider value={this.state.value} min={-50} max={50} onChange={this.onChange}/>
      </div>
    );
  }
}

render(<Wrapper/>, div);
