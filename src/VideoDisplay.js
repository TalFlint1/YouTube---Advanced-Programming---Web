import React from 'react';

const VideoDisplay = ({ title, description, videoUrl, thumbnailUrl, duration,owner ,isDarkMode ,views,time_publish ,time_type}) => {
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

  const videoThumbnailStyle = {
    position: 'relative',
    marginBottom: '20px',
  };

  const thumbnailImageStyle = {
    maxWidth: '100%',
    borderRadius: '10px',
  };

  const videoDurationStyle = {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    padding: '5px',
    borderRadius: '5px',
  };

  const videoDetailsStyle = {
    textAlign: 'center',
    marginBottom: '20px',
  };

  const videoTitleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const videoDescriptionStyle = {
    fontSize: '16px',
    lineHeight: '1.5',
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
      <div style={videoContentStyle}>
    
        <div style={videoPlayerStyle}>
          <video controls style={videoPlayerStyle}>
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
        <div style={videoInfoStyle}>
          <div  class="title">
          <span > {title}</span>
          </div>
        <span> <img id="img" draggable="false" class="style-scope yt-img-shadow" alt="" width="28" src="https://yt3.ggpht.com/mdK1Wn2nadJ4WvVbr_BmVtzFJZ4FtYDqfO1L5yCPNokDDn2wnJiHbtDz32CvRoz87OqsICnvVQ=s68-c-k-c0x00ffffff-no-rj"
        ></img></span>
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
    </div>
  );
};

export default VideoDisplay;
