import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Ordinal {
  id: string
  inscriptionNumber: string;
  ownerAddress: string
  outputValue: string
  contentType: string
  contentLength: string
  location: string
  genesisTransaction: string
}

export interface OrdinalsState {
  ordinals: Ordinal[]
}

const initialState: OrdinalsState = {
  ordinals: []
}

export const ordinalsSlice = createSlice({
  name: 'ordinals',
  initialState,
  reducers: {
    addOrdinal: (state, action: PayloadAction<Ordinal>) => {
      state.ordinals.push(action.payload)
    }
  }
})

export const { addOrdinal } = ordinalsSlice.actions

export default ordinalsSlice.reducer
