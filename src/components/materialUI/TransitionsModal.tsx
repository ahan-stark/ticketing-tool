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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({
  setOpenModal,
  open,
  ticketDetails,
}: TransitionsModalProps) {
  const dispatch = useDispatch();
  const [state, setState] = React.useState<boolean | null>(null);
  const handleClose = () => setOpenModal(false);
  const resolveTicket = async (ticketId: string): Promise<void> => {
    await fetch("http://localhost:3000/tickets/" + ticketId, {
      method: "DELETE",
    });
    dispatch(updateAssignedTickets(ticketId));
    handleClose();
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
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
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
                  <div>Description : {ticketDetails.description}</div>
                </Typography>
              </>
            )}
            <Typography sx={{ mt: 3 }}>
              <Button
                variant="contained"
                size="small"
                onClick={() => {
                  resolveTicket(ticketDetails.id);
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
