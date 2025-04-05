// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import HomeReducer from './HomeSlice'; // Adjust the path as necessary

export const store = configureStore({
  reducer: {
    Visualizer: HomeReducer,
    // Add other reducers here
  },
});
