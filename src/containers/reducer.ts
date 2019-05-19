export type Store = {
  data: any;
};

const initialState: Store = {
  data: null
};

export const reducer = (state: Store = initialState, action: any) => {
  switch (action.type) {
    case "RECEIVE_DATA": {
      return { ...state, data: action.payload };
    }

    default:
      return state;
  }
};
