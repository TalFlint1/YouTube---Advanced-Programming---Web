import React, { useState, useEffect } from 'react';
import VideoDisplay from './VideoDisplay/VideoDisplay';

const VideoList = ({ isDarkMode, isMyVideosView, toggleVideoSelection }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos'); // Adjust URL as per your server setup
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        setVideos(data); // Update state with the fetched videos array
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h2>Video List</h2>
      <div className="video-grid">
        {videos.map(video => (
          <VideoDisplay
            key={video.id}
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
            user_icon={video.user_icon}
            isMyVideosView={isMyVideosView}
            toggleVideoSelection={() => toggleVideoSelection(video.id)}
            id={video.id}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoList;