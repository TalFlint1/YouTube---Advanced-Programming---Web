import React from 'react';
import { Link } from 'react-router-dom';
import './VideoDisplay.css';

const VideoDisplay = ({ index, title, description, videoUrl, thumbnailUrl, duration, owner, isDarkMode, views, time_publish, time_type }) => {
  const videoDisplayStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#1e1e1e' : '#f0f0f0',
    color: isDarkMode ? '#fff' : '#000',
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
      <Link to={`/video/${index}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={videoContentStyle}>
          <div style={videoPlayerStyle}>
            <video controls style={videoPlayerStyle}>
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
          <div style={videoInfoStyle}>
            <div className="title">
              <span>{title}</span>
            </div>
            <span>
              <img
                id="img"
                draggable="false"
                className="style-scope yt-img-shadow"
                alt=""
                width="28"
                src="https://yt3.ggpht.com/mdK1Wn2nadJ4WvVbr_BmVtzFJZ4FtYDqfO1L5yCPNokDDn2wnJiHbtDz32CvRoz87OqsICnvVQ=s68-c-k-c0x00ffffff-no-rj"
              />
            </span>
          </div>
          <div style={videoInfoStyle}>
            <span>{owner}</span>
          </div>
          <div style={videoInfoStyle}>
            <span>Published {time_publish} {time_type} ago</span>
            <span>{views} views</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoDisplay;
