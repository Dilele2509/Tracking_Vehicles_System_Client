import React, { useState } from 'react';
import './Authentication.css';
import { InputBox } from '../../Components';
import axios from '../../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Authentication() {
  const notify = (message, type = "info") => {
    toast(message, { type });
  };
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // State for toggling between login and signup


  const handleShowPasswordChange = (event) => {
    setShowPassword(event.target.checked); // Update the showPassword state based on checkbox
  };

  const handleChooseSignUpClick = () => {
    setIsSignUp(true); // Slide to the right for sign up
  };

  const handleChooseLoginClick = () => {
    setIsSignUp(false); // Slide to the left for login
  };

  const handleLogin = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true 
    }; 

    try {
      if (email === '' || password === '') {
        notify("Need to fill them all out", "warning");
        return;
      }
      /* console.log(email, password); */
      const response = await axios.post('/login/user-login', { email, password }, config);
      console.log(response.data);
      if (response.data.status !== 'Error') {
        const userInfo = response.data;

        // Convert deleted value to binary
        const deleted = parseInt(String.fromCharCode(userInfo.deleted.data[0]), 10);
        if (deleted !== 1) {
          if (userInfo.role_id === 'ROLE001') {
            const response = await axios.get('/login/check-status/', config);
            const { status } = response.data;

            console.log('login status: ',status);
            notify("Login successful", "success");
            window.location.href = '/';
          } else {
            console.log('Your account does not have access!');
            notify("Your account does not have access!", "warning");
          }
        } else {
          notify("Your account has been disabled", "error");
        }
      } else {
        notify(response.data.message, "error");
      }
    } catch (error) {
      console.error('Login failed:', error);
      notify("Login failed, please try again", "error");
    }
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
                <button onClick={handleChooseLoginClick}>Login</button>
              </p>
            </div>
          </div>
        </div>

        {/* for login */}
        <div className='form-area'>
          <h2 className='form-title'>Login</h2>
          <div className='form-content'>
            <div className='box-element'>
              <InputBox
                value={email}
                onChange={setEmail}
                type="email"
                label="Email"
                fullWidth />
            </div>
            <div className='box-element'>
              <InputBox
                value={password}
                onChange={setPassword}
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
              <button onClick={handleLogin} className='form-btn'>
                <span>Login</span>
              </button>
              <p>Forgot password?
                <button>Reset</button>
              </p>
              <p>Don't have an account?
                <button onClick={handleChooseSignUpClick}>SignUp</button>
              </p>
            </div>
          </div>
        </div>

        {/* Sliding modal */}
        <div className={`modal-sliding ${isSignUp ? 'modal-slide-right' : 'modal-slide-left'}`}></div>
        {/* Add ToastContainer to display the notifications */}
        <ToastContainer />
      </div>
    </div>
  );
}
