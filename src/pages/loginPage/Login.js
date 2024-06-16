import React, { useState } from 'react';
import { ReactComponent as ErrorSign } from '../../assets/exclamation_point.svg';
import './Login.css';
import Register from '../registerPage/Register';
import { openFormReg } from '../registerPage/Register';
import { ReactComponent as YoutubeLogo } from '../../assets/youtube_logo.svg';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import the Link component

const Login = ({ closePopup, toggleRegister, isDarkMode ,isVisible, closeLoginPopup, openRegisterPopup  }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [showRegistration, setShowRegistration] = useState(false); // State to toggle between login and register forms
  const navigate = useNavigate();

  const toggleRegisterForm = () => {
    closeFormLogin();
    openFormReg();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      closeFormLogin();
      navigate('/');
    } else {
      setError('Username or password are not correct. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const modeClass = isDarkMode ? 'dark-mode' : 'light-mode';

  return (
    <div className= {`form-popup ${modeClass}`} id="myFormLogin" style={{ display: isVisible ? 'block' : 'none' }}>
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
            <button type="submit" id="loginbutton">Login</button>
            <button type="button" id="regbutton" onClick={toggleRegisterForm}>Create a new account</button>
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
