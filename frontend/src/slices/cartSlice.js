import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],     // Array to store items in the shopping cart
    paymentMethod: null,  // Payment method selected by the user
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((x) => x.product === item.product);

      if (existingItem) {
        // If the item already exists in the cart, update its quantity
        existingItem.quantity += item.quantity;
      } else {
        // If the item is not in the cart, add it
        state.cartItems.push(item);
      }

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter((x) => x.product !== productId);

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
    },
    clearCartItems: (state) => {
      state.cartItems = [];

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart, savePaymentMethod, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;

// Helper function to recalculate total quantity and price
const updateCart = (state) => {
  state.totalItems = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  state.totalPrice = state.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return state;
};
