import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "../store/auth/LoginSlice";
import UserSlice from "../store/user/userSlice";
import TicketSlice from "../store/tickets/TicketSlice";
import HamBurgerSlice from "./hamBurger/HamBurgerSlice";

const store = configureStore({
  reducer: {
    authLogin: LoginSlice,
    user: UserSlice,
    tickets: TicketSlice,
    hamBurger: HamBurgerSlice,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
