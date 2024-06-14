import React, { useState } from 'react';
import { ReactComponent as ErrorSign } from '../../assets/exclamation_point.svg';
import './Login.css';
import { ReactComponent as YoutubeLogo } from '../../assets/youtube_logo.svg';
import { useNavigate } from 'react-router-dom';

const Login = ({ closePopup }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      closePopup(); // Close the popup on successful login
      navigate('/');
    } else {
      setError('Username or password are not correct. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (   
    <div className="login-form-container">
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
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
};

export default Login;
