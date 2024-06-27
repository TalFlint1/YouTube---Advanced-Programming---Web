// App.js
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import AddVideoPopup from './components/AddVideoPopup/AddVideoPopup';
import './App.css';
import Register from './pages/registerPage/Register';
import Login from './pages/loginPage/Login';
import VideoPage from './components/VideoPage/VideoPage';
import VideoList from './components/VideoList';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State to manage search query
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPopupLoginOpen, setIsPopupLoginOpen] = useState(false);
  const [isPopupVideoOpen, setIsPopupVideoOpen] = useState(false);
  const [isMyVideosView, setIsMyVideosView] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false);
  const [isRegisterPopupVisible, setIsRegisterPopupVisible] = useState(false);

  const openLoginPopup = () => {
    setIsLoginPopupVisible(true);
  };

  const closeLoginPopup = () => {
    setIsLoginPopupVisible(false);
  };

  const openRegisterPopup = () => {
    setIsRegisterPopupVisible(true);
  };

  const closeRegisterPopup = () => {
    setIsRegisterPopupVisible(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query); // Update searchQuery state based on input change
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  const togglePopupAddVideo = () => {
    setIsPopupVideoOpen(!isPopupVideoOpen);
  };

  const closeAddVideoPopup = () => {
    setIsPopupVideoOpen(false);
  };

  const togglePopupLogin = () => {
    setIsPopupLoginOpen(!isPopupLoginOpen);
  };

  const toggleVideoSelection = (videoId) => {
    setSelectedVideos((prevSelectedVideos) =>
      prevSelectedVideos.includes(videoId)
        ? prevSelectedVideos.filter((id) => id !== videoId)
        : [...prevSelectedVideos, videoId]
    );
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        toggleMenu={toggleMenu}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        togglePopupAddVideo={togglePopupAddVideo}
        togglePopupLogin={togglePopupLogin}
      />
      {isMenuOpen && (
        <Menu
          isDarkMode={isDarkMode}
          toggleMenu={toggleMenu}
        />
      )}
      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <VideoList
                isDarkMode={isDarkMode}
                isMyVideosView={isMyVideosView}
                toggleVideoSelection={toggleVideoSelection}
                searchQuery={searchQuery} // Pass searchQuery as prop
              />
            } 
          />
          <Route path="/video/:id" element={<VideoPage />} />
        </Routes>
      </main>
      {isPopupVideoOpen && (
        <AddVideoPopup
          closePopup={closeAddVideoPopup}
          isDarkMode={isDarkMode}
        />
      )}
      <Register
        isDarkMode={isDarkMode}
        isVisible={isRegisterPopupVisible}
        closeRegisterPopup={closeRegisterPopup}
      />
      <Login
        isDarkMode={isDarkMode}
        isVisible={isLoginPopupVisible}
        closeLoginPopup={closeLoginPopup}
        openLoginPopup={openRegisterPopup}
      />
    </div>
  );
};

export default App;
