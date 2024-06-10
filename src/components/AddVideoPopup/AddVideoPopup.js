// src/components/AddVideoPopup/AddVideoPopup.js
import React, { useState } from 'react';
import './AddVideoPopup.css'; // Create this CSS file for styling the popup
import { faUpload} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddVideoPopup = ({ closePopup, addVideo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const time_type = 'hours';
  const time_publish = '0';
  const views = '0';
   //TODO change this data to the user that connected data
  const owner = ' חמי';
  const user_icon = "https://yt3.ggpht.com/mdK1Wn2nadJ4WvVbr_BmVtzFJZ4FtYDqfO1L5yCPNokDDn2wnJiHbtDz32CvRoz87OqsICnvVQ=s68-c-k-c0x00ffffff-no-rj";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (videoFile) {
      console.log('Uploaded video file:', videoFile);
    }
    const newVideo = { title, description, videoUrl, videoFile, views, time_type, time_publish, owner, user_icon };
    addVideo(newVideo);
    saveVideoToLocalStorage(newVideo);
    closePopup();
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const saveVideoToLocalStorage = (video) => {
    const storedVideos = JSON.parse(localStorage.getItem('uploads')) || [];
    const newVideoId = storedVideos.length ? Math.max(storedVideos.map(v => v.id)) + 1 : 1;
    video.id = newVideoId;
    storedVideos.push(video);
    localStorage.setItem('videos', JSON.stringify(storedVideos));
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={closePopup}>×</button>
        <h2>Add a New Video</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Description:
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </label>
          <label>
            Video URL:
            <input type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} required />
          </label>
          <label>
            <FontAwesomeIcon icon={faUpload} /> 
              Or Upload Video:
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

