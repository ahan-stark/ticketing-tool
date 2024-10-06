import React from "react";
import HomepageCSS from "../home/styles/Homepage.module.css";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const navigateToCreateTicket = (): void => {
    navigate("/create-ticket");
  };
  const navigateToDisplayTickets = (): void => {
    navigate("/display-tickets");
  };
  return (
    <div className={HomepageCSS.displayHome}>
      <div className={HomepageCSS.flexChild} onClick={navigateToCreateTicket}>
        Create new ticket
      </div>
      <div className={HomepageCSS.flexChild} onClick={navigateToDisplayTickets}>
        Display Tickets
      </div>
    </div>
  );
};

export default Homepage;
