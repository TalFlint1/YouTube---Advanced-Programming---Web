// src/components/VideoDisplay/VideoDisplay.js
import React from 'react';
import { Link } from 'react-router-dom';

const VideoDisplay = ({ title, description, videoUrl, thumbnailUrl, duration,owner ,isDarkMode ,views,time_publish ,time_type,
  isMyVideosView,
  toggleVideoSelection, user_icon,
  id }) => {
  const videoDisplayStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#black' : '#black',
    color: isDarkMode ? '#black' : '#black',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
  };

  const videoContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '600px',
    width: '100%',
  };

  const videoPlayerStyle = {
    maxWidth: '100%',
  };

  const videoInfoStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    fontSize: '14px',
  };

  return (
    <div style={videoDisplayStyle}>
      {isMyVideosView && (
        <input
          type="checkbox"
          onChange={() => toggleVideoSelection(videoUrl)}
          className="video-checkbox"
        />
      )}
      <Link to={`/video/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={videoContentStyle}>
          <div style={videoPlayerStyle}>
            <video controls style={videoPlayerStyle}>
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
          <div style={videoInfoStyle}>
            <div  class="title">
              <span>{title}</span>
            </div>
            <span> <img id="img" draggable="false" class="style-scope yt-img-shadow" alt="" width="28" src={user_icon}
              ></img>
            </span>
          </div>
          <div style={videoInfoStyle}>
            <span> </span>
            <span>{owner}</span>
          </div>
          <div style={videoInfoStyle}>
          <span>Published {time_publish} {time_type} ago</span>
            <span>
              {views} views</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoDisplay;
