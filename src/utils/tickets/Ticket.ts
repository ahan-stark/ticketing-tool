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

export const createNewTicket = (
  userDetails: Login,
  assignee: Login,
  ticketDescription: string
) => {
  const date = new Date();
  const newTicket: Ticket = {
    assignerId: userDetails.id!,
    assignerName: userDetails.userName!,
    assignedDate:
      date.getDate().toString() +
      " - " +
      (date.getMonth() + 1).toString() +
      " - " +
      date.getFullYear().toString(),
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
