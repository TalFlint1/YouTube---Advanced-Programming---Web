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
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPopupLoginOpen, setIsPopupLoginOpen] = useState(false);
  const [isPopupVideoOpen, setIsPopupVideoOpen] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false);
  const [isRegisterPopupVisible, setIsRegisterPopupVisible] = useState(false);
  const [isMyVideosView, setIsMyVideosView] = useState(false);

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
    setSearchQuery(query);
    console.log('Search Query Updated:', query);
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

  const toggleVideoSelection = (video) => {
    setSelectedVideos((prevSelectedVideos) =>
      prevSelectedVideos.includes(video.id)
        ? prevSelectedVideos.filter((id) => id !== video.id)
        : [...prevSelectedVideos, video.id]
    );
    console.log('Selected Videos:', selectedVideos);
  };

  const deleteSelectedVideos = async () => {
    try {
      let url = '/api/videos';
      let user = "shira"
      let id = 11
      if (isMyVideosView) {
        url = `http://localhost:3000/api/videos/user/${user}/videos/${id}`;
      }
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedVideos),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      // Handle deletion response
    } catch (error) {
      console.error('Error fetching videos:', error);
    }

    setSelectedVideos([]);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        toggleMenu={toggleMenu}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        openLoginPopup={openLoginPopup}
        openRegisterPopup={openRegisterPopup}
        togglePopupAddVideo={togglePopupAddVideo}
        togglePopupLogin={togglePopupLogin}
      />
      {isMenuOpen && (
        <Menu
          isDarkMode={isDarkMode}
          toggleMenu={toggleMenu}
          setIsMyVideosView={setIsMyVideosView}
          isMyVideosView={isMyVideosView}
          deleteSelectedVideos={deleteSelectedVideos} // Pass deleteSelectedVideos function to Menu
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
                searchQuery={searchQuery}
                selectedVideos={selectedVideos} // Pass selectedVideos state to VideoList
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
