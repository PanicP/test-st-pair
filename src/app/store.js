import { configureStore } from '@reduxjs/toolkit';
import counterReducer from 'app/slices/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
