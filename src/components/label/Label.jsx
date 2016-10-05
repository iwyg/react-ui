import React, {PropTypes} from 'react';
import Base from 'components/base';

const Label = ({...props}) => {
  const {value, ...elementProps} = props;
  return (<Base tagName='label' {...elementProps}>{value}</Base>);
};

Label.propTypes = {
  value: PropTypes.string.isRequired
};

export default Label;
