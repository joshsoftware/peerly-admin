import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { grade } from "../types";
import { useEffect, useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";

function createData(id: number, name: string, points: number, updated_by: string) {
  return { id, name, points, updated_by };
}

interface IProps {
  gradesList: grade[] | undefined;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  id: number;
  setId: (value: number | ((prevVar: number) => number)) => void;
}

export default function GradesTable(props: IProps) {
  const handleClickOpen = (id: number) => {
    props.setId(id);
    props.setOpen(true);
  };
  const [rows, setRows] = useState<grade[]>([]);
  useEffect(() => {
    setRows([]);
    props.gradesList?.map((grade) => {
      setRows((prevData) => [
        ...prevData,
        createData(grade.id, grade.name, grade.points, grade.updated_by),
      ]);
    });
  }, [props.gradesList]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ paddingRight: "10px" }}>Sr No</TableCell>
            <TableCell align="right">Grade</TableCell>
            <TableCell align="right">Points</TableCell>
            <TableCell align="right">Updated By</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.points}</TableCell>
              <TableCell align="right">{row.updated_by}</TableCell>
              <TableCell
                align="right"
                onClick={() => {
                  handleClickOpen(row.id);
                }}
                sx={{cursor:"pointer"}}
              >
                <BorderColorIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
