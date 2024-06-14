import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Menu.css'; // Add CSS specific to Menu component
import { useLocation } from 'react-router-dom';

const Menu = ({ toggleMenu, showMyVideos, isMyVideosView, deleteSelectedVideos, isDarkMode }) => {
  const modeClass = isDarkMode ? 'dark-mode' : 'light-mode';
  const location = useLocation();
  const isBaseUrl = location.pathname === '/';

  return (
    <div className={`side-menu ${modeClass}`}>
      <div className="icon-container">
        <a href="/" target="_blank" rel="noopener noreferrer" className="youtube-icon">
          <img src="/youtube_logo_icon.png" alt="YouTube" className="youtube-img" />
        </a>
        <FontAwesomeIcon icon={faBars} className="menu-icon" onClick={toggleMenu} />
      </div>
      <ul>
        <li><a href="/" >Home</a></li>
        {isBaseUrl && (    <li><a onClick={showMyVideos}>My Videos</a></li>)}
        {(isMyVideosView && isBaseUrl) && (
          <li>
            <button onClick={deleteSelectedVideos} className="delete-button">
              <FontAwesomeIcon icon={faTrash} /> Delete Selected
            </button>
          </li>
        )}
        {/* Add more menu items as needed */}
      </ul>
    </div>
  );
};

export default Menu;
