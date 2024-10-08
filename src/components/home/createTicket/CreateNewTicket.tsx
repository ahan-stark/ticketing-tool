import { Button } from "@mui/material";
import React, { SyntheticEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Ticket } from "../../../utils/tickets/Ticket";
import { Login } from "../../../utils/auth/Login";
import SimpleDialogDemo from "../../materialUI/SimpleDialog";
import DialogDemo from "../../materialUI/SimpleDialog";

const CreateNewTicket = () => {
  const ticketDescription = useRef<HTMLInputElement>(null);
  const [assignee, setAssignee] = useState<Login>({
    userName: "",
    password: "",
    id: "",
  });
  console.log(assignee);
  
  const userDetails: Login = useSelector((store: any) => store.user);
  console.log(userDetails);



  const assignTicket = (event: SyntheticEvent): void => {
    event.preventDefault();
    if (ticketDescription.current?.value) {
    }
  };
 
  
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="enter assignee"
          readOnly
          value={assignee.userName}
        />
        <input
          type="text"
          placeholder="enter ticket description"
          ref={ticketDescription}
        />
        <DialogDemo
          setUserInfo= {setAssignee}
        />
        <Button variant="contained" onClick={assignTicket} type="submit">
          Assign
        </Button>
      </form>
    </div>
  );
};

export default CreateNewTicket;
