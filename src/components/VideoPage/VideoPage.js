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
    const storedVideo = storedVideos.find((v) => v.id === parseInt(id));

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
      setLikes(initialVideo.likes || 0);
      setComments(initialVideo.comments || []);
      setLiked(initialVideo.liked); // Set liked state based on stored data
    }

    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (video) {
      const updatedVideo = { ...video, likes, comments, liked };
      const storedVideos = JSON.parse(localStorage.getItem('videos')) || [];
      const updatedVideos = storedVideos.map(v => (v.id === parseInt(id) ? updatedVideo : v));
      localStorage.setItem('videos', JSON.stringify(updatedVideos));
    }
  }, [likes, comments, liked, video, id]);

  const handleLike = () => {
    if (!isUserLoggedIn()) {
      alert('Sign in to make your opinion count.');
      navigate('/login');
      return;
    }

    if (liked === true) {
      setLikes(likes - 1);
      setLiked(null); // Remove like
    } else {
      setLikes(likes + 1);
      setLiked(true); // Like the video
    }
  };

  const handleDislike = () => {
    if (!isUserLoggedIn()) {
      alert('Sign in to make your opinion count.');
      navigate('/login');
      return;
    }

    if (liked === false) {
      setLikes(likes + 1);
      setLiked(null); // Remove dislike
    } else {
      setLikes(likes - 1);
      setLiked(false); // Dislike the video
    }
  };

  const handleComment = (newComment) => {
    if (!isUserLoggedIn()) {
      alert('Sign in to make your opinion count.');
      navigate('/login');
      return;
    }

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    if (video) {
      video.comments = updatedComments;
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
    setIsLiked(!isLiked); // Toggle the isLiked state
    // Handle updating the comment's likes in the parent component (VideoPage)
  };

  const handleReply = () => {
    // Handle reply functionality
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
      <button onClick={handleReply}>Reply</button>
    </div>
  );
};

export default VideoPage;
