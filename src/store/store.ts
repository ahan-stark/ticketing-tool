import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "../store/auth/LoginSlice"

const store = configureStore({
  reducer: {
    authLogin: LoginSlice,
  },
});
 export default store;