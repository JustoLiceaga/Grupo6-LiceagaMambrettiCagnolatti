import app from 'firebase/app';
import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyANhFA4CToyQPbageJ6dky-PYIYb-LLA-E",
  authDomain: "my-app-352ae.firebaseapp.com",
  projectId: "my-app-352ae",
  storageBucket: "my-app-352ae.firebasestorage.app",
  messagingSenderId: "19021889033",
  appId: "1:19021889033:web:a6a4c47a6e87784c8002d8"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();