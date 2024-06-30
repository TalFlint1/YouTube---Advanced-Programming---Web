import React, { useState } from 'react';
import { ReactComponent as ErrorSign } from '../../assets/exclamation_point.svg';
import './Login.css';
import Register from '../registerPage/Register';
import { openFormReg } from '../registerPage/Register';
import { ReactComponent as YoutubeLogo } from '../../assets/youtube_logo.svg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import the Link component
import axios from 'axios';

const Login = ({ closePopup, toggleRegister, isDarkMode, isVisible, toggleLogin,isLoggedIn}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [showLogoutOption, setShowLogoutOption] = useState(false); // State to show/hide logout option
  const [showRegistration, setShowRegistration] = useState(false); // State to toggle between login and register forms
  const navigate = useNavigate();

  const toggleRegisterForm = () => {
    closeFormLogin();
    openFormReg();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      const response = await axios.post('/api/users/login', { username, password });
      const { token } = response.data;

      if (token) {
        localStorage.setItem('jwtToken', token);
        toggleLogin(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    toggleLogin(false); // Update login state
    // Additional logout logic if needed
  };

  const toggleLogoutOption = () => {
    setShowLogoutOption(!showLogoutOption);
  };

  const renderLoginButton = () => {
    if (!isLoggedIn) {
      return (
        <div className="button-container">
          <button type="submit" id="loginbutton">Login</button>
          <button type="button" id="regbutton" onClick={toggleRegisterForm}>Create a new account</button>
        </div>
      );
    }
  };

  const renderUserProfile = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
    return (
      <div className="user-profile">
        <img
          src={currentUser.profile_picture}
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
            value={formData.username}
            onChange={handleChange}
            className={error ? 'error-input' : ''}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
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
