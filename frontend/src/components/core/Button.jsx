/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Button({ className, color, onClick, disabled, basic, children, ...other }) {
  const btnClasses = classNames({
    'px-4 py-2 border border-transparent rounded-sm shadow-sm font-semibold': true,
    'focus:outline-none focus:ring': !disabled,
    'text-white': !disabled && !basic,
    'bg-blue-500 hover:bg-blue-600 focus:ring-blue-200': !disabled && !basic && !color,

    'bg-green-500 hover:bg-green-600 focus:ring-green-200': !disabled && !basic && color === 'green',
    'bg-green-400 hover:bg-green-600 focus:ring-green-200': !disabled && !basic && color === 'lightgreen',
    'bg-red-500 hover:bg-red-600 focus:ring-red-200': !disabled && !basic && color === 'red',
    'bg-red-400 hover:bg-red-600 focus:ring-red-200': !disabled && !basic && color === 'lightred',

    'bg-gray-100 text-gray-400 cursor-default focus:outline-none': disabled,
    'bg-gray-200 hover:bg-gray-300 focus:ring-gray-100 text-gray-900': !disabled && !color && basic,
    [`${className}`]: className,
  });

  return (
    <button
      type="button"
      className={btnClasses}
      onClick={onClick}
      {...other}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  basic: PropTypes.bool,
  children: PropTypes.any,
};

Button.defaultProps = {
  className: '',
  color: '',
  children: '',
  onClick: undefined,
  disabled: false,
  basic: false,
};

export default Button;
