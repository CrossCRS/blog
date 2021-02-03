/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

function TextLink({ className, to, active, light, children, ...other }) {
  const linkClasses = classNames({
    'inline-block py-2 px-4 hover:text-green-500': true,
    'text-gray-800': !light && !active,
    'text-gray-700 font-light': light,
    'text-green-500 font-semibold': active,
    [`${className}`]: className,
  });

  return (
    <Link
      to={to}
      className={linkClasses}
      {...other}
    >
      {children}
    </Link>
  );
}

TextLink.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  active: PropTypes.bool,
  light: PropTypes.bool,
  children: PropTypes.any,
};

TextLink.defaultProps = {
  className: '',
  to: '/',
  children: '',
  active: false,
  light: false,
};

export default TextLink;
