import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserDetail.css';

const UserDetail = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        setError('User is not authenticated');
        navigate('/login');
        return;
      }
      try {
        console.log('hello');
        let url = `/api/users/${username}`;
        const response = await fetch(url, {headers: {
          Authorization: `Bearer ${token}`
        }});
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        //shira version
        setUser(data)
        console.log('Fetched user:', data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
  
    fetchUser();
  }, [username, navigate]);

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        setError('User is not authenticated');
        navigate('/login');
        return;
      }
  
      const url = `/api/users/${username}`;
      const response = await fetch(url, {
        method: 'DELETE', // Specify the DELETE method
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
  
      if (response.status === 204) {
        console.log('User deleted successfully');
        navigate('/'); // Redirect to homepage or another appropriate route after deletion
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user');
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,16}$/;
    if (!passwordRegex.test(password)) {
      return 'Password must be between 8-16 characters and combine letters and numbers.';
    }
    return null;
  };

  const handleChangePassword = (e) => {
    const { value } = e.target;
    setPassword(value);
    const validationError = validatePassword(value);
    setPasswordError(validationError);
  };
  

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    if (password) {
      const passwordValidationError = validatePassword(password);
      if (passwordValidationError) {
        setPasswordError(passwordValidationError);
        return;
      }
    }

    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        setError('User is not authenticated');
        navigate('/login');
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      if (password) {
        formData.append('password', password);
      }
      if (profilePicture) {
        formData.append('profile_picture', profilePicture);
      }

      const url = `/api/users/${username}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const data = await response.json();
      setUser(data);
      console.log('User updated successfully', data);
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user');
    }
  };
  

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-detail">
      <h1>User Details</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <img src={`http://localhost:your_port${user.profile_picture}`} alt="Profile" />
      <p></p>
      <button id="delete-acc" onClick={handleDeleteUser}>Delete Account</button>

      <h2>Update Information</h2>
      <form onSubmit={handleUpdateUser}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleChangePassword}
          />
          {passwordError && <div className="error-message">{passwordError}</div>}
        </div>
        <div>
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UserDetail;
