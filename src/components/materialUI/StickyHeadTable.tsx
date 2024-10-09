import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Column {
  id: "assigner" | "date" | "description";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

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

interface Data {
  id: string;
  assigner: string;
  date: string;
  description: string;
}

function createData(
  id: string,
  assigner: string,
  date: string,
  description: string
): Data {
  return { id, assigner, date, description };
}

const rows = [
  createData("1", "ahan", "07-11-2024", "please resolve it ASAP"),
  createData("1", "ahan", "07-11-2024", "please resolve it ASAP"),
  createData("1", "ahan", "07-11-2024", "please resolve it ASAP"),
  createData("1", "ahan", "07-11-2024", "please resolve it ASAP"),
  createData("1", "ahan", "07-11-2024", "please resolve it ASAP"),
  createData("1", "ahan", "07-11-2024", "please resolve it ASAP"),
  createData("1", "ahan", "07-11-2024", "please resolve it ASAP"),
  createData("1", "ahan", "07-11-2024", "please resolve it ASAP"),
  createData("1", "ahan", "07-11-2024", "please resolve it ASAP"),
  createData("1", "ahan", "07-11-2024", "please resolve it ASAP"),
];

export default function StickyHeadTable() {
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
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      console.log(row);
                      console.log((row as Data)[column.id]);

                      const value = (row as any)[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
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
