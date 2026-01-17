// src/components/AddMeme.jsx
import { collection, addDoc, serverTimestamp, doc,updateDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export async function ShareMeme(memedata) {

    try {
      const memeData = {...memedata,createdAt: serverTimestamp(),ownerId: auth.currentUser.uid,likes:0}

      const docRef = await addDoc(collection(db, "test"), memeData);
      console.log("Meme added with ID:", docRef.id);

    } catch (error) {
      console.error("Error adding meme:", error);
    }
}

export async function UpdateLikeCount(like, memeId){
  await updateDoc(
    doc(db, "test", memeId),
    {
      likes: like
    }
  );
}
