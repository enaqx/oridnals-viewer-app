import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import ordinalsReducer from "./features/ordinalsSlice";

export const store = configureStore({
  reducer: {
    ordinals: ordinalsReducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
