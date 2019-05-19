import { createContext } from "react";
import { Store } from "../containers/reducer";

export type StoreContextValue = Store & { dispatch: any };

export const StoreContext = createContext<StoreContextValue>({
  data: null,
  dispatch: () => {}
});
