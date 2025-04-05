// src/redux/slices/HomeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: "json",
};

const HomeSlice = createSlice({
  name: 'Visualizer',
  initialState,
  reducers: {
    setMenuSelected: (state, action) => {
      state.value = action.payload;
    },

  },
});

export const { setMenuSelected} = HomeSlice.actions;
export default HomeSlice.reducer;
