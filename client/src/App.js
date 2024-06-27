import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import VideoDisplay from './components/VideoDisplay/VideoDisplay';
import AddVideoPopup from './components/AddVideoPopup/AddVideoPopup';
import './App.css';
import Register from './pages/registerPage/Register';
import Login from './pages/loginPage/Login';
import VideoPage from './components/VideoPage/VideoPage';
import VideoList from './components/VideoList';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allVideos, setAllVideos] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPopupLoginOpen, setIsPopupLoginOpen] = useState(false);
  const [isPopupVideoOpen, setIsPopupVideoOpen] = useState(false);
  const [userVideos, setUserVideos] = useState([]);
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

  useEffect(() => {
    // Fetch videos from the server instead of using static videoData.json
    fetch('/api/videos')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched videos:', data); // Log fetched data
        setAllVideos(data);
        setFilteredData(data);
        console.log('All videos:', allVideos); // Log updated allVideos state
        console.log('Filtered videos:', filteredData); // Log updated filteredData state
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });
  }, []);

  const toggleMenu = () => {
    if (isMenuOpen && isMyVideosView) {
      showMyVideos();
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    filterData(query, isMyVideosView ? userVideos : allVideos);
  };

  const filterData = (query, videos) => {
    const filtered = videos.filter((video) =>
      video.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  const togglePopupAddVideo = () => {
    setIsPopupVideoOpen(!isPopupVideoOpen);
  };

  const togglePopupLogin = () => {
    setIsPopupLoginOpen(!isPopupLoginOpen);
  };

  const addVideo = (newVideo) => {
    const storedUploads = JSON.parse(localStorage.getItem('uploads')) || [];
    const maxId = Math.max(...allVideos.map(video => video.id), 0);
    const newId = maxId + 1;
    const videoWithId = { ...newVideo, id: newId };

    const updatedVideos = [...allVideos, videoWithId];
    const updatedUploads = [...storedUploads, videoWithId];

    localStorage.setItem('uploads', JSON.stringify(updatedUploads));
    setAllVideos(updatedVideos);
    setUserVideos([...userVideos, videoWithId]);
    filterData(searchQuery, updatedVideos);
  };

  const showMyVideos = () => {
    if (isMyVideosView) {
      setIsMyVideosView(false);
      const storedUploads = JSON.parse(localStorage.getItem('uploads')) || [];
      setFilteredData(storedUploads);

      filterData(searchQuery, allVideos);
    } else {
      setIsMyVideosView(true);
      filterData(searchQuery, userVideos);
    }
  };

  const toggleVideoSelection = (videoId) => {
    setSelectedVideos((prevSelectedVideos) =>
      prevSelectedVideos.includes(videoId)
        ? prevSelectedVideos.filter((id) => id !== videoId)
        : [...prevSelectedVideos, videoId]
    );
  };

  const deleteSelectedVideos = () => {
    const updatedUserVideos = userVideos.filter(
      (video) => !selectedVideos.includes(video.id)
    );
    const updatedAllVideos = allVideos.filter(
      (video) => !selectedVideos.includes(video.id)
    );
    const updatedUploads = updatedAllVideos; // No need for the videoData length check

    localStorage.setItem('uploads', JSON.stringify(updatedUploads));
    setUserVideos(updatedUserVideos);
    setAllVideos(updatedAllVideos);
    setSelectedVideos([]);
    filterData(searchQuery, isMyVideosView ? updatedUserVideos : updatedAllVideos);
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
        togglePopupAddVideo={togglePopupAddVideo} // Pass togglePopup as a prop
        togglePopupLogin={togglePopupLogin} // Pass togglePopup as a prop
      />
      {isMenuOpen && (
        <Menu
          isDarkMode={isDarkMode}
          toggleMenu={toggleMenu}
          showMyVideos={showMyVideos}
          isMyVideosView={isMyVideosView}
          deleteSelectedVideos={deleteSelectedVideos}
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
                    className="flex-item"
                    key={index}
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
                    isMyVideosView={isMyVideosView}
                    toggleVideoSelection={() => toggleVideoSelection(video.id)}
                    user_icon={video.user_icon}
                    id={video.id} // Pass the video id
                  />
                ))}
              </div>
            } 
          />
          <Route path="/video/:id" element={<VideoPage />} />
        </Routes>
      </main>
      {isPopupVideoOpen && <AddVideoPopup isDarkMode={isDarkMode} closePopup={togglePopupAddVideo} addVideo={addVideo} />}
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
