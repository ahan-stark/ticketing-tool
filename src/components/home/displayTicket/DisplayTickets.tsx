import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Ticket } from "../../../utils/tickets/Ticket";

const DisplayTickets = () => {
  const assignedTickets: Ticket[] = useSelector(
    (store: RootState) => store.tickets
  );
  if (assignedTickets.length === 0) return <div>No Tickets!</div>;
  return (
    <div>
      {assignedTickets.map((ticket) => (
        <div>{JSON.stringify(ticket)}</div>
      ))}
    </div>
  );
};

export default DisplayTickets;
