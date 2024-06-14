import React, { useState } from 'react';

const Comment = ({ comment, videoId }) => {
  const [likes, setLikes] = useState(comment.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1); // Decrease likes if already liked
    } else {
      setLikes(likes + 1); // Increase likes if not liked
    }
    setIsLiked(!isLiked); // Toggle the liked state
  };

  const handleReply = () => {
    // Handle reply functionality
  };

  return (
    <div className="comment">
      <p>{comment.text}</p>
      <button onClick={handleLike}>{isLiked ? 'Dislike' : 'Like'} ({likes})</button>
      <div className="replies">
        {/* Render replies here */}
      </div>
      {/* Input and submit button for reply */}
    </div>
  );
};

export default Comment;
