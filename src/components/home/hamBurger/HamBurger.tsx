import React from "react";
import HamBurgerCSS from "./HamBurger.module.css";
import { useDispatch } from "react-redux";
import { changeOption } from "../../../store/hamBurger/HamBurgerSlice";
import { HamBurgerValue } from "../../../utils/hamBurger/Hamburger";


const HamBurger = () => {
  const dispatch = useDispatch();
  const invokeDispatch = (option: HamBurgerValue): void => {
    dispatch(changeOption(option));
  };

  return (
    <div className={HamBurgerCSS.mainContainer}>
      <div
      className={HamBurgerCSS.options}
        onClick={() => {
          const option: HamBurgerValue = "createTicket";
          invokeDispatch(option);
        }}
      >
        Create Ticket
      </div>
      <div
      className={HamBurgerCSS.options}
        onClick={() => {
          const option: HamBurgerValue = "assignedTickets";
          invokeDispatch(option);
        }}
      >
        Assigned Tickets
      </div>
      <div
      className={HamBurgerCSS.options}
        onClick={() => {
          const option: HamBurgerValue = "resolvedTickets";
          invokeDispatch(option);
        }}
      >
        Resolved Tickets
      </div>
    </div>
  );
};

export default HamBurger;
