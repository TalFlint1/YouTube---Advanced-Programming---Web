import React from 'react';

const VideoDisplay = ({ title, description, videoUrl, thumbnailUrl, duration ,isDarkMode }) => {
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
