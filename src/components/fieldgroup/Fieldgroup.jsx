import React, {PropTypes} from 'react';
import Base from 'components/base';

/**
 * Fieldgroup used to arrange field layouts
 * @return {ReactElement}
 */
const Fieldgroup = ({...props}) => {;
  const {children} = props;

  return (
    <Base className='fieldGroup'>
      {children}
    </Base>
  );
};

Fieldgroup.propTypes = {
  children: PropTypes.any
};

Fieldgroup.defaultProps = {
  children: null
};

export default Fieldgroup;
