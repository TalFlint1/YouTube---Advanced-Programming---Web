import React from 'react';
import VideoDisplay from './VideoDisplay'; // Import the VideoDisplay component

    const VideoGrid = ({ videos }) => {
        return (
          <div className="video-grid">
            {videos.map((video, index) => (
              <VideoDisplay
                key={index}
                title={video.title}
                description={video.description}
                videoUrl={video.videoUrl}
                thumbnailUrl={video.thumbnailUrl}
                duration={video.duration}
              />
            ))}
          </div>
        );
      };

export default VideoGrid;
