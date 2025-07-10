import { createSlice } from '@reduxjs/toolkit';

const fileSlice = createSlice({
  name: 'files',
  initialState: {
    list: [],
  },
  reducers: {
    setFiles: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setFiles } = fileSlice.actions;
export default fileSlice.reducer;
