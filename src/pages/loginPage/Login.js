// pages/loginPage/Login.js

import React, { useState } from 'react';
import Modal from '../../components/Modal/Modal'; // Import the Modal component
import { ReactComponent as ErrorSign } from '../../assets/exclamation_point.svg';
import { ReactComponent as YoutubeLogo } from '../../assets/youtube_logo.svg';
import './Login.css'; // Import the corresponding CSS for Login component

const Login = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    // Dummy authentication logic for demonstration
    if (username === 'user' && password === 'password') {
      alert('Login successful!');
      onClose(); // Close the modal after successful login
    } else {
      setError('Username or password are not correct. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const closeModal = () => {
    setError('');
    setFormData({ username: '', password: '' });
    onClose(); // Close the modal if needed
  };

  return (
    <Modal onClose={closeModal} isOpen={isOpen}>
      <div className="login-container">
        <div className="logo-container">
          <YoutubeLogo className="youtube-logo-login" />
        </div>
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <h1>Log in</h1>
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
            <div className="error-message">
              <ErrorSign className="error-icon" />
              <span>{error}</span>
            </div>
          )}
          <div className="button-container">
            <p id="forgot-password">Forgot your password?</p>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default Login;
