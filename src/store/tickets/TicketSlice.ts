import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ticket } from "../../utils/tickets/Ticket";

const initialState: Ticket[] = [];
const TicketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    addAssignedTickets: (state, action: PayloadAction<Ticket[]>) => {
      return action.payload; // since states are not mutable we should use explicit return if mutating the state
    },
  },
});
export const { addAssignedTickets } = TicketSlice.actions;
export default TicketSlice.reducer;
