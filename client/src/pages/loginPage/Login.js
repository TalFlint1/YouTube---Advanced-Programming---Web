import React, { useState, useEffect } from 'react';
import { ReactComponent as ErrorSign } from '../../assets/exclamation_point.svg';
import './Login.css';
import Register from '../registerPage/Register';
import { openFormReg } from '../registerPage/Register';
import { ReactComponent as YoutubeLogo } from '../../assets/youtube_logo.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ closePopup, toggleRegister, isDarkMode, isVisible, toggleLogin, isLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showLogoutOption, setShowLogoutOption] = useState(false); // State to show/hide logout option
  const [showRegistration, setShowRegistration] = useState(false); // State to toggle between login and register forms
  const navigate = useNavigate();

  useEffect(() => {
    const savedStatus = localStorage.getItem('isSignedIn');
    if (savedStatus === 'true') {
      toggleLogin(true);
    }
  }, [toggleLogin]);

  const toggleRegisterForm = () => {
    closeFormLogin();
    openFormReg();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      const response = await axios.post('/api/users/login', { username, password });
      const { token } = response.data;

      if (token) {
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('currentUser', username); // Save the username as a plain string
        localStorage.setItem('isSignedIn', true); // Save signed-in status
        toggleLogin(true);
        alert('Login successful!');
        closeFormLogin();
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again later.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isSignedIn');
    toggleLogin(false); // Update login state
    navigate('/');
  };

  const toggleLogoutOption = () => {
    setShowLogoutOption(!showLogoutOption);
  };

  const renderLoginButton = () => (
    <div className="button-container">
      <button type="submit" id="loginbutton">Login</button>
      <button type="button" id="regbutton" onClick={toggleRegisterForm}>Create a new account</button>
    </div>
  );

  const renderUserProfile = () => {
    const currentUser = localStorage.getItem('currentUser');
  
    return (
      <div className="user-profile">
        <img
          src={currentUser?.profile_picture}
          alt="Profile"
          onClick={toggleLogoutOption}
          className="profile-picture"
        />
        {showLogoutOption && (
          <div className="logout-option">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    );
  };

  const modeClass = isDarkMode ? 'dark-mode' : 'light-mode';

  return (
    <div className={`form-popup ${modeClass}`} id="myFormLogin" style={{ display: isVisible ? 'block' : 'none' }}>
      {!showRegistration ? (
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div>
            <button type="button" id="btn-cancel" onClick={closeFormLogin}>X</button>
          </div>
          <div>
            <YoutubeLogo className="youtube-logo-login" />
          </div>
          
          <h1>Login</h1>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={error ? 'error-input' : ''}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={error ? 'error-input' : ''}
            required
          />
          {error && (
            <div id="error-message">
              <ErrorSign className="error-icon" />
              <span>{error}</span>
            </div>
          )}
          <div className="button-container">
            <p id="forgot-password">Forgot your password?</p>
            {isLoggedIn ? renderUserProfile() : renderLoginButton()}
          </div>
        </form>
      ) : (
        <Register isVisible={true} closeRegisterPopup={toggleRegisterForm} />
      )}
    </div>
  );
};

const openFormLogin = () => {
  document.getElementById("myFormLogin").style.display = "block";
};

const closeFormLogin = () => {
  document.getElementById("myFormLogin").style.display = "none";
}

export { openFormLogin };
export default Login;
