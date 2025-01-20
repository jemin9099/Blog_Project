// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "mernblog-a5150.firebaseapp.com",
  projectId: "mernblog-a5150",
  storageBucket: "mernblog-a5150.firebasestorage.app",
  messagingSenderId: "928147873912",
  appId: "1:928147873912:web:2c6ef65b763d6ba7e68d8d"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider }