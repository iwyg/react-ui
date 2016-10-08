import React, {PropTypes} from 'react';
import Base from 'components/base';
import style from './style';
import {classNames} from 'lib/util';

/**
 *
 * @param name
 * @returns {string}
 */
const aliasFromName = (name, len = 2) => {
  let parts = name.split(' ');
  const [head, ...tail] = parts.length > 1 ? parts.map(string => string[0]) : parts[0].split('');
  return [head, tail.slice(-(len - 1))].join('');
};

/**
 *
 * @param name
 * @param alias
 * @param props
 * @returns {XML}
 * @constructor
 */
const Alias = ({name, alias, ...props}) => {
  const title = alias || aliasFromName(name);

  return (
    <Base className={classNames(style.alias)} {...props}>
      <span>{title}</span>
    </Base>
  );
};

/**
 * @type {{name: String, alias: String}}
 */
Alias.propTypes = {
  name: PropTypes.string.isRequired,
  alias: PropTypes.string
};

/**
 *
 * @type {{alias: null}}
 */
Alias.defaultProps = {
  alias: null
};

export default Alias;

