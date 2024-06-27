import React, { useState } from 'react';
import { ReactComponent as ErrorSign } from '../../assets/exclamation_point.svg';
import './Register.css';
import { ReactComponent as YoutubeLogo } from '../../assets/youtube_logo.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ isDarkMode, isVisible, closeRegisterPopup }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    profile_picture: null,
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

    if (name === 'profile_picture') {
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

  const handleSubmit = async (e) => {
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
  
    try {
      // alert('test!');
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      
      formDataToSend.append('password', formData.password);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('profile_picture', formData.profile_picture);
      
    
      await axios.post('/api/users/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('test4!');
    
      alert('Registration successful!');
      // Handle redirection or any other logic here after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed!');
    }
  };

  const toggleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };

  const modeClass = isDarkMode ? 'dark-mode' : 'light-mode';

  return (
    <div className={`popup ${modeClass}`} id="myFormReg" style={{ display: isVisible ? 'block' : 'none' }}>
      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <div>
          <button type="button" id="btn-cancel" onClick={closeFormReg}>
            X
          </button>
        </div>
        <div className="logo-container">
          <YoutubeLogo className="youtube-logo" />
        </div>
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
            Password must be between 8-16 characters and combine a-Z letters and numbers. It's also possible to use
            the characters '!@#$%^&*'.
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
            confirmPasswordError || fieldErrors.confirmPassword ? 'error-input' : ''
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
            <img src={imagePreview} alt="Preview" className="preview-image" />
          )}
          <input
            type="file"
            name="profile_picture"
            onChange={handleChange}
            accept="image/*"
            className={fieldErrors.profile_picture ? 'error-input' : ''}
            required
          />
        </div>
        {fieldErrors.profile_picture && (
          <div className="error-message">
            <ErrorSign className="error-icon" />
            <span>{fieldErrors.profile_picture}</span>
          </div>
        )}
        <div className="button-container">
          <button type="submit" id="regibutton">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

const openFormReg = () => {
  document.getElementById('myFormReg').style.display = 'block';
};

const closeFormReg = () => {
  document.getElementById('myFormReg').style.display = 'none';
};

export { openFormReg };

export default Register;
