import React, { useState, useEffect } from 'react';
import VideoDisplay from './VideoDisplay/VideoDisplay';

const VideoList = ({ isDarkMode, isMyVideosView, toggleVideoSelection, searchQuery }) => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        let url = '/api/videos';
        if (isMyVideosView) {
          const username = JSON.parse(localStorage.getItem('currentUser')).username;
          url = `/api/videos/user/:${username}/videos`; // Adjust URL to fetch user-specific videos
        
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        setVideos(data); // Update state with the fetched videos array
        localStorage.setItem('videos', JSON.stringify(data));
        console.log('Fetched videos:', data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [isMyVideosView]);

  useEffect(() => {
    const filtered = videos.filter(video => {
      const includesSearchQuery = video.title.toLowerCase().includes(searchQuery.toLowerCase());
      console.log(`Video title: "${video.title}" includes search query "${searchQuery}": ${includesSearchQuery}`);
      return includesSearchQuery;
    });
    setFilteredVideos(filtered);
    console.log('Filtered Videos:', filtered);
  }, [videos, searchQuery]);

  useEffect(() => {
    console.log('FilteredVideos state updated:', filteredVideos);
  }, [filteredVideos]);

  return (
    <div>
      <div className="video-grid">
        {
          filteredVideos.map(video => (
            <VideoDisplay
              key={video.id} // Ensure a unique key is provided
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
              toggleVideoSelection={() => toggleVideoSelection(video)}
              id={video.id}
            />
          ))
       }
      </div>
    </div>
  );
};

export default VideoList;
