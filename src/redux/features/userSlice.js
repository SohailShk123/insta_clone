import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  open: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
    setOpen: (state) => {
      state.open = !state.open;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, setOpen } = userSlice.actions;

// selector
export const selectUser = (state) => state.user.user;
export const selectOpen = (state) => state.user.open;

export default userSlice.reducer;
