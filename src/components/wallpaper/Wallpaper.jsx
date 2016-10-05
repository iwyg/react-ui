import React, {PropTypes} from 'react';
import Base from 'components/base';
import style from './style';

/**
 *
 * @param src
 * @returns {{backgroundImage: string}}
 * @constructor
 */
const WpStyle = (src) => {
  return {
    backgroundImage: `url(${src})`
  }
};

/**
 *
 * @param src
 * @param children
 * @param props
 * @returns {XML}
 * @constructor
 */
const Wallpaper = ({src, children, ...props}) => {
  const css = WpStyle(src);

  return (
    <Base className={style.wallpaper} style={css} {...props}>
      {children}
    </Base>
  );
};

/**
 *
 * @type {{src: *}}
 */
Wallpaper.propTypes = {
  src: PropTypes.string.isRequired
};

export default Wallpaper;
