import React, { useState } from 'react';
import { ReactComponent as ErrorSign } from '../../assets/exclamation_point.svg';
import './Login.css';
import { ReactComponent as YoutubeLogo } from '../../assets/youtube_logo.svg'; // Updated import
import Register from '../registerPage/Register';

const Login = ({ isVisible, closeLoginPopup, openRegisterPopup }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [showRegistration, setShowRegistration] = useState(false); // State to toggle between login and register forms

  const toggleRegisterForm = () => {
    setShowRegistration(!showRegistration); // Corrected state variable name
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      const response = await fetch('/users.json'); // Fetch users.json from public directory
      if (!response.ok) {
        throw new Error('Failed to fetch users data');
      }
      const users = await response.json(); // Parse JSON data

      // Check if the entered username and password match any user in users array
      const user = users.find((user) => user.username === username && user.password === password);

      if (user) {
        // Authentication successful
        alert('Login successful!'); // Replace with redirect or other action
      } else {
        // Authentication failed
        setError('Username or password are not correct. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching or parsing users data:', error);
      setError('Failed to authenticate. Please try again later.'); // Generic error message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="form-popup" id="myForm" style={{ display: isVisible ? 'block' : 'none' }}>
      {!showRegistration ? (
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div>
            <button type="button" id="btn-cancel" onClick={closeLoginPopup}>X</button>
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
        <Register isVisible={true} closeRegisterPopup={toggleRegisterForm} /> // Render Register component when showRegistration is true
      )}
    </div>
  );
};

const openForm = () => {
  document.getElementById("myForm").style.display = "block";
};

const closeForm = () => {
  document.getElementById("myForm").style.display = "none";
}

export { openForm };
export default Login;
