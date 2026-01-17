import React from 'react';
import './css/MemeCard.css' 
import { UpdateLikeCount } from '../functions';

export default function MemeCard({meme}) {
  // console.log(meme)
  return (
    <div className="memeCard" key={meme.id}>
      <div className="imgArea">
        <img
        src={meme.imgSrc}
        alt="Meme"
      />
      </div>
      
      <div className="info">
        <p>{meme.title || 'title'}</p>
        <div className="likes-container">
          <div className="likes">{meme.likes}</div>
          <button onClick={()=>UpdateLikeCount(meme.likes+1,meme.id)}>&#10084;</button>
        </div>
      </div>
      
    </div>
  );
}