import React, { useEffect, useState } from "react";
import HomepageCSS from "../home/styles/Homepage.module.css";
import useFetchAssignedTickets from "../../hooks/tickets/useFetchAssignedTickets";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Login } from "../../utils/auth/Login";
import { useDispatch } from "react-redux";
import { addAssignedTickets } from "../../store/tickets/TicketSlice";
import { Ticket } from "../../utils/tickets/Ticket";
import HamBurger from "./hamBurger/HamBurger";
import { HamBurgerValue } from "../../utils/hamBurger/Hamburger";
import CreateNewTicket from "./createTicket/CreateNewTicket";
import DisplayTickets from "./displayTicket/DisplayTickets";
import DisplayResolvedTicket from "./displayResolvedTicket/DisplayResolvedTicket";
import MenuIcon from "@mui/icons-material/Menu";
import { green } from "@mui/material/colors";
const Homepage = () => {
  const dispatch = useDispatch();
  const userDetails: Login = useSelector((store: RootState) => store.user);
  const isLoggedIn: boolean = useSelector(
    (store: RootState) => store.authLogin.isLoggedIn
  );
  const assignedTicketsInStore: Ticket[] = useSelector(
    (store: RootState) => store.tickets
  );
  const curHamburgerOption: HamBurgerValue = useSelector(
    (state: RootState) => state.hamBurger.curOption
  );
  const showHamBurger: boolean = useSelector(
    (store: RootState) => store.hamBurger.showHamBurger
  );  const assignedToUser = useFetchAssignedTickets(userDetails.id ?? undefined);
  useEffect(() => {
    if (!assignedToUser) return;
    if (assignedToUser && assignedTicketsInStore.length === 0 && isLoggedIn) {
      dispatch(addAssignedTickets(assignedToUser));
    }
  }, [assignedToUser, assignedTicketsInStore.length, isLoggedIn]);
  return (
    <div className={HomepageCSS.mainDiv}>
      <div className={HomepageCSS.hamBurgerContainer}>
        {showHamBurger && <HamBurger />}
      </div>
      <div className={HomepageCSS.displayHome} style={{ width: "100%" }}>
        {curHamburgerOption === "createTicket" && <CreateNewTicket />}
        {curHamburgerOption === "assignedTickets" && <DisplayTickets />}
        {curHamburgerOption === "resolvedTickets" && <DisplayResolvedTicket />}
      </div>
    </div>
  );
};

export default Homepage;
