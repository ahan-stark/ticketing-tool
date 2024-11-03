import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ResolvedTicket } from "../../utils/tickets/Ticket";
import { green, grey } from "@mui/material/colors";

function createData(data: ResolvedTicket) {
  const {
    id,
    assignerId,
    assignerName,
    assignedDate,
    assigneeId,
    assigneeName,
    ticketDescription,
    resolutionNotes,
    resolvedDate,
  } = data;
  return {
    id,
    assignerId,
    assignerName,
    assignedDate,
    assigneeId,
    assigneeName,
    ticketDescription,
    resolutionNotes,
    resolvedDate,
  };
}
interface ResolvedTableProps {
  resolvedData: ResolvedTicket[];
}

export default function ResolvedTable({ resolvedData }: ResolvedTableProps) {
  const rows: ResolvedTicket[] = resolvedData.map(
    (data: ResolvedTicket): ResolvedTicket => createData(data)
  );
  return (
    <TableContainer sx={{ marginTop: "1%" , marginRight :"1%", marginLeft :"1%"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx = {{background:grey[100]}}>
            <TableCell sx={{ color: green[800], fontWeight: "600" }}>
              Assigner Name
            </TableCell>
            <TableCell
              align="right"
              sx={{ color: green[800], fontWeight: "600" }}
            >
              Assigned Date
            </TableCell>
            <TableCell
              align="right"
              sx={{ color: green[800], fontWeight: "600" }}
            >
              Ticket Description
            </TableCell>
            <TableCell
              align="right"
              sx={{ color: green[800], fontWeight: "600" }}
            >
              Resolution Notes
            </TableCell>
            <TableCell
              align="right"
              sx={{ color: green[800], fontWeight: "600" }}
            >
              Resolved Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.assignerName}
              </TableCell>
              <TableCell align="right">{row.assignedDate}</TableCell>
              <TableCell align="right">{row.ticketDescription}</TableCell>
              <TableCell align="right">{row.resolutionNotes}</TableCell>
              <TableCell align="right">{row.resolvedDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
