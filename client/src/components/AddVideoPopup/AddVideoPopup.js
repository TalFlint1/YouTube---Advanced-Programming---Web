import React, { useState } from 'react';
import './AddVideoPopup.css'; // Create this CSS file for styling the popup
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddVideoPopup = ({ closePopup, addVideo, isDarkMode }) => {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const time_type = 'hours';
  const time_publish = '0';
  const views = '0';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (videoFile) {
      console.log('Uploaded video file:', videoFile);
    }
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const owner = currentUser ? currentUser.name : null;
    const user_icon =currentUser ? currentUser.picture : null;

    // Check if username is available
        // Call the addVideo function with the required parameters
        addVideo({ title, videoUrl, videoFile, views, time_type, time_publish, owner, user_icon });
      
     
        // Close the popup   addVideo({ title, videoUrl, videoFile, views, time_type, time_publish, username, user_icon });
    closePopup();
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const modeClass = isDarkMode ? 'dark-mode' : 'light-mode';

  return (
    <div className={`popup-overlay ${modeClass}`}>
      <div className="popup-content">
        <button className="close-button" onClick={closePopup}>×</button>
        <h2>Add a New Video</h2>
        <form onSubmit={handleSubmit} className="add-video-form">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          
          <label>Video URL:</label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
          />
          
          <label>
            <FontAwesomeIcon icon={faUpload} /> Or Upload Video:
            <input type="file" accept="video/*" onChange={handleFileChange} />
          </label>
          
          <button type="submit">Add Video</button>
          <button type="button" onClick={closePopup}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddVideoPopup;
