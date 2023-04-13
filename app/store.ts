import { configureStore } from '@reduxjs/toolkit'
import ordinalsReducer from './features/ordinalsSlice'

export const store = configureStore({
  reducer: {
    ordinals: ordinalsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
