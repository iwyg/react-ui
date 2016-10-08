import React, {PropTypes} from 'react';
import Base from 'components/base';

/**
 *
 * @param src
 * @param props
 * @returns {XML}
 * @constructor
 */
const Image = ({src, ...props}) => {
  return (<Base src={src} {...props} tagName='img' />);
}

/**
 *
 * @type {{src: *, alt, title, width, height}}
 */
Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Image;
