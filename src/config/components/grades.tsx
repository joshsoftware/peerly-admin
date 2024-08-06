import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { grade } from "../types";
import { useEffect, useState } from "react";
import BorderColorIcon from '@mui/icons-material/BorderColor';

function createData(id: number, name: string, points: number) {
  return { id, name, points };
}

interface IProps {
  gradesList: grade[]|undefined;
}

export default function GradesTable(props: IProps) {
  const [rows, setRows] = useState<grade[]>([]);
  useEffect(() => {
    props.gradesList?.map((grade) => {
      setRows((prevData) => [
        ...prevData,
        createData(grade.id, grade.name, grade.points),
      ]);
    });
  }, [props.gradesList]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr No</TableCell>
            <TableCell align="right">Grade</TableCell>
            <TableCell align="right">Points</TableCell>
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
              <TableCell align="right">
              <BorderColorIcon/>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
