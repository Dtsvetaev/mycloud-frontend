import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  access: localStorage.getItem('access') || null,
  refresh: localStorage.getItem('refresh') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      localStorage.setItem('access', action.payload.access);
      localStorage.setItem('refresh', action.payload.refresh);
    },
    logout: (state) => {
      state.access = null;
      state.refresh = null;
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    },
  },
});

export const { setTokens, logout } = authSlice.actions;
export default authSlice.reducer;
