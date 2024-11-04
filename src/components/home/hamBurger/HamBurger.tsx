import React from "react";
import HamBurgerCSS from "./HamBurger.module.css";
import { useDispatch } from "react-redux";
import { changeOption } from "../../../store/hamBurger/HamBurgerSlice";
import { hamburgerOptions, HamBurgerValue } from "../../../utils/hamBurger/Hamburger";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const HamBurger = () => {
  const dispatch = useDispatch();
  const invokeDispatch = (option: HamBurgerValue): void => {
    dispatch(changeOption(option));
  };
  const curOption: HamBurgerValue = useSelector(
    (store: RootState) => store.hamBurger.curOption
  );
  const options: hamburgerOptions[] = [
    { option: "Create Ticket", value: "createTicket" },
    { option: "Assigned Tickets", value: "assignedTickets" },
    { option: "Resolved Tickets", value: "resolvedTickets" },
  ];

  return (
    <div className={HamBurgerCSS.mainContainer}>
      {options.map((hamOption: hamburgerOptions) => {
       const curClass: string = `${HamBurgerCSS.options} ${hamOption.value === curOption && HamBurgerCSS.selected}`;
        return (
          <div
            className={curClass}
            onClick={() => {
              const selectedValue: HamBurgerValue = hamOption.value;
              invokeDispatch(selectedValue);
            }}
            key={hamOption.value}
          >
            {hamOption.option}
          </div>
        );
      })}
    </div>
  );
};

export default HamBurger;
