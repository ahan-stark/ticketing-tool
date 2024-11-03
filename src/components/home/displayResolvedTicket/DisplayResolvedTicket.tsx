import React from "react";
import useFetchResolvedTickets from "../../../hooks/tickets/useFetchResolvedTickets";
import { Login } from "../../../utils/auth/Login";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ResolvedTicket } from "../../../utils/tickets/Ticket";
import ResolvedTable from "../../materialUI/ResolvedTable";
import DisplayResolvedTicketCSS from "./DisplayResolvedTicket.module.css";

const DisplayResolvedTicket = () => {
  const userDetails: Login = useSelector((store: RootState) => store.user);
  const resolvedTicketsData: ResolvedTicket[] | null = useFetchResolvedTickets(
    userDetails.id!
  );
  if (!resolvedTicketsData) return <div>Loading...</div>;
  if (resolvedTicketsData.length === 0)
    return <div className={DisplayResolvedTicketCSS.noTickets}>No ticket resolved yet!</div>;
  return <ResolvedTable resolvedData={resolvedTicketsData} />;
};

export default DisplayResolvedTicket;
