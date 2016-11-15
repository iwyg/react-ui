import React, {PropTypes} from 'react';
import Base from 'components/base';
import css from './style';
import {classNames} from 'lib/util';

const onLoaded = (resolve, src) => {
  return (event) => resolve({event, src});
};

const onErrored = (reject, src) => {
  return (event) => {
    const reason = event.type;
    reject({reason, src});
  };
};

/**
 *
 * @param src
 * @param props
 * @returns {XML}
 * @constructor
 */
const Image = ({src, onLoad, visible, flex, style, className, ...props}) => {
  let _onLoaded;
  let _onErrored;
  const imgStyle = visible ? {opacity: 1} : {opacity: 0};

  const promise = new Promise((resolve, reject) => {
    _onLoaded  = onLoaded(resolve, src);
    _onErrored = onErrored(reject, src);
  });

  onLoad(promise);

  return (
    <Base
      {...props}
      src={src}
      tagName='img'
      style={Object.assign({}, style, imgStyle)}
      className={classNames(css.img, {[css.flex]: flex }, className || null)}
      onLoad={_onLoaded}
      onError={_onErrored}
    />
  );
};

/**
 *
 * @type {{src: *, alt, title, width, height}}
 */
Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  flex: PropTypes.bool,
  onLoad: PropTypes.func,
  visible: PropTypes.bool,
  className: PropTypes.string
};

Image.defaultProps = {
  visible: true,
  flex: true,
  onLoad: (p) => {
    p.then(function () {
    }).catch(function () {
    });
  }
};


export default Image;
