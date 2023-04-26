import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDTzL_cU1x9VT6YBf6pYuxFsa_Fp0nUMIA",
  authDomain: "moviedunia-78921.firebaseapp.com",
  projectId: "moviedunia-78921",
  storageBucket: "moviedunia-78921.appspot.com",
  messagingSenderId: "186993165752",
  appId: "1:186993165752:web:fe8a9e0734a9c92f98bb4d",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesref = collection(db, "movies");
export const reviewref = collection(db, "reviews");
export default app;
