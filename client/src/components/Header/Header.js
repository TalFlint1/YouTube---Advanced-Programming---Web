import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faMoon, faCircleUser, faSignOut } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import Search from '../Search/Search';
import { useNavigate } from 'react-router-dom';
import { isUserLoggedIn, logout, API_BASE_URL } from '../../authCheck'; // Assuming you have an authCheck file for auth utilities
import { openFormLogin } from '../../pages/loginPage/Login';
import axios from 'axios';

const Header = ({
  searchQuery,
  onSearchChange,
  toggleMenu,
  toggleDarkMode,
  isDarkMode,
  togglePopupAddVideo,
  togglePopupLogin,
  toggleLogin,
  isLoggedIn
}) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (isLoggedIn) {
  //       try {
  //         const token = localStorage.getItem('jwtToken');
  //         const response = await axios.get('/api/users/profile', {
  //           headers: { Authorization: `Bearer ${token}` },
  //         });
  //         setUserData(response.data);
  //       } catch (error) {
  //         console.error('Error fetching user data:', error);
  //         toggleLogin(false);
  //       }
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  const handleAddVideoClick = () => {
    if (!isLoggedIn) {
      console.log('User is not logged in.');
    } else {
      console.log('User is logged in, opening add video popup.');
      togglePopupAddVideo();
    }
  };
  

  const handleLoginClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      togglePopupLogin();
    }
  };

  const handleLogout = () => {
    logout();
    setUserData(null);
    setShowDropdown(false);
    toggleLogin(false);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('currentUser');
    localStorage.setItem('isSignedIn', false);
    toggleLogin(false);
    navigate('/');
  }

  return (
    <header className={`App-header ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="left-buttons">
        <div className="user-profile-container" title="User Profile">
          {isLoggedIn ? (
            
            <div title="log off">
            <button className={`icon-button ${isDarkMode ? 'dark-mode' : ''}`} onClick={logout}>
                  <FontAwesomeIcon icon={faSignOut} />
                </button>
            </div>
            
          ) : (
            <div className="profile-picture-container" onClick={toggleDropdown}>
              <button className={`icon-button ${isDarkMode ? 'dark-mode' : ''}`} onClick={openFormLogin}>
              <FontAwesomeIcon icon={faCircleUser} />
            </button>
            </div>
          )}
        </div>
        <div title="add video">
          <button className={`icon-button ${isDarkMode ? 'dark-mode' : ''}`} onClick={handleAddVideoClick}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div title="dark mode">
          <button className={`icon-button ${isDarkMode ? 'dark-mode' : ''}`} onClick={toggleDarkMode}>
            <FontAwesomeIcon icon={faMoon} />
          </button>
        </div>
        {/* <div title="log off">
        <button className={`icon-button ${isDarkMode ? 'dark-mode' : ''}`} onClick={logout}>
              <FontAwesomeIcon icon={faCircleUser} />
            </button>
        </div> */}
      </div>
      <Search searchQuery={searchQuery} onSearchChange={onSearchChange} />
      <div className="icon-container" title="YouTube Home Page">
        <a href="/" target="_blank" rel="noopener noreferrer" className="youtube-icon">
          <img src="/youtube_logo_icon.png" alt="YouTube" className="youtube-img" />
        </a>
        <FontAwesomeIcon icon={faBars} className={`menu-icon ${isDarkMode ? 'dark-mode' : ''}`} onClick={toggleMenu} />
      </div>
    </header>
  );
};

export default Header;
