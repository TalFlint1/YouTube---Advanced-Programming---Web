import React, { useState } from 'react';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import VideoDisplay from './components/VideoDisplay/VideoDisplay';
import AddVideoPopup from './components/AddVideoPopup/AddVideoPopup'; // Import the popup component
import './App.css';
import videoData from './videoData.json';
import Register from './pages/registerPage/Register';
import Login from './pages/loginPage/Login'; // Import the Login component

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allVideos, setAllVideos] = useState(videoData);
  const [filteredData, setFilteredData] = useState(videoData);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userVideos, setUserVideos] = useState([]);
  const [isMyVideosView, setIsMyVideosView] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState([]);

  const toggleMenu = () => {
    if (isMenuOpen && isMyVideosView) 
      {
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

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const addVideo = (newVideo) => {
    const maxId = Math.max(...allVideos.map(video => video.id));
    const newId = maxId + 1;
    const videoWithId = { ...newVideo, id: newId };

    const updatedVideos = [...allVideos, videoWithId];
    setAllVideos(updatedVideos);
    setUserVideos([...userVideos, videoWithId]);
    filterData(searchQuery, updatedVideos);
  };

  const showMyVideos = () => {
    if (isMyVideosView) {
      setIsMyVideosView(false);
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
        togglePopup={togglePopup} // Pass togglePopup as a prop
      />
      {isMenuOpen && (
        <Menu
          toggleMenu={toggleMenu}
          showMyVideos={showMyVideos}
          isMyVideosView={isMyVideosView}
          deleteSelectedVideos={deleteSelectedVideos}
        />
      )}
      <main>
        {filteredData.map((video, index) => (
          <VideoDisplay
            className="flex-item"
            key={index}
            title={video.title}
            description={video.description}
            videoUrl={video.videoUrl}
            isDarkMode={isDarkMode}
            owner={video.owner}
            views={video.views}
            time_publish={video.time_publish}
            time_type={video.time_type}
            isMyVideosView={isMyVideosView}
            toggleVideoSelection={() => toggleVideoSelection(video.id)
             }
             user_icon={video.user_icon}
          />
        ))}
      </main>
      {isPopupOpen && <AddVideoPopup closePopup={togglePopup} addVideo={addVideo} />}
      <Register />
      <Login />
    </div>
  );
};

export default App;
