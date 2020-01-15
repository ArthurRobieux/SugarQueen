import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

export const isLocal = window.location.hostname === "localhost";

export const firebaseConfig = isLocal
  ? {
      apiKey: "AIzaSyDCEESiSInhy6yIdTBjul6psLvQOqDvhwg",
      authDomain: "sugarqueen-dev.firebaseapp.com",
      databaseURL: "https://sugarqueen-dev.firebaseio.com",
      projectId: "sugarqueen-dev",
      storageBucket: "sugarqueen-dev.appspot.com",
      messagingSenderId: "540898077396",
      appId: "1:540898077396:web:e03fa3c720d5bb1448a941",
      measurementId: "G-V6M308GV0M"
    }
  : {
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

export const storageRef = firebase.storage().ref();
