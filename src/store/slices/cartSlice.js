import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const foundItem = state.items.find((item) => item.id === product.id)

      if (foundItem) {
        foundItem.quantity += 1
        return
      }

      state.items.push({
        ...product,
        quantity: 1,
      })
    },
    removeFromCart: (state, action) => {
      const productId = action.payload
      const foundItem = state.items.find((item) => item.id === productId)

      if (!foundItem) {
        return
      }

      if (foundItem.quantity > 1) {
        foundItem.quantity -= 1
        return
      }

      state.items = state.items.filter((item) => item.id !== productId)
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export const cartReducer = cartSlice.reducer
