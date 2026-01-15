import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit
} from "firebase/firestore";
import { db } from "../firebaseConfig";

import "./Posts.css";

export default function Posts({ createMemeImage }) {
  const [memesData, setMemesData] = useState([]);
  const [memesImgSrc,setMemesImgSrc] = useState([]);

  useEffect(() => {
    async function fetchMemes() {
      try {
        const q = query(
          collection(db, "test"),
          orderBy("createdAt", "desc"),
          limit(10)
        );

        const snapshot = await getDocs(q);

        setMemesData(
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
        );
      } catch (error) {
        console.error("Error fetching memes:", error);
      }
    }

    fetchMemes();
  }, []);

  useEffect(() => {
    if (!createMemeImage || memesData.length === 0) return;

    async function makeImages() {
      const memeImagesSrc = []
      for (const meme of memesData) {
        if (!meme.textBoxes || !meme.memeTemplate) continue;

        const canvas = await createMemeImage(
          meme.textBoxes,
          meme.memeTemplate
        );

        const imgSrc = canvas.toDataURL("image/png");
        memeImagesSrc.push(imgSrc)

      }
      setMemesImgSrc(memeImagesSrc)
    }

    makeImages(); 
  }, [memesData]);

  return (
    <div className="Posts">
      <h3>Latest Memes</h3>

      <div className="memesGrid">
        {memesImgSrc.map(memeSrc => (
          <div className="memeCard">
            <img
              src={memeSrc}
              alt="Meme"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
