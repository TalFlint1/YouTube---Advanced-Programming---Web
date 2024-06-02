import React, { useState } from 'react';
import { ReactComponent as ErrorSign } from '../assets/exclamation_point.svg';
import './Register.css';
import youtubeLogo from '../assets/youtubelogo.png';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    picture: null,
  });

  const [passwordError, setPasswordError] = useState('');
  const [passwordValidated, setPasswordValidated] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validatePassword = (password) => {
    // Updated regular expression to include special characters !@#$%^&*
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,16}$/;
    if (!passwordRegex.test(password)) {
      return 'Password must be between 8-16 characters and combine letters and numbers.';
    }
    return null; // Password is valid
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== formData.password) {
      return "The passwords don't match. Try again.";
    }
    return null; // Passwords match
  };
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === 'password') {
      const error = validatePassword(value);
      setPasswordError(error);
      setPasswordValidated(true);
    }
  
    if (name === 'confirmPassword') {
      const error = validateConfirmPassword(value);
      setConfirmPasswordError(error);
    }
  
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };
  

  const handlePasswordBlur = () => {
    const error = validatePassword(formData.password);
    setPasswordError(error);
    setPasswordValidated(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("The passwords don't match. Try again.");
      return;
    }
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="register-container">
      <div className="logo-container">
        <img src={youtubeLogo} alt="YouTube Logo" className="youtube-logo" />
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handlePasswordBlur}
          required
        />
        {passwordValidated && passwordError && (
          <div className="error-message">
            <div className="error-icon-container">
              <ErrorSign className="error-icon" />
            </div>
            <div className="pass-error-text-container">
              {passwordError}
            </div>
          </div>
        )}
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {confirmPasswordError && (
          <div className="error-message">
            <div className="error-icon-container">
              <ErrorSign className="error-icon" />
            </div>
            <div className="conf-pass-error-text-container">
              {confirmPasswordError}
            </div>
          </div>
        )}
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Profile Picture:</label>
        <input
          type="file"
          name="picture"
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
