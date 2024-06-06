import React, { useState } from 'react';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import VideoDisplay from './components/VideoDisplay/VideoDisplay';
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
        isDarkMode={isDarkMode}
      />
      {isMenuOpen && <Menu toggleMenu={toggleMenu} />}
      <main>
        {filteredData.map((video, index) => (
          <VideoDisplay
            key={index}
            index={index}
            title={video.title}
            description={video.description}
            videoUrl={video.videoUrl}
            thumbnailUrl={video.thumbnailUrl}
            duration={video.duration}
            owner={video.owner}
            isDarkMode={isDarkMode}
            views={video.views}
            time_publish={video.time_publish}
            time_type={video.time_type}
            likes={video.likes}
            comments={video.comments}
          />
        ))}
      </main>
    </div>
  );
};

export default App;
