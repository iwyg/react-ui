import React, {PropTypes} from 'react';
import style from 'style';

const Wallpaper = ({...props}) => {
  let {children, src} = props;
  const css =  {
    backgroundImage: `url(${src})`
  };
  return (
    <div className={style.wallpaper} style={css}>{children}</div>
  );
};

Wallpaper.propTypes = {
  src: PropTypes.string.isRequired,
};

Wallpaper.defaultProps = {
  children: null
};

export default Wallpaper;
