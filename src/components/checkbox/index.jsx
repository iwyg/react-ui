import React, {PropTypes} from 'react';
import Base from 'components/base';
import style from './style';

const whenChanged = (fn) => {
	return (event) => fn(event.target.checked);
};

const CheckBox = ({onChange, onBlur, onFocus, name, ...props}) => {
	return (
		<Base {...props} className={style.checkBox}>
			<input
				type='checkbox'
				name={name}
				onChange={whenChanged(onChange)}
				onBlur={onBlur}
				onFocus={onFocus}
		/>
			<div className={style.checker}>
			</div>
		</Base>
	);
};

CheckBox.propTypes = {
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
	name: PropTypes.string,
	style: PropTypes.object,
	className: PropTypes.string,
};

CheckBox.defaultProps = {
	style: {},
	name: null,
	onChange: (val) => val,
	onBlur: null,
	onFocus: null,
};

export default CheckBox;
