// Header.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faMoon, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import Search from '../Search/Search';
import { useNavigate } from 'react-router-dom'; // Updated import
import { isUserLoggedIn } from '../../authCheck'; // Import the auth utility

const Header = ({
  searchQuery,
  onSearchChange,
  toggleMenu,
  toggleDarkMode,
  isDarkMode,
  togglePopupAddVideo,
  togglePopupLogin,
}) => {
  const navigate = useNavigate();

  const handleAddVideoClick = () => {
    if (!isUserLoggedIn()) {
    } else {
    togglePopupAddVideo();
  
    }
  };

  const handleLoginClick = () => {
    if (!isUserLoggedIn()) {
      navigate('/login');
    } else {
      togglePopupLogin();
    }
  };

  return (
    <header className={`App-header ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="left-buttons">
        <div title="log in">
          <button className={`icon-button ${isDarkMode ? 'dark-mode' : ''}`} onClick={handleLoginClick}>
            <FontAwesomeIcon icon={faCircleUser} />
          </button>
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
