// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, inMemoryPersistence, browserSessionPersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "inventory-manager-d3325.firebaseapp.com",
  projectId: "inventory-manager-d3325",
  storageBucket: "inventory-manager-d3325.appspot.com",
  messagingSenderId: "797575731286",
  appId: "1:797575731286:web:f70a12b2c5507b0a8f43f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);
const storage = getStorage(app);

export { app, db, auth, storage };