import React from "react";
import "./css/UserMemes.css";

import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function UserMemes() {
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("User not logged in");
        return;
      }

      const q = query(
        collection(db, "test"),
        where("ownerId", "==", user.uid)
      );

      const snapshot = await getDocs(q);

      const userMemes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("User Memes:", userMemes);
    });

    return () => unsubscribe();
  }, []);

  return <div className="container"></div>;
}
