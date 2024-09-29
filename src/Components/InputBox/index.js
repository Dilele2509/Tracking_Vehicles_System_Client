import React from 'react';
import PropTypes from 'prop-types';
import './InputBox.css';

const InputBox = ({ label, type, fullWidth, error, disabled, ...rest }) => {
  // Determine which custom class to apply based on the state
  const inputClassName = `
    input-box 
    ${error ? 'input-box-error' : ''} 
    ${disabled ? 'input-box-disabled' : ''}
  `;

  return (
    <div className="input-container">
      <input
        placeholder={label}
        className="input-field"
        type={type}
        {...rest} // Spread the rest of the props to the input element
      />
      <label htmlFor="input-field" className="input-label">{label}</label>
      <span className="input-highlight"></span>
    </div>
  );
};

// Prop types for validation
InputBox.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  fullWidth: PropTypes.bool,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
};

// Default props
InputBox.defaultProps = {
  type: "text",
  fullWidth: false,
  error: false,
  disabled: false,
};

export default InputBox;
