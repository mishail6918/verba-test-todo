import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  isAuthenticated: boolean;
}

const getAuthInfo = () => {
  const auth = localStorage.getItem('auth');
  return !!auth;
};

const initialState: State = {
  isAuthenticated: getAuthInfo(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ login: string; password: string }>) => {
      if (action.payload.login === 'admin' && action.payload.password === 'admin') {
        state.isAuthenticated = true;
        localStorage.setItem('auth', 'true');
      } else {
        throw new Error('Credentials are invalid');
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.setItem('auth', 'false');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
