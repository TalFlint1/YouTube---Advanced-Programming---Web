// src/App.js

import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import VideoDisplay from './components/VideoDisplay/VideoDisplay';
import AddVideoPopup from './components/AddVideoPopup/AddVideoPopup';
import './App.css';
import videoData from './videoData.json';
import Register from './pages/registerPage/Register';
import Login from './pages/loginPage/Login'; // Import the Login component
import VideoPage from './components/VideoPage/VideoPage';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allVideos, setAllVideos] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPopupLoginOpen, setIsPopupLoginOpen] = useState(false); // State for login popup

  // Load initial data
  useEffect(() => {
    const storedUploads = JSON.parse(localStorage.getItem('uploads')) || [];
    const combinedVideos = [...videoData, ...storedUploads];
    setAllVideos(combinedVideos);
    setFilteredData(combinedVideos);
  }, []);

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Search input change handler
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    filterData(query, allVideos);
  };

  // Filter data based on search query
  const filterData = (query, videos) => {
    const filtered = videos.filter((video) =>
      video.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  // Toggle login popup function
  const togglePopupLogin = () => {
    setIsPopupLoginOpen(!isPopupLoginOpen);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        toggleMenu={toggleMenu}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        togglePopupLogin={togglePopupLogin} // Pass togglePopupLogin as a prop
      />
      {isMenuOpen && (
        <Menu
          toggleMenu={toggleMenu}
          // other props
        />
      )}
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="video-grid">
                {filteredData.map((video, index) => (
                  <VideoDisplay
                    key={index}
                    title={video.title}
                    // other props
                  />
                ))}
              </div>
            } 
          />
          <Route path="/video/:id" element={<VideoPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login closePopup={togglePopupLogin} />} />
        </Routes>
      </main>
      {isPopupLoginOpen && <Login closePopup={togglePopupLogin} />} {/* Render Login component as popup */}
      {/* Other components and modals */}
    </div>
  );
};

export default App;
