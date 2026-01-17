import { useEffect, useState } from "react";
import "./css/Posts.css";

import MemeCard from './MemeCard';
import {makeImages } from "../functions";

export default function Posts({ createMemeImage, memesData, filter }) {
  
  const [memes, setMemes] = useState([]);

  

  useEffect(() => {
    if (!createMemeImage || memesData.length === 0) return;

    makeImages(memesData,setMemes)
  }, [memesData]);

  return (
    <div className="Posts">
      <h3>Latest Memes</h3>

      <div className="memesGrid">
        {memes.map(meme => (
          <MemeCard
            key={meme.id}
            meme={meme}
          />
        ))}
      </div>
    </div>
  );
}
