import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { blockstreamApi } from "./services/blockstream";
import { xverseApi } from "./services/xverse";

import ordinalsReducer from "./features/ordinalsSlice";

export const store = configureStore({
  reducer: {
    [blockstreamApi.reducerPath]: blockstreamApi.reducer,
    [xverseApi.reducerPath]: xverseApi.reducer,

    ordinals: ordinalsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(blockstreamApi.middleware)
      .concat(xverseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
