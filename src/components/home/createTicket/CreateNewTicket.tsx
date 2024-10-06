import { Button } from "@mui/material";
import React, { SyntheticEvent, useRef } from "react";
import { useSelector } from "react-redux";
import { Ticket } from "../../../utils/tickets/Ticket";
import { Login } from "../../../utils/auth/Login";

const CreateNewTicket = () => {
  const ticketDescription = useRef<HTMLInputElement>(null);
  const userDetails : Login = useSelector((store: any) => store.user);
  console.log(userDetails);
  
  const ticketDetails: Ticket = {
    assignerId: "",
    assignerName: "",
    assignedDate: "",
    assigneeId: "",
    assigneeName: "",
    ticketDescription: "",
  };

  const assignTicket = (event: SyntheticEvent): void => {
    event.preventDefault();
    if (ticketDescription.current?.value) {
      
    }
  };
  return (
    <div>
      <form>
        <input type="text" placeholder="enter assignee" />
        <input
          type="text"
          placeholder="enter ticket description"
          ref={ticketDescription}
        />
        <Button variant="contained" onClick={assignTicket} type="submit">
          Assign
        </Button>
      </form>
    </div>
  );
};

export default CreateNewTicket;
