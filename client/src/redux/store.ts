import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import { cartSyncMiddleware } from './middleware/cartSyncMiddleware';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartSyncMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
