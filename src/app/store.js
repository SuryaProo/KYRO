
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice'; // Import our new reducer

export const store = configureStore({
  reducer: {
    // The key 'cart' here is important. It means in our global state,
    // everything managed by cartSlice will be under `state.cart`.
    cart: cartReducer,
    // you can add more reducers here for auth, products, etc.
    // auth: authReducer,
  },
});