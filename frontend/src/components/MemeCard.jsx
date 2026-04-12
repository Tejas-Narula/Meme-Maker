import React, { useState, useEffect } from 'react';
import './css/MemeCard.css' 
import { UpdateLikeCount } from '../functions';

export default function MemeCard({meme, onImageClick}) {
  const [likes, setLikes] = useState(meme.likes || 0);
  const [liked, setLiked] = useState(false);

  // Check if user already liked this meme (using localStorage for anonymous users)
  useEffect(() => {
    const likedMemes = JSON.parse(localStorage.getItem('likedMemes') || '{}');
    if (likedMemes[meme.id]) {
      setLiked(true);
    }
  }, [meme.id]);

  // Sync likes from prop if it changes externally
  useEffect(() => {
    setLikes(meme.likes || 0);
  }, [meme.likes]);

  function handleLike(e) {
    e.stopPropagation();
    
    if (liked) {
      // Unlike
      const newLikes = Math.max(0, likes - 1);
      setLikes(newLikes);
      setLiked(false);

      const likedMemes = JSON.parse(localStorage.getItem('likedMemes') || '{}');
      delete likedMemes[meme.id];
      localStorage.setItem('likedMemes', JSON.stringify(likedMemes));

      UpdateLikeCount(newLikes, meme.id);
    } else {
      // Like
      const newLikes = likes + 1;
      setLikes(newLikes);
      setLiked(true);

      const likedMemes = JSON.parse(localStorage.getItem('likedMemes') || '{}');
      likedMemes[meme.id] = true;
      localStorage.setItem('likedMemes', JSON.stringify(likedMemes));

      UpdateLikeCount(newLikes, meme.id);
    }
  }

  return (
    <div className="memeCard" key={meme.id} onClick={() => onImageClick && onImageClick(meme, likes, liked)}>
      <div className="imgArea">
        <img
        src={meme.imgSrc}
        alt="Meme"
      />
      </div>
      
      <div className="info">

        <div className="post-info">
          <p>{meme.title || 'title'}</p>
          <div className="likes-container">
            <div className="likes">{likes}</div>
            <button
              className={`like-btn${liked ? ' liked' : ''}`}
              onClick={handleLike}
              title={liked ? 'Unlike' : 'Like this meme'}
            >&#10084;</button>
          </div>
        </div>
        
        
        <p>{meme.ownerId}</p>
      </div>
      
    </div>
  );
}