import { useEffect, useState } from "react";
import { Ticket } from "../../utils/tickets/Ticket";

const useFetchAssignedTickets = (userId: string) => {
  const [assigedTickets, setAssignedTickets] = useState<Ticket[]>();
  const fetchAssignedTickets = async (): Promise<void> => {
    const data = await fetch("http://localhost:3000/tickets");
    const tickets: Ticket[] = await data.json();
    const assigedToUser: Ticket[] = tickets.filter(
      (ticket) => ticket.assigneeId === userId
    );
    setAssignedTickets(assigedToUser);
  };
  useEffect(() => {
    fetchAssignedTickets();
  }, []);
  return assigedTickets;
};

export default useFetchAssignedTickets;