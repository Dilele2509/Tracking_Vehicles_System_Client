import React from 'react';
import PropTypes from 'prop-types';
import './InputBox.css';

const InputBox = ({ label, type = "text", value, onChange, fullWidth = false, error = false, disabled = false, ...rest }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value); // Call parent onChange with the value
    }
  };

  return (
    <div className="input-container">
      <input
        value={value}
        onChange={handleChange}
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

export default InputBox;
