import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const getMyProfileData = async () => {
  if (auth.currentUser === null) {
    return {};
  }
  const snapshot = await getDoc(doc(db, "health_centers", auth?.currentUser?.uid));
  return snapshot.data();
};

export const updateProfile = async (profile) => {
  return await setDoc(doc(db, "health_centers", auth.currentUser.uid), profile, {
    merge: true,
  });
};