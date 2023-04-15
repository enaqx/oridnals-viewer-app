import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Ordinal } from "../types";

export interface OrdinalsState {
  ordinals: Ordinal[];
  ordinalsId: string[];
  unspentOutputTxIds: string[];
  counterUnspentOutputsCheck: number;
}

const initialState: OrdinalsState = {
  ordinals: [],
  ordinalsId: [],
  unspentOutputTxIds: [],
  counterUnspentOutputsCheck: 0,
};

export const ordinalsSlice = createSlice({
  name: "ordinals",
  initialState,
  reducers: {
    addOrdinal: (state, action: PayloadAction<Ordinal>) => {
      state.ordinals.push(action.payload);
    },

    clearOrdinals: (state) => {
      state.ordinals = [];
    },
  },
});

export const { addOrdinal, clearOrdinals } = ordinalsSlice.actions;

export default ordinalsSlice.reducer;
