import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "../store/auth/LoginSlice";
import UserSlice from "../store/user/userSlice";

const store = configureStore({
  reducer: {
    authLogin: LoginSlice,
    user: UserSlice,
  },
});
export default store;
