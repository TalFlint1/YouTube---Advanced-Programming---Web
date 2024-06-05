import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faMoon } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // Add CSS specific to Header component
import Search from '../Search/Search';

const Header = ({ searchQuery, onSearchChange, toggleMenu, toggleDarkMode, isDarkMode }) => {
  return (
    <header className={`App-header ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="left-buttons">
        <button className={`icon-button ${isDarkMode ? 'dark-mode' : ''}`} onClick={toggleDarkMode}>
          <FontAwesomeIcon icon={faMoon} />
        </button>
        <button className={`icon-button ${isDarkMode ? 'dark-mode' : ''}`}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <Search searchQuery={searchQuery} onSearchChange={onSearchChange} />
      <div className="icon-container">
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="youtube-icon">
          <img src="/youtube_logo_icon.png" alt="YouTube" className="youtube-img" />
        </a>
        <FontAwesomeIcon icon={faBars} className={`menu-icon ${isDarkMode ? 'dark-mode' : ''}`} onClick={toggleMenu} />
      </div>
    </header>
  );
};

export default Header;
