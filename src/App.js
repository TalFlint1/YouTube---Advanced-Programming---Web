


import React, { useState } from 'react';
import VideoDisplay from './VideoDisplay';
import './App.css';
import videoData from './videoData.json'; // Importing array of video data from JSON file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faSearch  } from '@fortawesome/free-solid-svg-icons'; // Importing the menu icon

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(videoData);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterData(query);
  };

  const filterData = (query) => {
    const filtered = videoData.filter((video) =>
      video.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };


  return (
    <div className="App">
     <header className="App-header">
        <h1>Welcome to My Video App</h1>
        <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
    </div>
    <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <div className="icon-container">
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="youtube-icon">
            <img src="/youtube_logo_icon.png" alt="YouTube" className="youtube-img" />
          </a>
          <FontAwesomeIcon icon={faBars} className="menu-icon" onClick={toggleMenu} />   
        </div>

      </header>
      {isMenuOpen && (
        <div className="side-menu">
          <div className="icon-container">
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="youtube-icon">
            <img src="/youtube_logo_icon.png" alt="YouTube" className="youtube-img" />
          </a>
          <FontAwesomeIcon icon={faBars} className="menu-icon" onClick={toggleMenu} />
        </div>          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/shorts">Shorts</a></li>
            <li><a href="/subscriptions">Subscriptions</a></li>
            {/* Add more menu items as needed */}
          </ul>
        </div>
      )}
      <main>
        {videoData.map((video, index) => (
          <VideoDisplay
            className="flex-item"
            key={index}
            title={video.title}
            description={video.description}
            videoUrl={video.videoUrl}
          />
        ))}
      </main>
    </div>
  );
};

export default App;

