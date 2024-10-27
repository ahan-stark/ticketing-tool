import { Login } from "../auth/Login";

export interface Ticket {
  id?: string;
  assignerId: string;
  assignerName: string;
  assignedDate: string;
  assigneeId: string;
  assigneeName: string;
  ticketDescription: string;
}
export interface ResolvedTicket {
  id?: string;
  assignerId: string;
  assignerName: string;
  assignedDate: string;
  assigneeId: string;
  assigneeName: string;
  ticketDescription: string;
  resolutionNotes: string;
  resolvedDate: string;
}

const getDate = (): string => {
  const date = new Date();
  const curDate =
    date.getDate().toString() +
    " - " +
    (date.getMonth() + 1).toString() +
    " - " +
    date.getFullYear().toString();
  return curDate;
};

export const createNewTicket = async (
  userDetails: Login,
  assignee: Login,
  ticketDescription: string
) => {
  const newTicket: Ticket = {
    assignerId: userDetails.id!,
    assignerName: userDetails.userName!,
    assignedDate: getDate(),
    assigneeId: assignee.id!,
    assigneeName: assignee.userName!,
    ticketDescription: ticketDescription,
  };
  const url: string = "http://localhost:3000/tickets";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(newTicket),
  });
};

export const deleteResolvedTicket = async (ticketId: string) => {
  await fetch("http://localhost:3000/tickets/" + ticketId, {
    method: "DELETE",
  });
};

export const addResolvedTickets = async (
  ticketId: string,
  resolutionNotes: string
) => {
  const data = await fetch(`http://localhost:3000/tickets?id=${ticketId}`);
  const ticketDetails: Ticket[] = await data.json();
  console.log(ticketDetails);
  const resolvedTicket: ResolvedTicket = {
    assignerId: ticketDetails[0].assignerId,
    assignerName: ticketDetails[0].assignerName,
    assignedDate: ticketDetails[0].assignedDate,
    assigneeId: ticketDetails[0].assigneeId,
    assigneeName: ticketDetails[0].assigneeName,
    ticketDescription: ticketDetails[0].ticketDescription,
    resolutionNotes: resolutionNotes,
    resolvedDate: getDate(),
  };
  console.log(resolvedTicket);

  const requestOptions = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(resolvedTicket),
  };
  await fetch(`http://localhost:3000/resolved-tickets`, requestOptions);
};
