import React from "react";
import useFetchResolvedTickets from "../../../hooks/tickets/useFetchResolvedTickets";
import { Login } from "../../../utils/auth/Login";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ResolvedTicket } from "../../../utils/tickets/Ticket";

const DisplayResolvedTicket = () => {
  const userDetails: Login = useSelector((store: RootState) => store.user);
  const resolvedTickets: ResolvedTicket[] | null = useFetchResolvedTickets(
    userDetails.id!
  );
  if (!resolvedTickets) return <div>Loading...</div>;
  if(resolvedTickets.length === 0)
      return <div>No ticket resolved yet</div>
  return <div>{JSON.stringify(resolvedTickets)}</div>;
};

export default DisplayResolvedTicket;
