import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    addLogin: (state) => {
      state.isLoggedIn = true;
    },
    removeLogin: (state) => {
      state.isLoggedIn = false;
    },
  },
});
export const { addLogin, removeLogin } = LoginSlice.actions;
export default LoginSlice.reducer;
