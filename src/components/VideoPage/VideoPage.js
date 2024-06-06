import React from 'react';
import { useParams } from 'react-router-dom';
import videoData from '../../videoData.json';

const VideoPage = () => {
  const { id } = useParams();
  const video = videoData[id];

  return (
    <div className="video-page">
      <h1>{video.title}</h1>
      <video controls>
        <source src={video.videoUrl} type="video/mp4" />
      </video>
      <p>{video.description}</p>
      {/* Add additional features like comments, related videos, etc. */}
    </div>
  );
};

export default VideoPage;
