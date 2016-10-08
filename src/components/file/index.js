import React, {PropTypes} from 'react';
import Base from 'components/base';
import Alias from 'components/alias';
import Avatar from 'components/avatar';
import style from './style';
import {classNames} from 'lib/util';
import {isDefined, isArray, typeOf} from 'lib/assert';
import {ICN_FOLDER, ICN_FOLDER_OPEN} from 'components/icon/Icons';
import Icon from 'components/icon';

/**
 *
 */
const Als         = Avatar(Alias);
const IconDir     = Icon(ICN_FOLDER);
const IconDirOpen = Icon(ICN_FOLDER_OPEN);

/**
 *
 * @param {Array}  paths
 * @param {String} name
 * @param {String} seperator
 *
 * @returns {string}
 */
const pathName = (paths, name, seperator = '/') => {
  return [...paths, name].join(seperator);
};

/**
 *
 * @param data
 * @param level
 *
 * @returns {[*,*]}
 */
const renderTree = (data, level = 0) => {
  let {dirs, files, path} = data;

  const mDirs = dirs.map((dir, i) => {
    const tree = Object.assign({}, dir, {path: pathName(path.split(), dir.path)});
    return (
      <Dir key={tree.path} path={tree.path} >
        <Tree depth={level} treeData={tree}/>
      </Dir>
    );
  });

  const mFiles = files.map((file, i) => {
    const filePath = pathName(path.split(), file.name);
    return (<File {...file} key={filePath} path={filePath} />)
  });

  return [...mDirs, ...mFiles];
};

/**
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
const Tree = ({...props}) => {
  const {treeData, depth} = props;
  return (
    <Base tagName='ul' className={style.tree}>
      {renderTree(treeData, (depth + 1))}
    </Base>
  );
};

/**
 *
 * @type {{layout: *, treeData: *, depth: *}}
 */
Tree.propTypes = {
  layout: PropTypes.oneOf(['list', 'tile']),
  treeData: PropTypes.object.isRequired,
  depth: PropTypes.number.isRequired,
};

/**
 *
 * @param children
 * @param path
 * @param className
 * @param props
 * @returns {XML}
 * @constructor
 */
export const Dir = ({children, path, className, ...props}) => {
  const contents = children && <Base className={style.dirContents} >{children}</Base>;
  return (
    <Base tagName='li' className={classNames(style.dir, className)} {...props}>
      <IconDirOpen/>
      <Base tagName='header' className={style.dirHeader}>
        <Base tagName='label' className={style.dirLabel}> - {path}</Base>
      </Base>
      {contents}
    </Base>);
};

Dir.propTypes = {
  path: PropTypes.string.isRequired,
};

const Meta = ({permission, createdAt, modifiedAt, ...props}) => {
  return (
    <Base>
    </Base>
  )
};

Meta.propTypes = {
  size:  PropTypes.number.isRequired,
  perm:  PropTypes.oneOf(['public', 'private', 'hidden']),
  cDate: PropTypes.oneOfType([Date]),
  mDate: PropTypes.oneOfType([Date])
};

Meta.defaultProps = {
  size: 0
};

/**
 *
 * @param children
 * @param name
 * @param path
 * @param props
 * @returns {XML}
 * @constructor
 */
export const File = ({children, name, path, ...props}) => {
  const {className, ...elProps} = props;
  const ext = elProps.ext || name.split('.').slice(1)[0];

  return (
    <Base tagName='li' className={classNames(style.file, className)} {...elProps}>
      <Base tagName="header">
        <Als name={name} size={48}/>
        <Base tagName="label">{name}</Base>
        <br/>
        <small>{path}</small>
      </Base>
    </Base>
  );
};

File.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string
};

/**
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
const MetaFile = ({...props}) => {
  return (
    <Meta {...props}>
    </Meta>
  );
};

/**
 *
 * @type {{mime: *, ext: *}}
 */
MetaFile.propTypes = {
  mime: PropTypes.string.isRequired,
  ext:  PropTypes.string.isRequired,
};

/**
 *
 * @type {{mime: string, ext: string}}
 */
MetaFile.defaultProps = {
  mime: 'application/octet-stream',
  ext: '',
};

export default Tree;
