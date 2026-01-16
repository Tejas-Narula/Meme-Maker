// src/components/AddMeme.jsx
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import Button from "./Elements/Button";

export default function ShareMeme({memedata}) {

  const addMeme = async () => {
    try {
      const memeData = {...memedata,createdAt: serverTimestamp(),ownerId: auth.currentUser.uid}

      const docRef = await addDoc(collection(db, "test"), memeData);
      console.log("Meme added with ID:", docRef.id);

    } catch (error) {
      console.error("Error adding meme:", error);
    }
  };

  return (
    <Button text="Share Meme" func={addMeme} marginB="1rem"/>
  );
}
