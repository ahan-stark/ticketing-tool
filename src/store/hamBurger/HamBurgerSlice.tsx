import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HamBurgerValue } from "../../utils/hamBurger/Hamburger";

const initialState: { curOption: HamBurgerValue } = {
  curOption: "createTicket",
};

const HamBurgerSlice = createSlice({
  name: "hamBurger",
  initialState,
  reducers: {
    changeOption: (state, action: PayloadAction<HamBurgerValue>) => {
      state.curOption = action.payload;
    },
  },
});
export const { changeOption } = HamBurgerSlice.actions;
export default HamBurgerSlice.reducer;
