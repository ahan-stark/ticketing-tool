import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Login } from "../../utils/auth/Login";

const initialState: Login = {
  userName: "",
  password: "",
  id: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Login>): void => {
      state.id = action.payload.id;
      state.userName = action.payload.userName;
      state.password = action.payload.password;
    },
    removeUser: (state): void => {
      state.id = "";
      state.userName = "";
      state.password = "";
    },
  },
});
export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
