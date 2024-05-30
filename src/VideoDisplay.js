

import React from 'react';

const VideoDisplay = ({ title, description, videoUrl, thumbnailUrl, duration }) => {
  return (
    <div className="video-display">
      <div className="video-thumbnail">
        <img src={thumbnailUrl} alt={title} />
        <span className="video-duration">{duration}</span>
      </div>
      <video controls>
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className="video-info">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default VideoDisplay;
