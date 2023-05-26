import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFBqkLb1FlyYSBZVce_hRgd9YP-cT6pIc",
  authDomain: "celerity-ai-text-enhancer.firebaseapp.com",
  projectId: "celerity-ai-text-enhancer",
  storageBucket: "celerity-ai-text-enhancer.appspot.com",
  messagingSenderId: "767147741943",
  appId: "1:767147741943:web:ab6af458a1993d0820f9f2",
  measurementId: "G-NFHNT71H5J"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app) 
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
