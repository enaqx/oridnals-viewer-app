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

    addUnspentOutputsTxIds: (state, action: PayloadAction<string[]>) => {
      state.unspentOutputTxIds = action.payload;
    },

    countUnspentOutputsCheck: (state) => {
      state.counterUnspentOutputsCheck += 1;
    },

    removeUnspentOutputsTxIds: (state, action: PayloadAction<string>) => {
      state.unspentOutputTxIds = state.unspentOutputTxIds.filter(
        (txid) => txid !== action.payload
      );
    },
  },
});

export const {
  addOrdinal,
  clearOrdinals,
  addUnspentOutputsTxIds,
  countUnspentOutputsCheck,
  removeUnspentOutputsTxIds,
} = ordinalsSlice.actions;

export default ordinalsSlice.reducer;
