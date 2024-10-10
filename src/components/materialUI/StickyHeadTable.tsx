import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Ticket } from "../../utils/tickets/Ticket";
import { useState } from "react";
import TransitionsModal from "./TransitionsModal";
import { Column, Data } from "../../utils/materialUI/Table";

const columns: readonly Column[] = [
  { id: "assigner", label: "Assigner", minWidth: 170 },
  { id: "date", label: "Date", minWidth: 100 },
  {
    id: "description",
    label: "Description",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

function createData(
  id: string,
  assigner: string,
  date: string,
  description: string
): Data {
  return { id, assigner, date, description };
}
export default function StickyHeadTable() {
  const [ticketDetails, setTicketDetails] = useState<Data>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const assignedTickets: Ticket[] = useSelector(
    (store: RootState) => store.tickets
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const rows: Data[] = assignedTickets.map(
    (ticket: Ticket): Data =>
      createData(
        ticket.id!,
        ticket.assignerName,
        ticket.assignedDate,
        ticket.ticketDescription
      )
  );
  const displayTicketOnModal = (data: Data) => {
    console.log(data);
    
    setModalOpen(true);
    setTicketDetails(data);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = (row as any)[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          displayTicketOnModal(row);
                        }}
                      >
                        Resolve
                      </Button>
                      <TransitionsModal
                        open={modalOpen}
                        setOpenModal={() => {
                          setModalOpen(!modalOpen);
                        }}
                        ticketDetails={ticketDetails!}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
