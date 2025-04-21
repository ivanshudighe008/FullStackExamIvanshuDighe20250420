import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '@/components/ProductCard';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/redux/slices/cartSlice';
import authReducer from '@/redux/slices/authSlice';

const product = {
  _id: '123',
  name: 'Test Product',
  price: 99.99,
};

describe('ProductCard', () => {
  it('renders product info and allows adding to cart', () => {
    const store = configureStore({
      reducer: {
        cart: cartReducer,
        auth: authReducer,
      },
      preloadedState: {
        cart: { items: [], loading: false, isDrawerOpen: false },
        auth: { user: 'Test_token' },
      },
    });

    render(
      <Provider store={store}>
        <ProductCard product={product} />
      </Provider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();

    const addButton = screen.getByText('Add');
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);
  });
});
