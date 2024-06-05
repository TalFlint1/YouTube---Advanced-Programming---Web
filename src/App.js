import React, { useState } from 'react';
import Header from './Header/Header';
import Menu from './Menu/Menu';
import VideoDisplay from './VideoDisplay';
import './App.css';
import videoData from './videoData.json';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(videoData);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    filterData(query);
  };

  const filterData = (query) => {
    const filtered = videoData.filter((video) =>
      video.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        toggleMenu={toggleMenu}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode} // Pass isDarkMode as a prop
      />
      {isMenuOpen && <Menu toggleMenu={toggleMenu} />}
      <main>
        {filteredData.map((video, index) => (
          <VideoDisplay
            className="flex-item"
            key={index}
            title={video.title}
            description={video.description}
            videoUrl={video.videoUrl}
            isDarkMode={isDarkMode} // Pass isDarkMode as a prop
          />
        ))}
      </main>
    </div>
  );
};

export default App;
