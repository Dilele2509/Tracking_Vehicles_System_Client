import React, { useState } from 'react';
import './Authentication.css';
import { InputBox } from '../../Components';

export default function Authentication() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // State for toggling between login and signup

  const handleShowPasswordChange = (event) => {
    setShowPassword(event.target.checked); // Update the showPassword state based on checkbox
  };

  const handleSignUpClick = () => {
    setIsSignUp(true); // Slide to the right for sign up
  };

  const handleLoginClick = () => {
    setIsSignUp(false); // Slide to the left for login
  };

  return (
    <div className='login-background'>
      <div className='authenticate-container'>
        {/* for signup */}
        <div className='form-area'>
          <h2 className='form-title'>SignUp</h2>
          <div className='form-content'>
            <div className='box-element'>
              <InputBox type="text" label="User name" fullWidth />
            </div>
            <div className='box-element'>
              <InputBox type="email" label="Email" fullWidth />
            </div>
            <div className='box-element'>
              <InputBox
                type={showPassword ? "text" : "password"} // Change type based on state
                label="Password"
                fullWidth
              />
              <InputBox
                type={showPassword ? "text" : "password"} // Change type based on state
                label="Confirm password"
                fullWidth
              />
              <div className="checkbox-wrapper-46">
                <input
                  type="checkbox"
                  id="cbx-46"
                  className="inp-cbx"
                  checked={showPassword} // Set checked based on state
                  onChange={handleShowPasswordChange} // Handle checkbox change
                />
                <label htmlFor="cbx-46" className="cbx">
                  <span>
                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </svg>
                  </span>
                  <span>Show Password</span>
                </label>
              </div>
            </div>
            <div className='box-element'>
              <button className='form-btn'>
                <span>Sign Up</span>
              </button>
              <p>Have an account?
                <button onClick={handleLoginClick}>Login</button>
              </p>
            </div>
          </div>
        </div>

        {/* for login */}
        <div className='form-area'>
          <h2 className='form-title'>Login</h2>
          <div className='form-content'>
            <div className='box-element'>
              <InputBox type="email" label="Email" fullWidth />
            </div>
            <div className='box-element'>
              <InputBox
                type={showPassword ? "text" : "password"} // Change type based on state
                label="Password"
                fullWidth
              />
              <div className="checkbox-wrapper-46">
                <input
                  type="checkbox"
                  id="cbx-46"
                  className="inp-cbx"
                  checked={showPassword} // Set checked based on state
                  onChange={handleShowPasswordChange} // Handle checkbox change
                />
                <label htmlFor="cbx-46" className="cbx">
                  <span>
                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </svg>
                  </span>
                  <span>Show Password</span>
                </label>
              </div>
            </div>
            <div className='box-element'>
              <button className='form-btn'>
                <span>Login</span>
              </button>
              <p>Forgot password?
                <button>Reset</button>
              </p>
              <p>Don't have an account?
                <button onClick={handleSignUpClick}>SignUp</button>
              </p>
            </div>
          </div>
        </div>

        {/* Sliding modal */}
        <div className={`modal-sliding ${isSignUp ? 'modal-slide-right' : 'modal-slide-left'}`}></div>
      </div>
    </div>
  );
}
