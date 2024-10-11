import { Button } from "@mui/material";
import React, { SyntheticEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { createNewTicket, Ticket } from "../../../utils/tickets/Ticket";
import { Login } from "../../../utils/auth/Login";
import DialogDemo from "../../materialUI/SimpleDialog";
import { RootState } from "../../../store/store";
import CreateTicketCSS from "./CreateNewTicket.module.css";

const CreateNewTicket = () => {
  const ticketDescription = useRef<HTMLInputElement>(null);
  const [assignee, setAssignee] = useState<Login | null>();
  const userDetails: Login = useSelector((store: RootState) => store.user);

  const assignTicket = (event: SyntheticEvent): void => {
    event.preventDefault();
    if (!ticketDescription.current?.value) {
      setErrorMsg("Enter Description");
      clearErrorNsg();
    }
    if (!assignee || assignee.id == "") {
      setErrorMsg("Choose Assignee");
      clearErrorNsg();
    }
    if (ticketDescription.current?.value && assignee && assignee.id != "") {
      alert("success");
      createNewTicket(userDetails, assignee, ticketDescription.current.value);
      ticketDescription.current.value = "";
      setAssignee(null);
    }
  };
  const [errorMsg, setErrorMsg] = useState<string>("");
  const clearErrorNsg = (): void => {
    setTimeout(() => {
      setErrorMsg("");
    }, 2000);
  };

  return (
    <div>
      <form className={CreateTicketCSS.formFlex}>
        <div className={CreateTicketCSS.formTag}>Provide Details</div>
        <div className={CreateTicketCSS.childFormDiv}>
          <input
            type="text"
            placeholder="enter assignee"
            readOnly
            value={assignee?.userName || ""}
            className={CreateTicketCSS.assigneeInput}
          />
          <DialogDemo setUserInfo={setAssignee} />
        </div>
        <input
          type="text"
          placeholder="enter ticket description"
          ref={ticketDescription}
          className={CreateTicketCSS.descInput}
        />
        <Button
          variant="contained"
          onClick={assignTicket}
          type="submit"
          className={CreateTicketCSS.assignBtn}
        >
          Assign
        </Button>
        <div className={CreateTicketCSS.errorMsg}>
          {errorMsg && <div>{errorMsg}</div>}
        </div>
      </form>
    </div>
  );
};

export default CreateNewTicket;
