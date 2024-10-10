import React, { useEffect } from "react";
import HomepageCSS from "../home/styles/Homepage.module.css";
import { useNavigate } from "react-router-dom";
import useFetchAssignedTickets from "../../hooks/tickets/useFetchAssignedTickets";
import { useSelector } from "react-redux";
import store, { RootState } from "../../store/store";
import { Login } from "../../utils/auth/Login";
import { useDispatch } from "react-redux";
import { addAssignedTickets } from "../../store/tickets/TicketSlice";
import { Ticket } from "../../utils/tickets/Ticket";

const Homepage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails: Login = useSelector((store: RootState) => store.user);
  const isLoggedIn: boolean = useSelector(
    (store: RootState) => store.authLogin.isLoggedIn
  );
  const assignedTicketsInStore: Ticket[] = useSelector(
    (store: RootState) => store.tickets
  );
  const assignedToUser = useFetchAssignedTickets(userDetails.id!);
  useEffect(() => {
    if (assignedToUser && assignedTicketsInStore.length === 0 && isLoggedIn) {
      dispatch(addAssignedTickets(assignedToUser));
    }
  }, [assignedToUser, assignedTicketsInStore.length, isLoggedIn]);
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
        <div>{assignedToUser?.length}</div>
      </div>
    </div>
  );
};

export default Homepage;
