// store/usernameSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
};

const usernameSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    signup: (state, action) => {
      state.username = action.payload;
    },
    login: (state) => {
      state.username = null;
    },
  },
});

export const { signup, login } = usernameSlice.actions;
export default usernameSlice.reducer;
