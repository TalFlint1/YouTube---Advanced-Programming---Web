import React, { useState, useEffect } from 'react';
import VideoDisplay from './VideoDisplay/VideoDisplay';

const VideoList = ({ isDarkMode, isMyVideosView, toggleVideoSelection, searchQuery }) => {
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

  // Filter videos based on searchQuery
  const filteredVideos = videos.filter(video => {
    return (
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
  });

  return (
    <div>
      <div className="video-grid">
        {filteredVideos.map(video => (
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
