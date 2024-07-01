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
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    profile_picture: null
  });

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    closeModal();
    handleDeleteUser();
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'profile_picture') {
      const file = files[0];
      setProfilePicture(file);
      previewImage(file);
    }

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };
  

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-detail">
      <h1>Profile</h1>
      <div className="profile-section">
      <label>Username:</label>
      <span>{user.username}</span>
    </div>
    <div className="profile-section">
      <label>Name:</label>
      <span>{user.name}</span>
    </div>
      <label>Profile Picture:</label>
      {/* <img src={user.profile_picture} alt="Profile Picture" className="preview-image"/> */}
      {/* <img src={`../../..${user.profile_picture}`} alt="Profile" className="preview-image" /> */}
      <img src={user.profile_picture} alt="Profile" className="preview-image" />
      
      {/* {user.profile_picture} */}
      <p></p>
      <h3>Update Information</h3>
      <form onSubmit={handleUpdateUser}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="preview-image" />
          )}
          <input
            type="file"
            id="profilePicture"
            name="profile_picture"
            // onChange={(e) => setProfilePicture(e.target.files[0])}
            onChange={handleChange}
          />
        </div>
        <div className="button-container">
        <button type="submit">Update</button>
        </div>
      </form>

      <div className="button-container">
      <button id="delete-acc" onClick={openModal}>Delete Account</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete your account?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default UserDetail;
