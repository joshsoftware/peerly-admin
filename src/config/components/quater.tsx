import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  quaterNo: number,
  startDate: Date,
  endDate: Date,
) {
  return { quaterNo, startDate, endDate};
}

const rows = [
  createData(1,new Date(new Date().getFullYear(), 0, 1),new Date(new Date().getFullYear(), 2, 31)),
  createData(2,new Date(new Date().getFullYear(), 3, 1),new Date(new Date().getFullYear(), 5, 30)),
  createData(3,new Date(new Date().getFullYear(), 6, 1),new Date(new Date().getFullYear(), 8, 31)),
  createData(4,new Date(new Date().getFullYear(), 9, 1),new Date(new Date().getFullYear(), 11, 31))
];

export default function QuaterTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Quater No</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.quaterNo}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.quaterNo}
              </TableCell>
              <TableCell align="right">{row.startDate.toLocaleDateString()}</TableCell>
              <TableCell align="right">{row.endDate.toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
