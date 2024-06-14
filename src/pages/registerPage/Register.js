// Register.js
import React, { useState } from 'react';
import { ReactComponent as ErrorSign } from '../../assets/exclamation_point.svg';
import './Register.css';
import { ReactComponent as YoutubeLogo } from '../../assets/youtube_logo.svg';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    picture: null,
  });

  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,16}$/;
    if (!passwordRegex.test(password)) {
      return 'Password must be between 8-16 characters and combine a-Z letters and numbers.';
    }
    return null;
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== formData.password) {
      return "The passwords don't match. Try again.";
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'password') {
      const error = validatePassword(value);
      setPasswordError(error);
    }

    if (name === 'confirmPassword') {
      const error = validateConfirmPassword(value);
      setConfirmPasswordError(error);
    }

    if (name === 'picture') {
      previewImage(files[0]);
    }

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });

    if (value.trim() !== '') {
      setFieldErrors({
        ...fieldErrors,
        [name]: '',
      });
    }
  };

  const previewImage = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handlePasswordBlur = () => {
    const error = validatePassword(formData.password);
    setPasswordError(error);
  };

  const handleConfirmPasswordBlur = () => {
    const error = validateConfirmPassword(formData.confirmPassword);
    setConfirmPasswordError(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFieldErrors = {};
    let hasErrors = false;

    // Check if all required fields are filled
    Object.keys(formData).forEach((key) => {
      if (formData[key] === '' || formData[key] === null) {
        newFieldErrors[key] = 'This field is required';
        hasErrors = true;
      }
    });

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      newFieldErrors.confirmPassword = "The passwords don't match. Try again.";
      hasErrors = true;
    }

    if (hasErrors) {
      setFieldErrors(newFieldErrors);
      return;
    }

    // Initialize users array if it doesn't exist in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Add new user to users array
    const newUser = {
      username: formData.username,
      password: formData.password,
      name: formData.name,
      picture: formData.picture ? URL.createObjectURL(formData.picture) : null,
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    // save the registered user's information in localStorage 'currentUser'
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    // Handle successful registration (e.g., redirect to login page)
    navigate('/');
  };

  const toggleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };

  return (
    <div className="register-container">
      <div className="logo-container">
        <YoutubeLogo className="youtube-logo" />
      </div>
      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <h1>Sign up</h1>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={fieldErrors.username ? 'error-input' : ''}
          required
        />
        {fieldErrors.username && (
          <div className="error-message">
            <ErrorSign className="error-icon" />
            <span>{fieldErrors.username}</span>
          </div>
        )}
        <label>Password:</label>
        <div className="password-container">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handlePasswordBlur}
            className={passwordError || fieldErrors.password ? 'error-input' : ''}
            required
          />
          <span className="tooltip-icon" onClick={toggleTooltip}>
            ?
          </span>
          <div className={`tooltip-text ${tooltipVisible ? 'show' : ''}`}>
            Password must be between 8-16 characters and combine a-Z letters and numbers. It's also possible to use the characters '!@#$%^&*'.
          </div>
        </div>
        {passwordError && (
          <div className="error-message">
            <ErrorSign className="error-icon" />
            <span>{passwordError}</span>
          </div>
        )}
        {fieldErrors.password && (
          <div className="error-message">
            <ErrorSign className="error-icon" />
            <span>{fieldErrors.password}</span>
          </div>
        )}
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleConfirmPasswordBlur}
          className={
            confirmPasswordError || fieldErrors.confirmPassword
              ? 'error-input'
              : ''
          }
          required
        />
        {confirmPasswordError && (
          <div className="error-message">
            <ErrorSign className="error-icon" />
            <span>{confirmPasswordError}</span>
          </div>
        )}
        {fieldErrors.confirmPassword && (
          <div className="error-message">
            <ErrorSign className="error-icon" />
            <span>{fieldErrors.confirmPassword}</span>
          </div>
        )}
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={fieldErrors.name ? 'error-input' : ''}
          required
        />
        {fieldErrors.name && (
          <div className="error-message">
            <ErrorSign className="error-icon" />
            <span>{fieldErrors.name}</span>
          </div>
        )}
        <label>Profile Picture:</label>
        <div className="image-preview-container">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="preview-image"
            />
          )}
          <input
            type="file"
            name="picture"
            onChange={handleChange}
            accept="image/*"
            className={fieldErrors.picture ? 'error-input' : ''}
            required
          />
        </div>
        {fieldErrors.picture && (
          <div className="error-message">
            <ErrorSign className="error-icon" />
            <span>{fieldErrors.picture}</span>
          </div>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
