import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '../store';
import { clearCart } from './cartSlice';

interface UserState {
  user: any | null;
}

const initialState: UserState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    clearUser(state) {
      localStorage.clear();
      state.user = null;
    },
  },
});

// Custom thunk for logout
export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch(clearUser());
  dispatch(clearCart());
};

export const { setUser, clearUser } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
