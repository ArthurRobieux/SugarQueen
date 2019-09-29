export type Store = {
  data: any;
  user: any;
};

const initialState: Store = {
  data: null,
  user: null
};

export const reducer = (state: Store = initialState, action: any) => {
  switch (action.type) {
    case "RECEIVE_DATA": {
      return { ...state, data: action.payload };
    }
    case "RECEIVE_USER": {
      return { ...state, user: action.payload };
    }

    default:
      return state;
  }
};
