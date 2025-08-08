// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBb1dRF4_tGwMgKNd5bFIpTuWoDNGO--k0",
  authDomain: "eventorganizerapp-b1cca.firebaseapp.com",
  projectId: "eventorganizerapp-b1cca",
  storageBucket: "eventorganizerapp-b1cca.firebasestorage.app",
  messagingSenderId: "590071211189",
  appId: "1:590071211189:web:6cf72e36d4468781b94afc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
