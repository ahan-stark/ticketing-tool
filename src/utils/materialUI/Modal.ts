import { Data } from "./Table";

export interface TransitionsModalProps {
  open: boolean;
  setOpenModal(val: boolean): void;
  ticketDetails: Data;
}
