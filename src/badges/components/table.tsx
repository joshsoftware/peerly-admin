import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { badge } from "../types";

function createData(id: number, name: string, reward_points: number) {
  return { id, name, reward_points };
}

interface IProps {
  badgeList: badge[] | undefined;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  id: number;
  setId: (value: number | ((prevVar: number) => number)) => void;
}

export default function BadgesTable(props: IProps) {
  const handleClickOpen = (id: number) => {
    props.setId(id);
    props.setOpen(true);
  };
  const [rows, setRows] = useState<badge[]>([]);
  useEffect(() => {
    setRows([]);
    props.badgeList?.map((badge) => {
      setRows((prevData) => [
        ...prevData,
        createData(badge.id, badge.name, badge.reward_points),
      ]);
    });
  }, [props.badgeList]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ paddingRight: "10px" }}>Sr No</TableCell>
            <TableCell align="right">Badge</TableCell>
            <TableCell align="right">Reward Points</TableCell>
            <TableCell align="right"></TableCell>
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
              <TableCell align="right">{row.reward_points}</TableCell>
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
