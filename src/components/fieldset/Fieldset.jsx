import React, {PropTypes} from 'react';
import Base from 'components/base';
import Label from 'components/label';

const Fieldset = ({...props}) => {
  const {children, label} = props;
  const labelComponent = label !== null ?
    (<Label value={label} key="fslabel"/>) : null;

  return (
    <Base tagName='fieldset'>
      {labelComponent}
      {children}
    </Base>
  );
};

Fieldset.propTypes = {
  children: PropTypes.any,
  label: PropTypes.string
};

Fieldset.defaultProps = {
  children: null,
  label: null
};

export default Fieldset;
