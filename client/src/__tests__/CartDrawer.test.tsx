// client/src/__tests__/CartDrawer.test.tsx
import { render, screen } from '@testing-library/react';
import CartDrawer from '@/components/CartDrawer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/slices/cartSlice';

describe('CartDrawer', () => {
  it('renders empty cart drawer component', () => {
    const store = configureStore({
      reducer: { cart: cartReducer },
      preloadedState: {
        cart: { items: [], loading: false, isDrawerOpen: true },
      },
    });

    render(
      <Provider store={store}>
        <CartDrawer />
      </Provider>
    );

    // More specific query to avoid multiple matches
    expect(
      screen.getByRole('heading', { name: /your cart/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});
