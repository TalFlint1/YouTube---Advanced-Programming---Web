import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Menu.css'; // Add CSS specific to Menu component

const Menu = ({ toggleMenu, showMyVideos, isMyVideosView, deleteSelectedVideos }) => {
  return (
    <div className="side-menu">
      <div className="icon-container">
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="youtube-icon">
          <img src="/youtube_logo_icon.png" alt="YouTube" className="youtube-img" />
        </a>
        <FontAwesomeIcon icon={faBars} className="menu-icon" onClick={toggleMenu} />
      </div>
      <ul>
        <li><a href="#" onClick={showMyVideos}>Home</a></li>
        <li><a href="#" onClick={showMyVideos}>My Videos</a></li>
        {isMyVideosView && (
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
