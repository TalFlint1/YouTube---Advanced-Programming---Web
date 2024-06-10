import React, { useState } from 'react';
import { ReactComponent as ErrorSign } from '../../assets/exclamation_point.svg';
import './Login.css';
import { ReactComponent as YoutubeLogo } from '../../assets/youtube_logo.svg'; // Updated import
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Updated import

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;

    // Retrieve registered users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the entered username and password match any registered user
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      // Authentication successful
      // Redirect to the video display
      navigate('/');
    } else {
      // Authentication failed
      setError('Username or password are not correct. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
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
        <button type="submit">Login</button>
      </form>
      <p> Don't have an account? <Link to="/register">Register here </Link></p>
    </div>
  );
};

export default Login;
