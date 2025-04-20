// middleware/cartSyncMiddleware.ts
import { Middleware, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { updateCartOnServer } from '../slices/cartSlice';
import type { CartItem } from '../slices/cartSlice';

const SYNC_ACTIONS = [
  'cart/addToCart',
  'cart/removeFromCart',
  'cart/updateQuantity',
  'cart/clearCart',
];

interface RootState {
  auth: { user: any };
  cart: { items: CartItem[] };
}

// Typed dispatch to support thunks
type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

export const cartSyncMiddleware: Middleware<{}, RootState, AppDispatch> =
  (store) => (next) => (action) => {
    const result = next(action);

    if (
      typeof action === 'object' &&
      action !== null &&
      'type' in action &&
      SYNC_ACTIONS.includes(action.type as string)
    ) {
      const state = store.getState();
      if (!state.auth.user) return result;
      const cartItems = state.cart.items;
      store.dispatch(updateCartOnServer(cartItems));
    }

    return result;
  };
