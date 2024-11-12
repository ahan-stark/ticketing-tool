import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HamBurgerValue } from "../../utils/hamBurger/Hamburger";

const initialState: { curOption: HamBurgerValue; showHamBurger: boolean } = {
  curOption: "createTicket",
  showHamBurger: false,
};

const HamBurgerSlice = createSlice({
  name: "hamBurger",
  initialState,
  reducers: {
    changeOption: (state, action: PayloadAction<HamBurgerValue>) => {
      state.curOption = action.payload;
    },
    toggleHamBurger: (state, action: PayloadAction<boolean>) => {
      state.showHamBurger = !state.showHamBurger;
    },
  },
});
export const { changeOption, toggleHamBurger } = HamBurgerSlice.actions;
export default HamBurgerSlice.reducer;
