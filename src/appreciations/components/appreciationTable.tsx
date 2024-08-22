import { useEffect, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { IPropsTable } from "../types";
import { Button, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { useAppreciationReportQuery } from "../apiSlice";
import { RootState } from "../../store";

interface Data {
  id: number;
  description: string;
  sender: string;
  receiver: string;
  coreValue: string;
  rewardPoints: number;
  date: number;
}

function createData(
  id: number,
  description: string,
  sender: string,
  receiver: string,
  coreValue: string,
  rewardPoints: number,
  date: number
): Data {
  return {
    id,
    description,
    sender,
    receiver,
    coreValue,
    rewardPoints,
    date,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | boolean },
  b: { [key in Key]: number | string | boolean }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const headCells: HeadCell[] = [
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "sender",
    numeric: false,
    disablePadding: true,
    label: "Appreciated By",
  },
  {
    id: "receiver",
    numeric: false,
    disablePadding: false,
    label: "Appreciation To",
  },
  {
    id: "coreValue",
    numeric: false,
    disablePadding: false,
    label: "Core Value",
  },
  {
    id: "rewardPoints",
    numeric: true,
    disablePadding: false,
    label: "Reward Points",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Date",
  },
];

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id == "description" ? "left" : "right"}
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  setPage: (value: number | ((prevVar: number) => number)) => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const authToken = useSelector(
    (state: RootState) => state.loginStore.authToken
  );
  const { data: appreciations, error: appreciationError } =
    useAppreciationReportQuery({ authToken });
  const handleClick = () => {
    if (appreciations) {
      // Create a URL for the Blob
      const blob = new Blob([appreciations], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a link element and trigger a download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "AppreciationsReport.xlsx"; // Set the desired filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } else if (appreciationError) {
      console.error("Error downloading the report:", appreciationError);
    }
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        justifyContent: "end",
        minHeight: "40px"
      }}
    >
      {/* <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Appreciations
      </Typography> */}

      <Button sx={{ width: "215px" }} onClick={handleClick}>
        Download Report
      </Button>
    </Toolbar>
  );
}
export default function AppreciationTable(props: IPropsTable) {
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<keyof Data>("date");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [rows, setRows] = useState<Data[]>([]);

  useEffect(() => {
    const data = props.response;
    setRows([]);

    data?.map((item) => {
      return setRows((prevData) => [
        ...prevData,
        createData(
          item.id,
          item.description,
          item.sender_first_name + " " + item.sender_last_name,
          item.receiver_first_name + " " + item.receiver_last_name,
          item.core_value_name,
          item.total_reward_points,
          item.created_at
        ),
      ]);
    });
  }, [props.response]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} setPage={setPage} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                      sx={{
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Tooltip
                        title={
                          <p style={{ fontSize: "15px" }}>{row.description}</p>
                        }
                        sx={{ fontSize: "20px" }}
                        placement="bottom-start"
                      >
                        <span>{row.description}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Tooltip
                        title={
                          <p style={{ fontSize: "15px" }}>{row.sender}</p>
                        }
                        sx={{ fontSize: "20px" }}
                        placement="bottom-start"
                      >
                        <span>{row.sender}</span>
                      </Tooltip>
                      
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Tooltip
                        title={
                          <p style={{ fontSize: "15px" }}>{row.receiver}</p>
                        }
                        sx={{ fontSize: "20px" }}
                        placement="bottom-start"
                      >
                        <span>{row.receiver}</span>
                      </Tooltip>
                      
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Tooltip
                        title={
                          <p style={{ fontSize: "15px" }}>{row.coreValue}</p>
                        }
                        sx={{ fontSize: "20px" }}
                        placement="bottom-start"
                      >
                        <span>{row.coreValue}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Tooltip
                        title={
                          <p style={{ fontSize: "15px" }}>{row.rewardPoints}</p>
                        }
                        sx={{ fontSize: "20px" }}
                        placement="bottom-start"
                      >
                        <span>{row.rewardPoints}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Tooltip
                        title={
                          <p style={{ fontSize: "15px" }}>
                            {row.date == undefined
                              ? row.date
                              : new Date(row.date).toLocaleString()}
                          </p>
                        }
                        sx={{ fontSize: "20px" }}
                        placement="bottom-start"
                      >
                        <span>
                          {row.date == undefined
                            ? row.date
                            : new Date(row.date).toLocaleString()}
                        </span>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2, 5, 7]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
