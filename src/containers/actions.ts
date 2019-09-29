import { Dispatch } from "react";
import { firebaseApp } from "../firebaseConfig";

export const simpleActions = {
  receiveData: (payload: any) => ({
    type: "RECEIVE_DATA" as "RECEIVE_DATA",
    payload
  }),
  receiveUser: (payload: any) => ({
    type: "RECEIVE_USER" as "RECEIVE_USER",
    payload
  })
};

export type Action = ReturnType<
  typeof simpleActions[keyof typeof simpleActions]
>;

export const receiveData = (dispatch: Dispatch<Action>) => {
  const ref = firebaseApp.database().ref();
  ref.on("value", snapshot => {
    dispatch(simpleActions.receiveData(snapshot.val()));
    return snapshot.val();
  });
};

export const receiveUser = (dispatch: Dispatch<Action>, user: any) => {
  console.log("LAla", user);
  dispatch(simpleActions.receiveUser(user));
};
