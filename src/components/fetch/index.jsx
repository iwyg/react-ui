import React, {PropTypes} from 'react';
import Base from 'components/base';
import {classNames} from 'lib/util';
import style from './style';

const onFetchError = (err) => {
  console.error(err);
};

const onFetch = (res) => {
  console.log(res);
};

const Err = ({children}) => {
  return (
    <Base className="fetchErr"></Base>
  );
};


const Fetch = ({url, method, children, ...props}) => {
  return (
    <Base className={classNames(style.fetchContainer)} {...props}>
      {
      /*fetch(url, method).then(props.onFetch).catch(props.onFetchError)*/
      }
    </Base>);
};

Fetch.propTypes = {
  url: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  onFetch: PropTypes.func,
  onFetchError: PropTypes.func,
};

Fetch.defaultProps = {
  children: null,
  onFetch,
  onFetchError
};


export default Fetch;
