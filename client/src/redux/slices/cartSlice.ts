import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getCart, updateCart } from '@/utils/api';

export interface Product {
  _id: string;
  name: string;
  price: number;
}

export interface CartItem {
  productId: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  isDrawerOpen: boolean;
}

const initialState: CartState = {
  items: [],
  loading: false,
  isDrawerOpen: false,
};

// Fetch cart from server (GET /cart)
export const fetchCartFromServer = createAsyncThunk<CartItem[]>(
  'cart/fetch',
  async () => {
    const data = await getCart();
    return data?.items || [];
  }
);

// Update cart on server (PUT /cart)
export const updateCartOnServer = createAsyncThunk<CartItem[], CartItem[]>(
  'cart/update',
  async (items) => {
    const data = await updateCart(items);
    return data.items;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const index = state.items.findIndex(
        (i) => i.productId._id === action.payload.productId._id
      );
      if (index >= 0) {
        state.items[index].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const item = state.items.find(
        (i) => i.productId._id === action.payload.id
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (i) => i.productId._id !== action.payload
      );
    },
    clearCart(state) {
      state.items = [];
    },
    toggleCartDrawer: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartFromServer.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartFromServer.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(updateCartOnServer.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  toggleCartDrawer,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
