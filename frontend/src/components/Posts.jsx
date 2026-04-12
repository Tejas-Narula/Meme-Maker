import { useEffect, useState } from "react";
import "./css/Posts.css";

import MemeCard from './MemeCard';
import {makeImages, UpdateLikeCount } from "../functions";

export default function Posts({ createMemeImage, memesData, filter }) {
  
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [lightboxLikes, setLightboxLikes] = useState(0);
  const [lightboxLiked, setLightboxLiked] = useState(false);

  useEffect(() => {
    if (!createMemeImage || memesData.length === 0) return;

    makeImages(memesData, setMemes)
  }, [memesData]);

  // Close lightbox on Escape key
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === 'Escape') setSelectedMeme(null);
    }
    if (selectedMeme) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [selectedMeme]);

  function openLightbox(meme, likes, liked) {
    setSelectedMeme(meme);
    setLightboxLikes(likes);
    setLightboxLiked(liked);
  }

  function handleLightboxLike() {
    if (!selectedMeme) return;
    
    if (lightboxLiked) {
      // Unlike
      const newLikes = Math.max(0, lightboxLikes - 1);
      setLightboxLikes(newLikes);
      setLightboxLiked(false);

      const likedMemes = JSON.parse(localStorage.getItem('likedMemes') || '{}');
      delete likedMemes[selectedMeme.id];
      localStorage.setItem('likedMemes', JSON.stringify(likedMemes));

      UpdateLikeCount(newLikes, selectedMeme.id);

      // Sync back to memes list
      setMemes(prev => prev.map(m => m.id === selectedMeme.id ? {...m, likes: newLikes} : m));
    } else {
      // Like
      const newLikes = lightboxLikes + 1;
      setLightboxLikes(newLikes);
      setLightboxLiked(true);

      const likedMemes = JSON.parse(localStorage.getItem('likedMemes') || '{}');
      likedMemes[selectedMeme.id] = true;
      localStorage.setItem('likedMemes', JSON.stringify(likedMemes));

      UpdateLikeCount(newLikes, selectedMeme.id);

      // Sync back to memes list
      setMemes(prev => prev.map(m => m.id === selectedMeme.id ? {...m, likes: newLikes} : m));
    }
  }

  return (
    <div className="Posts">
      <h3>Latest Memes</h3>

      <div className="memesGrid">
        {memes.map(meme => (
          <MemeCard
            key={meme.id}
            meme={meme}
            onImageClick={openLightbox}
          />
        ))}
      </div>

      {/* Meme Lightbox */}
      {selectedMeme && (
        <div className="meme-lightbox-overlay" onClick={() => setSelectedMeme(null)}>
          <button className="lightbox-close-btn" onClick={() => setSelectedMeme(null)}>✕</button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedMeme.imgSrc}
              alt={selectedMeme.title || 'Meme'}
            />
            
            <div className="lightbox-info">
              {selectedMeme.title && (
                <span className="lightbox-title">{selectedMeme.title}</span>
              )}
              <div className="lightbox-likes">
                <span className="lightbox-like-count">{lightboxLikes}</span>
                <button
                  className={`like-btn lightbox-like-btn${lightboxLiked ? ' liked' : ''}`}
                  onClick={handleLightboxLike}
                  title={lightboxLiked ? 'Unlike' : 'Like this meme'}
                >&#10084;</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
