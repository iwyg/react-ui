import React from 'react';
import Select from 'components/select';


class SelectDemo extends React.Component {
	state = {
		value: null
	}
	onChange = (e) => {
		this.setState({value: e.target.value});
	}
	render () {
		const {value} = this.state;
		const {...props} = this.props;
		return (
			<div>
				<label htmlFor="foo">Select an option</label>
				<Select name="foo" {...props} onChange={this.onChange}></Select>
				<p>{value ? props.options[value]  + ':' + value : 'nothing  selected'}</p>
			</div>
		);
	}
}
export default SelectDemo;
