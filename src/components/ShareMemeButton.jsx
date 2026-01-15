// src/components/AddMeme.jsx
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ShareMeme({memedata}) {

  const addMeme = async () => {
    try {
      const memeData = {...memedata,createdAt: serverTimestamp()}

      const docRef = await addDoc(collection(db, "test"), memeData);
      console.log("Meme added with ID:", docRef.id);

    } catch (error) {
      console.error("Error adding meme:", error);
    }
  };

  return (
    <button onClick={addMeme}>
      Share Meme
    </button>
  );
}
