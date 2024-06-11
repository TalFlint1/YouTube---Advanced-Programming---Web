import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import videoData from '../../videoData.json';
import './VideoPage.css';
import { isUserLoggedIn } from '../../authCheck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(null); // null for no action, 'like' for like, 'dis' for dislike
  const [disliked, setDisliked] = useState(null); // null for no action
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
        // Save the video to localStorage only if it is not already present
        storedVideos.push(initialVideo);
        localStorage.setItem('videos', JSON.stringify(storedVideos));
      }
    }

    if (initialVideo) {
      setVideo(initialVideo);
      setLikes(initialVideo.likes || 0);
      setComments(initialVideo.comments || []);
      setLiked(initialVideo.liked || null);
      setDisliked(initialVideo.disliked || null);
    }

    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (video) {
      const updatedVideo = { ...video, likes, comments, liked, disliked };
      const storedVideos = JSON.parse(localStorage.getItem('videos')) || [];
      const updatedVideos = storedVideos.map(v => (v.id === parseInt(id) ? updatedVideo : v));
      localStorage.setItem('videos', JSON.stringify(updatedVideos));
    }
  }, [likes, comments, liked, disliked, video, id]);

  const handleLike = () => {
    if (!isUserLoggedIn()) {
      alert('Sign in to make your opinion count.');
      navigate('/login');
      return;
    }

    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
    if (disliked) {
      setDisliked(false);
    }
  };

  const handleDislike = () => {
    if (!isUserLoggedIn()) {
      alert('Sign in to make your opinion count.');
      navigate('/login');
      return;
    }

    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    }
    setDisliked(!disliked);
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
      <h1>{video.title}</h1>
      <video controls>
        <source src={video.videoUrl} type="video/mp4" />
      </video>
      <p>{video.description}</p>
      <p>{video.owner}</p>
      <p>{video.views} views</p>
      <p>Published {video.time_publish} {video.time_type} ago</p>
      <button onClick={handleLike} className={liked ? "like-button active" : "like-button"}>
      <span>{likes}</span>
      <FontAwesomeIcon icon={faThumbsUp} />
      </button>
      <button className={disliked ? "dislike-button active" : "dislike-button"} onClick={handleDislike}>
      <FontAwesomeIcon icon={faThumbsDown} />
      </button>
      <CommentSection comments={comments} handleComment={handleComment} videoId={video.id} />
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
        placeholder="Add a comment"
      />
      <button onClick={submitComment}>Submit</button>
    </div>
  );
};

const Comment = ({ comment, videoId }) => {
  const [likes, setLikes] = useState(comment.likes);
  const [replies, setReplies] = useState(comment.replies || []);
  const [newReply, setNewReply] = useState('');

  const handleLike = () => {
    const updatedLikes = likes + 1;
    setLikes(updatedLikes);
    comment.likes = updatedLikes;
    updateLocalStorage();
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
      localStorage.setItem('videos', JSON.stringify(storedVideos));
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
      <button onClick={handleLike}>Like ({likes})</button>
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
