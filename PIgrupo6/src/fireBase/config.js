import app from 'firebase/app';
import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyDwY6E6YsI0APNweW2cj95QZriyS3bczt8",
  authDomain: "primer-proyecto-5de1d.firebaseapp.com",
  projectId: "primer-proyecto-5de1d",
  storageBucket: "primer-proyecto-5de1d.firebasestorage.app",
  messagingSenderId: "929321432695",
  appId: "1:929321432695:web:8d6f3aa67138aa78873872"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();