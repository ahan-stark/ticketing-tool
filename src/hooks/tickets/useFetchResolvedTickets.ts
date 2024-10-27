import { useEffect, useState } from "react";
import { ResolvedTicket } from "../../utils/tickets/Ticket";

const useFetchResolvedTickets = (userId: string): ResolvedTicket[] | null => {
  const [resolvedTickets, setResolvedTickets] = useState<
    ResolvedTicket[] | null
  >(null);
  const getResolvedTickets = async () => {
    const data = await fetch(
      `http://localhost:3000/resolved-tickets?assigneeId=${userId}`
    );
    const json = await data.json();
    setResolvedTickets(json);
  };
  useEffect(() => {
    getResolvedTickets();
  }, []);
  return resolvedTickets;
};
export default useFetchResolvedTickets;
