export type Store = {
  user: any;
};

const initialState: Store = {
  user: null
};

export const reducer = (state: Store = initialState, action: any) => {
  switch (action.type) {
    case "RECEIVE_USER": {
      return { ...state, user: action.payload };
    }

    default:
      return state;
  }
};
