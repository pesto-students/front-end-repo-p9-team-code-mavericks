// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import usernameReducer from './usernameSlice';

const store = configureStore({
  reducer: {
    username: usernameReducer,
  },
});

export default store;
