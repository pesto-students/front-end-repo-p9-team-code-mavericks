// store/usernameSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
};

const usernameSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload;
    },
    logout: (state) => {
      state.username = null;
    },
  },
});

export const { logout, login } = usernameSlice.actions;
export default usernameSlice.reducer;
