import { useEffect, useState } from "react";
import { Ticket } from "../../utils/tickets/Ticket";

const useFetchAssignedTickets = (userId: string | undefined) => {
  const [assigedTickets, setAssignedTickets] = useState<Ticket[]>();
  const fetchAssignedTickets = async (): Promise<void> => {
    const data = await fetch(
      `http://localhost:3000/tickets?assigneeId=${userId}`
    );
    const tickets: Ticket[] = await data.json();
    setAssignedTickets(tickets);
  };
  useEffect(() => {
    fetchAssignedTickets();
  }, [userId]);
  return assigedTickets;
};

export default useFetchAssignedTickets;
