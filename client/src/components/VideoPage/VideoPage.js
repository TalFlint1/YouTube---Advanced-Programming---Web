import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import videoData from '../../videoData.json';
import './VideoPage.css';
import VideoDisplay from '../VideoDisplay/VideoDisplay';
import { isUserLoggedIn } from '../../authCheck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(null); // null for no action, true for like, false for dislike
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedVideos = JSON.parse(localStorage.getItem('videos')) || [];
    const storedUploads = JSON.parse(localStorage.getItem('uploads')) || [];

    // Combine the two arrays into one list
    const combinedList = [...storedVideos, ...storedUploads];
    const storedVideo = combinedList.find((v) => v.id === parseInt(id));
    let initialVideo;

    if (storedVideo) {
      initialVideo = storedVideo;
    } else {
      initialVideo = videoData.find((v) => v.id === parseInt(id));
      if (initialVideo) {
        storedVideos.push(initialVideo);
        localStorage.setItem('videos', JSON.stringify(storedVideos));
      }
    }

    if (initialVideo) {
      setVideo(initialVideo);
      setLikes(initialVideo.likes);
      setComments(initialVideo.comments || []);
      setLiked(initialVideo.liked); // Set liked state based on stored data
    }

    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (video) {
      const updatedVideo = { ...video, likes, comments, liked };
      const storedVideos = JSON.parse(localStorage.getItem('videos')) || [];
      const storedUploads = JSON.parse(localStorage.getItem('uploads')) || [];

      // Combine the two arrays into one list
      const combinedList = [...storedVideos, ...storedUploads];
      const updatedVideos = combinedList.map(v => (v.id === parseInt(id) ? updatedVideo : v));
      localStorage.setItem('videos', JSON.stringify(updatedVideos));

      // Update the video object in the backend
      updateVideoBackend(updatedVideo);
    }
  }, [likes, comments, liked, video, id]);

  const updateVideoBackend = async (updatedVideo) => {
    const url = `/api/videos/user/${updatedVideo.owner}/videos/${updatedVideo.id}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVideo),
      });
      if (!response.ok) {
        throw new Error('Failed to update video');
      }
    } catch (error) {
      console.error('Error updating video:', error);
    }
  };

  const handleLike = () => {
    // if (!isUserLoggedIn()) {
    //   alert('Sign in to make your opinion count.');
    //   navigate('/login');
    //   return;
    // }

    const updatedLikes = liked === true ? likes - 1 : likes + 1;
    const updatedLiked = liked === true ? null : true;

    setLikes(updatedLikes);
    setLiked(updatedLiked);

    if (video) {
      const updatedVideo = { ...video, likes: updatedLikes, liked: updatedLiked };
      setVideo(updatedVideo);
      updateVideoBackend(updatedVideo);
    }
  };

  const handleDislike = () => {
    // if (!isUserLoggedIn()) {
    //   alert('Sign in to make your opinion count.');
    //   navigate('/login');
    //   return;
    // }

    const updatedLikes = liked === false ? likes + 1 : likes - 1;
    const updatedLiked = liked === false ? null : false;

    setLikes(updatedLikes);
    setLiked(updatedLiked);

    if (video) {
      const updatedVideo = { ...video, likes: updatedLikes, liked: updatedLiked };
      setVideo(updatedVideo);
      updateVideoBackend(updatedVideo);
    }
  };

  const handleComment = (newComment) => {
    // if (!isUserLoggedIn()) {
    //   alert('Sign in to make your opinion count.');
    //   navigate('/login');
    //   return;
    // }

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);

    if (video) {
      const updatedVideo = { ...video, comments: updatedComments };
      setVideo(updatedVideo);
      updateVideoBackend(updatedVideo);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div className="video-page">
      <div className="video-main">
        <h1>{video.title}</h1>
        <video controls>
          <source src={video.videoUrl} type="video/mp4" />
        </video>
        <div className="video-details">
          <div className="video-info">
            <p>{video.description}</p>
            <p>{video.owner}</p>
            <p>{video.views} views</p>
            <p>Published {video.time_publish} {video.time_type} ago</p>
          </div>
          <div className="like-dislike-buttons">
            <button onClick={handleLike} className={liked === true ? "like-button active" : "like-button"}>
              <span>{likes}</span>
              <FontAwesomeIcon icon={faThumbsUp} />
            </button>
            <button onClick={handleDislike} className={liked === false ? "dislike-button active" : "dislike-button"}>
              <FontAwesomeIcon icon={faThumbsDown} />
            </button>
          </div>
        </div>
        <CommentSection comments={comments} handleComment={handleComment} videoId={video.id} />
      </div>
      <div className="suggested-videos">
        {videoData.map((video, index) => (
          <VideoDisplay
            key={index}
            title={video.title}
            description={video.description}
            videoUrl={video.videoUrl}
            thumbnailUrl={video.thumbnailUrl}
            duration={video.duration}
            owner={video.owner}
            views={video.views}
            time_publish={video.time_publish}
            time_type={video.time_type}
            user_icon={video.user_icon}
            id={video.id}
          />
        ))}
      </div>
    </div>
  );
};

const CommentSection = ({ comments, handleComment, videoId }) => {
  const [newComment, setNewComment] = useState('');

  const submitComment = () => {
    handleComment({ text: newComment, likes: 0, replies: [], videoId });
    setNewComment('');
  };

  return (
    <div className="comment-section">
      <h2>Comments</h2>
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} videoId={videoId} />
      ))}
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a new comment"
      />
      <button onClick={submitComment}>Submit</button>
    </div>
  );
};

const Comment = ({ comment, videoId }) => {
  const [likes, setLikes] = useState(comment.likes);
  const [isLiked, setIsLiked] = useState(false); // Track whether the comment is liked or not
  const [replies, setReplies] = useState(comment.replies || []);
  const [newReply, setNewReply] = useState('');

  const handleLike = () => {
    if (!isLiked) {
      const updatedLikes = likes + 1;
      setLikes(updatedLikes);
    } else {
      const updatedLikes = likes - 1;
      setLikes(updatedLikes);
    }
    setIsLiked(!isLiked);
    updateLocalStorage();

    // Toggle the isLiked state
    // Handle updating the comment's likes in the parent component (VideoPage)
  };

  const handleReply = (newReply) => {
    const updatedReplies = [...replies, newReply];
    setReplies(updatedReplies);
    comment.replies = updatedReplies; 
    updateLocalStorage();
  };

  const submitReply = () => {
    handleReply({ text: newReply, likes: 0, replies: [], videoId });
    setNewReply('');
  };

  const updateLocalStorage = () => {
    const storedVideos = JSON.parse(localStorage.getItem('videos')) || [];
    const video = storedVideos.find(v => v.id === videoId);
    if (video) {
      video.comments = updateComments(video.comments, comment);
      updateVideoBackend(video)
      localStorage.setItem('videos', JSON.stringify(storedVideos));
    }
  };
  const updateVideoBackend = async (updatedVideo) => {
    const url = `/api/videos/user/${updatedVideo.owner}/videos/${updatedVideo.id}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedVideo),
      });
      if (!response.ok) {
        throw new Error('Failed to update video');
      }
    } catch (error) {
      console.error('Error updating video:', error);
    }
  };

  const updateComments = (comments, updatedComment) => {
    return comments.map(c => {
      if (c.text === updatedComment.text) {
        return updatedComment;
      } else if (c.replies) {
        return { ...c, replies: updateComments(c.replies, updatedComment) };
      }
      return c;
    });
  };

  return (
    <div className="comment">
      <p>{comment.text}</p>
      <button onClick={handleLike}>
        {isLiked ? 'Unlike' : 'Like'} ({likes})
      </button>
      <div className="replies">
        {replies.map((reply, index) => (
          <Comment key={index} comment={reply} videoId={videoId} />
        ))}
      </div>
      <input
        type="text"
        value={newReply}
        onChange={(e) => setNewReply(e.target.value)}
        placeholder="Reply to comment"
      />
      <button onClick={submitReply}>Reply</button>
    </div>
  );
};

export default VideoPage;
