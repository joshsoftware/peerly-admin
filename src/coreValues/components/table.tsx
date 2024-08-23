import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { coreValue } from "../types";

function createData(id: number, name: string, description: string, parent_id: number) {
  return { id, name, description, parent_id };
}

interface IProps {
  coreValueList: coreValue[] | undefined;
}

export default function CoreValuesTable(props: IProps) {
  const [rows, setRows] = useState<coreValue[]>([]);
  useEffect(() => {
    console.log("corevaluelist -> ",props.coreValueList)
    setRows([]);
    props.coreValueList?.map((coreValue) => {
      setRows((prevData) => [
        ...prevData,
        createData(coreValue.id, coreValue.name, coreValue.description, coreValue.parent_id),
      ]);
    });
  }, [props.coreValueList]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ paddingRight: "10px" }}>Sr No</TableCell>
            <TableCell align="left">CoreValue</TableCell>
            <TableCell align="left">Description</TableCell>
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
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}