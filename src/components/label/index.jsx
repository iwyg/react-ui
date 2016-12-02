import React, {PropTypes} from 'react';
import Base from 'components/base';

const Label = ({...props}) => {
  const {value, pos, children, ...elementProps} = props;
  return (<Base tagName='label' {...elementProps}>
    {pos === 'before' && <span>{value}</span>}
    {children}
    {pos === 'after' && <span>{value}</span>}
  </Base>);
};

Label.propTypes = {
  children: PropTypes.any,
  value: PropTypes.string.isRequired,
  pos: PropTypes.oneOf(['before', 'after'])
};

Label.defaultProps = {
  pos: 'after'
};

export default Label;
