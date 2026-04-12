// src/components/AddMeme.jsx
import { collection, addDoc, serverTimestamp, doc,updateDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import {
  getDocs,
  query,
  orderBy,
  limit
} from "firebase/firestore";

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

export async function fetchMemes(func) {
  try {
    const q = query(
      collection(db, "test"),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    const snapshot = await getDocs(q);

    func(snapshot)
  } catch (error) {
    console.error("Error fetching memes:", error);
  }
}


export async function createMemeImage(textBoxes, templateUrl) {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  const image = new Image()
  image.crossOrigin = "anonymous"
  image.src = templateUrl

  await new Promise(resolve => (image.onload = resolve))
  await document.fonts.ready

  canvas.width = image.width
  canvas.height = image.height

  ctx.drawImage(image, 0, 0)

  textBoxes.forEach(textBox => {
    
    //  percent → absolute
    const x = textBox.posP.x * canvas.width
    const y = textBox.posP.y * canvas.height

    //  font size scales with image height
    const fontSizePx = textBox.fontSizeP * canvas.height

    ctx.textBaseline = "top"
    ctx.font = `400 ${fontSizePx}px ${textBox.font}`
    ctx.fillStyle = "white"
    ctx.strokeStyle = "black"
    ctx.lineWidth = Math.max(2, fontSizePx * 0.08) // optional but recommended

    ctx.strokeText(textBox.value, x, y)
    ctx.fillText(textBox.value, x, y)

    // console.log(textBox, fontSizePx)
  }) 

  return canvas
}

export async function makeImages(memesData, setMemes) {
      const memes = [];

      for (const meme of memesData) {
        if (!meme.textBoxes || !meme.memeTemplate) continue;

        const canvas = await createMemeImage(
          meme.textBoxes,
          meme.memeTemplate
        );

        const imgSrc = canvas.toDataURL("image/png");

        memes.push({      
          imgSrc,
          ...meme
        });
      }

      setMemes(memes);
    }