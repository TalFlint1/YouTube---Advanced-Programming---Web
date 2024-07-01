// authCheck.js

import axios from 'axios';

export const API_BASE_URL = 'http://localhost:3001/api'; // Replace with your server URL

// Function to login user
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tokens`, { username, password });
    localStorage.setItem('token', response.data.token); // Store JWT token in localStorage
    return true; // Login successful
  } catch (error) {
    console.error('Login failed:', error);
    return false; // Login failed
  }
};

// Function to register user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    localStorage.setItem('token', response.data.token); // Store JWT token in localStorage
    return true; // Registration successful
  } catch (error) {
    console.error('Registration failed:', error);
    return false; // Registration failed
  }
};

// Function to check if user is logged in
export const isUserLoggedIn = () => {
  const token = localStorage.getItem('jwtToken');
  return !!token; // Return true if token exists, false otherwise
};


// Function to logout user
export const logout = () => {
  localStorage.removeItem('jwtToken');
};