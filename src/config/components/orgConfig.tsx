import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { orgConfig } from "../types";
import { useEffect, useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";

function createData(
  id: number | undefined,
  reward_quota_renewal_frequency: number | undefined,
  updated_by: string | undefined
) {
  return { id, reward_quota_renewal_frequency, updated_by };
}

interface IProps {
  orgConfig: orgConfig | undefined;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

export default function OrgConfigTable(props: IProps) {
  const handleClickOpen = () => {
    props.setOpen(true);
  };
  const [row, setRow] = useState<orgConfig>();
  useEffect(() => {
    setRow(
      createData(
        props.orgConfig?.id,
        props.orgConfig?.reward_quota_renewal_frequency,
        props.orgConfig?.updated_by,
      )
    );
  }, [props.orgConfig]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Reward quota renewal frequency
            </TableCell>
            <TableCell align="right">
              {row != undefined &&
              row.reward_quota_renewal_frequency != undefined &&
              row?.reward_quota_renewal_frequency <= 1
                ? `${row?.reward_quota_renewal_frequency} month`
                : `${row?.reward_quota_renewal_frequency} months`}
            </TableCell>
            {/* <TableCell align="right" onClick={handleClickOpen} sx={{cursor:"pointer"}}>
              <BorderColorIcon />
            </TableCell> */}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
