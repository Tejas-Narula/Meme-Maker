import React, { useEffect, useState, useRef } from 'react';
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { fetchMemes, createMemeImage, makeImages, UpdateLikeCount } from '../functions';
import Header from '../components/Header';
import './css/Memes.css';

export default function Memes() {
  const [memesData, setMemesData] = useState([]);
  const [memes, setMemes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoverSide, setHoverSide] = useState(null); // 'left' | 'right' | null

  // Auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        await signInAnonymously(auth);
      }
    });
    return () => unsub();
  }, []);

  // Fetch memes from DB
  useEffect(() => {
    fetchMemes((snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMemesData(data);
    });
  }, []);

  // Generate images from memes data
  useEffect(() => {
    if (memesData.length === 0) return;
    makeImages(memesData, (processedMemes) => {
      const shuffled = [...processedMemes].sort(() => Math.random() - 0.5);
      setMemes(shuffled);
      setCurrentIndex(0);
    });
  }, [memesData]);

  const currentMeme = memes[currentIndex] || null;

  // Like state for current meme
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if (!currentMeme) return;
    const likedMemes = JSON.parse(localStorage.getItem('likedMemes') || '{}');
    setLiked(!!likedMemes[currentMeme.id]);
    setLikes(currentMeme.likes || 0);
  }, [currentMeme]);

  function handleLike(e) {
    e.stopPropagation();
    if (!currentMeme) return;

    if (liked) {
      const newLikes = Math.max(0, likes - 1);
      setLikes(newLikes);
      setLiked(false);
      const likedMemes = JSON.parse(localStorage.getItem('likedMemes') || '{}');
      delete likedMemes[currentMeme.id];
      localStorage.setItem('likedMemes', JSON.stringify(likedMemes));
      UpdateLikeCount(newLikes, currentMeme.id);
      setMemes(prev => prev.map(m => m.id === currentMeme.id ? {...m, likes: newLikes} : m));
    } else {
      const newLikes = likes + 1;
      setLikes(newLikes);
      setLiked(true);
      const likedMemes = JSON.parse(localStorage.getItem('likedMemes') || '{}');
      likedMemes[currentMeme.id] = true;
      localStorage.setItem('likedMemes', JSON.stringify(likedMemes));
      UpdateLikeCount(newLikes, currentMeme.id);
      setMemes(prev => prev.map(m => m.id === currentMeme.id ? {...m, likes: newLikes} : m));
    }
  }

  function goNext() {
    if (memes.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % memes.length);
  }

  function goPrev() {
    if (memes.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + memes.length) % memes.length);
  }

  function handleScreenClick(e) {
    const x = e.clientX;
    const mid = window.innerWidth / 2;
    if (x < mid) {
      goPrev();
    } else {
      goNext();
    }
  }

  function handleMouseMove(e) {
    const x = e.clientX;
    const mid = window.innerWidth / 2;
    setHoverSide(x < mid ? 'left' : 'right');
  }

  function handleMouseLeave() {
    setHoverSide(null);
  }

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [memes]);

  return (
    <>
      <Header />
      <div
        className="memes-page"
        onClick={handleScreenClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Hover hint */}
        {hoverSide && memes.length > 0 && (
          <div className={`memes-hover-hint ${hoverSide}`}>
            {hoverSide === 'left' ? '← Back' : 'Next →'}
          </div>
        )}

        {memes.length === 0 ? (
          <div className="memes-loading" onClick={(e) => e.stopPropagation()}>
            <div className="memes-spinner"></div>
            <p>Loading memes...</p>
          </div>
        ) : currentMeme ? (
          <div className="memes-viewer">
            <div className="memes-image-container">
              <img
                src={currentMeme.imgSrc}
                alt={currentMeme.title || 'Meme'}
                onClick={handleLike}
                style={{ cursor: 'pointer' }}
              />
            </div>

            <div className="memes-bottom-bar" onClick={(e) => e.stopPropagation()}>
              <div className="memes-title-area">
                <h3>{currentMeme.title || 'Untitled'}</h3>
                <span className="memes-counter">{currentIndex + 1} / {memes.length}</span>
              </div>
              
              <div className="memes-like-area">
                <span className="memes-like-count">{likes}</span>
                <button
                  className={`like-btn memes-like-btn${liked ? ' liked' : ''}`}
                  onClick={handleLike}
                  title={liked ? 'Unlike' : 'Like'}
                >&#10084;</button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
