// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const save = (state) => {
  try {
    localStorage.setItem('cart', JSON.stringify(state));
  } catch (e) {
    // fail silently if storage isn't available
  }
};

const load = () => {
  try {
    const raw = localStorage.getItem('cart');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
};

const recalc = (state) => {
  state.totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
  state.totalAmount = state.items.reduce((sum, i) => sum + i.totalPrice, 0);
};

const initialState =
  load() || {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    isCartOpen: false,
  };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartOpen(state, action) {
      state.isCartOpen = action.payload;
      save(state);
    },

    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          image: newItem.image,
        });
      } else {
        existingItem.quantity += 1;
        existingItem.totalPrice += newItem.price;
      }

      recalc(state);
      // Optional: auto-open cart after adding
      state.isCartOpen = true;

      save(state);
    },

    decrementQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (!existingItem) return;

      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        existingItem.totalPrice -= existingItem.price;
      } else {
        state.items = state.items.filter((item) => item.id !== id);
      }

      recalc(state);
      save(state);
    },

    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);

      recalc(state);
      save(state);
    },

    clearCart(state) {
      state.items = [];
      recalc(state);
      save(state);
    },
  },
});

export const {
  setCartOpen,
  addToCart,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;