import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import AddVideoPopup from './components/AddVideoPopup/AddVideoPopup';
import './App.css';
import Register from './pages/registerPage/Register';
import Login from './pages/loginPage/Login';
import VideoPage from './components/VideoPage/VideoPage';
import VideoList from './components/VideoList';
import axios from 'axios';
import UserDetail from './components/UserDetail';

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

  const navigate = useNavigate();

  const [isSignedIn, setSignedInStatus] = useState(() => {
    const savedStatus = localStorage.getItem('isSignedIn');
    return savedStatus ? JSON.parse(savedStatus) : false;
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('jwtToken');
    return !!token;
  });

  // useEffect(() => {
  //   // Example: Clearing localStorage on startup
  //   localStorage.removeItem('jwtToken');
  //   localStorage.removeItem('currentUser');
  //   localStorage.removeItem('isSignedIn');
  //   setSignedInStatus(false); // Update state to reflect logout
  // }, []);
  
  useEffect(() => {
    localStorage.setItem('isSignedIn', isSignedIn);
  }, [isSignedIn]);
  
  // useEffect(() => {
  //   if (isSignedIn) {
  //     const fetchUser = async () => {
  //       try {
  //         const username = localStorage.getItem('currentUser');
  //         const response = await axios.get(`/api/users/${username}`);
  //         setCurrentUser(response.data);
  //       } catch (error) {
  //         console.error('Error fetching user:', error);
  //       }
  //     };
  //     fetchUser();
  //   }
  // }, [isSignedIn]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const username = localStorage.getItem('currentUser');
        const token = localStorage.getItem('jwtToken'); // Ensure token is retrieved
        if (!token) {
          console.error('No JWT token found');
          return;
        }
        const response = await axios.get(`/api/users/${username}`, {
          headers: {
            Authorization: `Bearer ${token}` // Send JWT token in headers
          }
        });
        setCurrentUser(response.data); // Assuming response.data contains user info
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
  
    if (isSignedIn) {
      fetchUser();
    }
  }, [isSignedIn]);
  
  const toggleLogin = (status) => {
    setSignedInStatus(status);
    setIsLoggedIn(status);
  };

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

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    navigate('/');
  };
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('currentUser'); // Get the username as a plain string
  });
  

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
        toggleLogin={toggleLogin}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />
      {isMenuOpen && (
        <Menu
          isDarkMode={isDarkMode}
          toggleMenu={toggleMenu}
          isMyVideosView={isMyVideosView}
          setIsMyVideosView={setIsMyVideosView}
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
              />
            } 
          />
          <Route path="/video/:id" element={<VideoPage />} />
          <Route path="/api/users/:username" element={<UserDetail />} />
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
        toggleLogin={toggleLogin}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
};

export default App;
