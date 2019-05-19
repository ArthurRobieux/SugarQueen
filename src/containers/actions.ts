import { Dispatch } from "react";
import firebase from "firebase";

export const simpleActions = {
  receiveData: (payload: any) => ({
    type: "RECEIVE_DATA" as "RECEIVE_DATA",
    payload
  })
};

export type Action = ReturnType<
  typeof simpleActions[keyof typeof simpleActions]
>;

export const receiveData = (dispatch: Dispatch<Action>) => {
  var firebaseConfig = {
    apiKey: "AIzaSyBKuSSYa6flZOe3zB0pLVJnaOxGxEVAvmw",
    authDomain: "sugarqueen-cce31.firebaseapp.com",
    databaseURL: "https://sugarqueen-cce31.firebaseio.com",
    projectId: "sugarqueen-cce31",
    storageBucket: "sugarqueen-cce31.appspot.com",
    messagingSenderId: "1097346693497",
    appId: "1:1097346693497:web:df8167963acf3c8b"
  };
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const ref = app.database().ref();

  ref.on("value", snapshot => {
    dispatch(simpleActions.receiveData(snapshot.val()));
    return snapshot.val();
  });
};
