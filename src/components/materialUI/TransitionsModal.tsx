import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { TransitionsModalProps } from "../../utils/materialUI/Modal";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateAssignedTickets } from "../../store/tickets/TicketSlice";
import {
  addResolvedTickets,
  deleteResolvedTicket,
} from "../../utils/tickets/Ticket";
import { green } from "@mui/material/colors";

const inputStyle = {
  width: "84%",
  height: "6em",
  "marginTop": "2em",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "solid 3px lightgreen",
  boxShadow: 24,
  p: 4,
  borderRadius: "13px",
};

export default function TransitionsModal({
  setOpenModal,
  open,
  ticketDetails,
}: TransitionsModalProps) {
  const resolutionNotes = React.useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const handleClose = () => setOpenModal(false);
  const resolveTicket = async (ticketId: string): Promise<void> => {
    await addResolvedTickets(ticketId, resolutionNotes.current?.value!);
    await deleteResolvedTicket(ticketId);
    dispatch(updateAssignedTickets(ticketId));
    handleClose();
  };
  const proceedToResolve = (ticketId: string) => {
    if (resolutionNotes.current?.value) {
      resolveTicket(ticketId);
    }
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 200,
            sx: {
              backgroundColor: "rgba(252, 245, 192, 0.3)",
            },
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: green[700], fontSize:"26px"}}
            >
              Ticket Details
            </Typography>
            {ticketDetails && (
              <>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  Assigned By : {ticketDetails.assigner}
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  Assigned Date : {ticketDetails.date}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  Description : {ticketDetails.description}
                </Typography>
                <input
                  type="text"
                  ref={resolutionNotes}
                  placeholder="Resolution Notes"
                  style={inputStyle}
                />
              </>
            )}
            <Typography sx={{}}>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  proceedToResolve(ticketDetails.id);
                }}
              >
                Resolve
              </Button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
