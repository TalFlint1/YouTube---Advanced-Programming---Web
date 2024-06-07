import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faMoon, faCircleUser  , faVideo} from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import Search from '../Search/Search';

const Header = ({ searchQuery, onSearchChange, toggleMenu, toggleDarkMode, isDarkMode, togglePopup }) => {
  return (
    <header className={`App-header ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="left-buttons">
        <div title="log in">
          <button className={`icon-button ${isDarkMode ? 'dark-mode' : ''}`}>
            <FontAwesomeIcon icon={faCircleUser} />
          </button>
        </div>
        <div title="add video">
          <button className={`icon-button ${isDarkMode ? 'dark-mode' : ''}`} onClick={togglePopup}>
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
      <div className="icon-container" title="דף הבית של YOUTUBE">
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="youtube-icon">
          <img src="/youtube_logo_icon.png" alt="YouTube" className="youtube-img" />
        </a>
        <FontAwesomeIcon icon={faBars} className={`menu-icon ${isDarkMode ? 'dark-mode' : ''}`} onClick={toggleMenu} />
      </div>
    </header>
  );
};

export default Header;
