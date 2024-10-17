import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerPayload } from '@/types/auth/registerPayload';
import { AuthState } from '@/types/auth/authStatePayload';
import { loginPayload } from '@/types/auth/loginPayload';
import Cookies from 'js-cookie';  
export const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state, action: PayloadAction<loginPayload>) {
      state.loading = true;
    },
    loginSuccess(state) {
      state.loading = false;
      state.isAuthenticated = true;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart(state, action: PayloadAction<registerPayload>) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state) {
      state.loading = false;
      state.isAuthenticated = true;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    refreshTokenRequest(state){
      state.isAuthenticated = false;
      state.error = null;
    },
    refreshTokenSuccess(state) {
      state.isAuthenticated = true;
    },
    refreshTokenFailure(state,action : PayloadAction<string>) {
      state.isAuthenticated = false;
      state.error= action.payload
    },
    checkToken(state) {
      const token = Cookies.get('refreshToken'); 
      if (token) {
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  refreshTokenRequest,
  refreshTokenFailure,
  refreshTokenSuccess,
  checkToken,
} = authSlice.actions;

export default authSlice.reducer;
