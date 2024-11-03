import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Ticket } from "../../../utils/tickets/Ticket";
import StickyHeadTable from "../../materialUI/StickyHeadTable";

const DisplayTickets = () => {
  const assignedTickets: Ticket[] = useSelector(
    (store: RootState) => store.tickets
  );
  if (assignedTickets.length === 0) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop : "10%",
        color : "green",
        fontWeight:"600",
        fontSize : "23px"
      }}>
        No tickets have been assigned to you!
      </div>
    );
  }
  
  return (
    <div style={{width:"100%", marginLeft : "4%", marginRight :"2%"}}>
      <StickyHeadTable />
    </div>
  );
};

export default DisplayTickets;
