import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { efoodApi } from './services/efoodApi'
import { cartReducer } from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [efoodApi.reducerPath]: efoodApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(efoodApi.middleware),
})

setupListeners(store.dispatch)
