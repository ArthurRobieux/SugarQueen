import * as firebase from "firebase/app";
import "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyBKuSSYa6flZOe3zB0pLVJnaOxGxEVAvmw",
  authDomain: "sugarqueen-cce31.firebaseapp.com",
  databaseURL: "https://sugarqueen-cce31.firebaseio.com",
  projectId: "sugarqueen-cce31",
  storageBucket: "sugarqueen-cce31.appspot.com",
  messagingSenderId: "1097346693497",
  appId: "1:1097346693497:web:df8167963acf3c8b"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseAppAuth = firebaseApp.auth();

export const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};
