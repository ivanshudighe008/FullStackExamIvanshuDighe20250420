import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  _id: string;
  name: string;
  price: number;
}

interface ProductState {
  list: Product[];
}

const initialState: ProductState = {
  list: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.list = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
