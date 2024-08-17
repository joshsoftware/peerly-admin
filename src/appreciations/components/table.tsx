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
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import { IPropsTable } from "../types";
import AppreciationToggleButton from "./toggleButton";
import DeleteDialog from "./dialogeBox";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import {
  useAppreciationReportQuery,
  useReportedAppreciationReportQuery,
} from "../apiSlice";
import { RootState } from "../../store";

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
  isValid: boolean;
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
  isValid: boolean
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
    isValid,
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
  filter: string;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const reportedColumns: HeadCell[] = [
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
    id: "isValid",
    numeric: false,
    disablePadding: false,
    label: "Delete",
  },
];

const appreciationColumns: HeadCell[] = [
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "Date",
  },
];

const DefaultCells: HeadCell[] = [
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
];

function EnhancedTableHead(props: EnhancedTableProps) {
  const [headCells, setHeadCells] = useState<HeadCell[]>(DefaultCells);

  useEffect(() => {
    setHeadCells(DefaultCells);
    if (props.filter === "reported") {
      reportedColumns?.forEach((item) => {
        return setHeadCells((prevData) => [...prevData, item]);
      });
    } else {
      appreciationColumns?.forEach((item) => {
        return setHeadCells((prevData) => [...prevData, item]);
      });
    }
  }, [props.filter]);
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
              sx={
                props.filter == "reported"
                  ? headCell.id == "isValid" || headCell.id == "rewardPoints"
                    ? { width: "120px" }
                    : { width: "160px" }
                  : {}
              }
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
  filter: string;
  setFilter: (value: string | ((prevVar: string) => string)) => void;
  setPage: (value: number | ((prevVar: number) => number)) => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const authToken = useSelector(
    (state: RootState) => state.loginStore.authToken
  );
  const { data: appreciations, error: appreciationError } =
    useAppreciationReportQuery({ authToken });
  const { data: reportedAppreciations, error: reportedAppreciationError } =
    useReportedAppreciationReportQuery({ authToken });
  const handleClick = () => {
    if (props.filter === "reported") {
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
      } else if (reportedAppreciations) {
        console.error(
          "Error downloading the report:",
          reportedAppreciationError
        );
      }
    } else {
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

      <AppreciationToggleButton
        setFilter={props.setFilter}
        setPage={props.setPage}
      />
    </Toolbar>
  );
}
export default function AppreciationTable(props: IPropsTable) {
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<keyof Data>("date");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [rows, setRows] = useState<Data[]>([]);

  useEffect(() => {
    const data = props.response;
    if (props.filter == "reported") {
      setOrderBy("isValid");
    } else {
      setOrderBy("date");
    }
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
          updatedItem.is_valid
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

  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = (id: number) => {
    setId(id);
    setOpen(true);
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
    <Box
      sx={
        props.filter === "reported"
          ? { width: "83%", position: "fixed" }
          : { width: "100%" }
      }
    >
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          setFilter={props.setFilter}
          setPage={setPage}
          filter={props.filter}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              filter={props.filter}
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

                    {props.filter === "appreciations" ? (
                      <TableCell align="right">
                        {row.date == undefined
                          ? row.date
                          : new Date(row.date).toLocaleString()}
                      </TableCell>
                    ) : (
                      <></>
                    )}
                    {props.filter === "reported" ? (
                      <>
                        <TableCell align="right">{row.reportedBy}</TableCell>
                        <TableCell align="right">
                          {row.reportingComment}
                        </TableCell>
                        <TableCell align="right">
                          {row.reportedAt == undefined
                            ? row.reportedAt
                            : new Date(row.reportedAt).toLocaleString()}
                        </TableCell>
                        <TableCell align="right">{row.moderatedBy}</TableCell>
                        <TableCell align="right">
                          {row.moderatorComment}
                        </TableCell>
                        {row.isValid ? (
                          <TableCell align="right" padding="checkbox">
                            <IconButton onClick={() => handleClickOpen(row.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        ) : (
                          <TableCell></TableCell>
                        )}
                      </>
                    ) : (
                      <></>
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
      <DeleteDialog open={open} setOpen={setOpen} id={id} />
    </Box>
  );
}
