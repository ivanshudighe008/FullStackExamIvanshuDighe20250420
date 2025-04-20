import { Middleware } from '@reduxjs/toolkit';
import { updateCartOnServer } from '../slices/cartSlice';

const SYNC_ACTIONS = [
  'cart/addToCart',
  'cart/removeFromCart',
  'cart/updateQuantity',
  'cart/clearCart',
];

export const cartSyncMiddleware: Middleware = store => next => action => {
  const result = next(action);

  if (SYNC_ACTIONS.includes(action.type)) {
    const state = store.getState();
    if (!state.auth.user) return result;
    const cartItems = state.cart.items;
    store.dispatch(updateCartOnServer(cartItems));
  }

  return result;
};
