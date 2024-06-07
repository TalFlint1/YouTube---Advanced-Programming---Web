import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import videoData from '../../videoData.json';
import './VideoPage.css';

const VideoPage = () => {
  const { id } = useParams();
  const video = videoData[id];
  
  const [likes, setLikes] = useState(video.likes);
  // indicator if like button is pressed
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const [comments, setComments] = useState(video.comments);

  const handleLike = () => {
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
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    }
    setDisliked(!disliked);
  };

  const handleComment = (newComment) => {
    setComments([...comments, newComment]);
    video.comments = [...comments, newComment]; // Update JSON data
  };

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
      <button onClick={handleLike} className={liked ? "like-button active" : "like-button"}>Like ({likes})</button>
      <button onClick={handleDislike} className={disliked ? "dislike-button active" : "dislike-button"}>Dislike</button>
      <CommentSection comments={comments} handleComment={handleComment} />
    </div>
  );
};

const CommentSection = ({ comments, handleComment }) => {
  const [newComment, setNewComment] = useState('');

  const submitComment = () => {
    handleComment({ text: newComment, likes: 0, replies: [] });
    setNewComment('');
  };

  return (
    <div className="comment-section">
      <h2>Comments</h2>
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
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

const Comment = ({ comment }) => {
  const [likes, setLikes] = useState(comment.likes);
  const [replies, setReplies] = useState(comment.replies);
  const [newReply, setNewReply] = useState('');

  const handleLike = () => {
    setLikes(likes + 1);
    comment.likes = likes + 1; // Update JSON data
  };

  const handleReply = (newReply) => {
    setReplies([...replies, newReply]);
    comment.replies = [...replies, newReply]; // Update JSON data
  };

  const submitReply = () => {
    handleReply({ text: newReply, likes: 0, replies: [] });
    setNewReply('');
  };

  return (
    <div className="comment">
      <p>{comment.text}</p>
      <button onClick={handleLike}>Like ({likes})</button>
      <div className="replies">
        {replies.map((reply, index) => (
          <Comment key={index} comment={reply} />
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
