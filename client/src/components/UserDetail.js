import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserDetail.css';

const UserDetail = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
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
  

  // const handleUpdateUser = () => {
  //   // Redirect or navigate to update user page
  //   navigate(`/update-user/${username}`);
  // };
  

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
      <p>hi</p>
      <button onClick={handleDeleteUser}>Delete</button>
    </div>
  );
};

export default UserDetail;
