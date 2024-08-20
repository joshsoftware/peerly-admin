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
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import { IPropsTable } from "../types";
import DeleteDialog from "./deleteDialogeBox";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import {
  useReportedAppreciationReportQuery,
} from "../apiSlice";
import { RootState } from "../../store";
import ResolveDialog from "./resolveDialogeBox";

interface Data {
  id: number;
  description: string;
  sender: string;
  receiver: string;
  coreValue: string;
  rewardPoints: number;
  date: number;
  reportedBy: string;
  reportingComment: string;
  reportedAt: number;
  moderatedBy: string;
  moderatorComment: string;
  status: string;
}

function createData(
  id: number,
  description: string,
  sender: string,
  receiver: string,
  coreValue: string,
  rewardPoints: number,
  date: number,
  reportedBy: string,
  reportingComment: string,
  reportedAt: number,
  moderatedBy: string,
  moderatorComment: string,
  status: string
): Data {
  return {
    id,
    description,
    sender,
    receiver,
    coreValue,
    rewardPoints,
    date,
    reportedBy,
    reportingComment,
    reportedAt,
    moderatedBy,
    moderatorComment,
    status,
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
    id: "reportedBy",
    numeric: false,
    disablePadding: false,
    label: "Reported By",
  },
  {
    id: "reportingComment",
    numeric: false,
    disablePadding: false,
    label: "Reporting Comment",
  },
  {
    id: "reportedAt",
    numeric: true,
    disablePadding: false,
    label: "Reported At",
  },
  {
    id: "moderatedBy",
    numeric: false,
    disablePadding: false,
    label: "Moderated By",
  },
  {
    id: "moderatorComment",
    numeric: false,
    disablePadding: false,
    label: "Moderator Comment",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
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

        <TableCell>Delete</TableCell>
        <TableCell>Resolve</TableCell>
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
  const { data: reportedAppreciations, error: reportedAppreciationError } =
    useReportedAppreciationReportQuery({ authToken });
  const handleClick = () => {
    if (reportedAppreciations) {
      // Create a URL for the Blob
      const blob = new Blob([reportedAppreciations], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create a link element and trigger a download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ReportedAppreciaitionsReport.xlsx"; // Set the desired filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } else if (reportedAppreciationError) {
      console.error("Error downloading the report:", reportedAppreciationError);
    }
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Appreciations
      </Typography>

      <Button sx={{ width: "fit-content" }} onClick={handleClick}>
        Download Report
      </Button>
    </Toolbar>
  );
}
export default function ReportedAppreciationTable(props: IPropsTable) {
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<keyof Data>("date");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [rows, setRows] = useState<Data[]>([]);

  useEffect(() => {
    const data = props.response;
    setRows([]);

    data?.map((item) => {
      const updatedItem = {
        ...item,
        reported_by_first_name: item.reported_by_first_name || "",
        reported_by_last_name: item.reported_by_last_name || "",
        moderated_by_first_name: item.moderated_by_first_name || "",
        moderated_by_last_name: item.moderated_by_last_name || "",
        is_valid: item.is_valid === undefined ? true : item.is_valid,
      };

      return setRows((prevData) => [
        ...prevData,
        createData(
          updatedItem.id,
          updatedItem.description,
          updatedItem.sender_first_name + " " + updatedItem.sender_last_name,
          updatedItem.receiver_first_name +
            " " +
            updatedItem.receiver_last_name,
          updatedItem.core_value_name,
          updatedItem.total_reward_points,
          updatedItem.created_at,
          updatedItem.reported_by_first_name +
            " " +
            updatedItem.reported_by_last_name,
          updatedItem.reporting_comment,
          updatedItem.reported_at,
          updatedItem.moderated_by_first_name +
            " " +
            updatedItem.moderated_by_last_name,
          updatedItem.moderator_comment,
          updatedItem.status
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

  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openResolve, setOpenResolve] = useState<boolean>(false);

  const handleClickOpenDelete = (id: number) => {
    setId(id);
    setOpenDelete(true);
  };

  const handleClickOpenResolve = (id: number) => {
    setId(id);
    setOpenResolve(true);
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

  const [id, setId] = useState<number>(0);

  return (
    <Box sx={{ width: "83%", position: "fixed" }}>
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
                    >
                      {row.description}
                    </TableCell>
                    <TableCell align="right">{row.sender}</TableCell>
                    <TableCell align="right">{row.receiver}</TableCell>
                    <TableCell align="right">{row.coreValue}</TableCell>
                    <TableCell align="right">{row.rewardPoints}</TableCell>
                    <TableCell align="right">{row.reportedBy}</TableCell>
                    <TableCell align="right">{row.reportingComment}</TableCell>
                    <TableCell align="right">
                      {row.reportedAt == undefined
                        ? row.reportedAt
                        : new Date(row.reportedAt).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">{row.moderatedBy}</TableCell>
                    <TableCell align="right">{row.moderatorComment}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    {row.status === "reported" ? (
                      <TableCell align="right" padding="checkbox">
                        <IconButton
                          onClick={() => handleClickOpenDelete(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    ) : (
                      <>
                        <TableCell></TableCell>
                      </>
                    )}
                    {row.status === "reported" ? (
                      <TableCell align="left" padding="checkbox">
                        <IconButton
                          onClick={() => handleClickOpenResolve(row.id)}
                        >
                          <CheckIcon />
                        </IconButton>
                      </TableCell>
                    ) : (
                      <>
                        <TableCell></TableCell>
                      </>
                    )}
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
          rowsPerPageOptions={[5, 8]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <DeleteDialog open={openDelete} setOpen={setOpenDelete} id={id} />
      <ResolveDialog open={openResolve} setOpen={setOpenResolve} id={id} />
    </Box>
  );
}
