import { Dispatch } from "react";
import { firebaseApp } from "../firebaseConfig";

export const simpleActions = {
  receiveUser: (payload: any) => ({
    type: "RECEIVE_USER" as "RECEIVE_USER",
    payload
  })
};

export type Action = ReturnType<
  typeof simpleActions[keyof typeof simpleActions]
>;

export const receiveUser = (dispatch: Dispatch<Action>, user: any) => {
  console.log("LAla", user);
  dispatch(simpleActions.receiveUser(user));
};
