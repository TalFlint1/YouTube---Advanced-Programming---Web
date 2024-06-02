import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Header.css'; // Add CSS specific to Header component
import Search from '../Search/Search';

const Header = ({ searchQuery, onSearchChange, toggleMenu }) => {
  return (
    <header className="App-header">
      <h1>Welcome to My Video App</h1>
      <Search searchQuery={searchQuery} onSearchChange={onSearchChange} />
      <div className="icon-container">
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="youtube-icon">
          <img src="/youtube_logo_icon.png" alt="YouTube" className="youtube-img" />
        </a>
        <FontAwesomeIcon icon={faBars} className="menu-icon" onClick={toggleMenu} />
      </div>
    </header>
  );
};

export default Header;
