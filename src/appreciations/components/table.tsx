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

interface Data {
  id: number;
  description: string;
  sender: string;
  senderDesignation: string;
  receiver: string;
  receiverDesignation: string;
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
  senderDesignation: string,
  receiver: string,
  receiverDesignation: string,
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
    senderDesignation,
    receiver,
    receiverDesignation,
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
    id: "senderDesignation",
    numeric: false,
    disablePadding: true,
    label: "Sender Designation",
  },
  {
    id: "receiver",
    numeric: false,
    disablePadding: false,
    label: "Appreciation To",
  },
  {
    id: "receiverDesignation",
    numeric: false,
    disablePadding: false,
    label: "Receiver Designation",
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
  const [headCells, setHeadCells] = useState<HeadCell[]>(DefaultCells);

  useEffect(() => {
    setHeadCells(DefaultCells);
    if (props.filter === "reported") {
      reportedColumns?.forEach((item) => {
        console.log("In reported columns map");
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
            align={headCell.numeric ? "right" : "left"}
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

        {props.filter === "reported" ? (
          <TableCell align="right">Delete</TableCell>
        ) : (
          <TableCell></TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  setFilter: (value: string | ((prevVar: string) => string)) => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
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

      <Tooltip title="Filter list">
        <AppreciationToggleButton setFilter={props.setFilter} />
      </Tooltip>
    </Toolbar>
  );
}
export default function AppreciationTable(props: IPropsTable) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("date");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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

      console.log("is_valid -> ", item.is_valid);

      return setRows((prevData) => [
        ...prevData,
        createData(
          updatedItem.id,
          updatedItem.description,
          updatedItem.sender_first_name + " " + updatedItem.sender_last_name,
          updatedItem.sender_designation,
          updatedItem.receiver_first_name +
            " " +
            updatedItem.receiver_last_name,
          updatedItem.receiver_designation,
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

  // const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
  //   const selectedIndex = selected.indexOf(id);
  //   let newSelected: readonly number[] = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
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
        <EnhancedTableToolbar
          numSelected={selected.length}
          setFilter={props.setFilter}
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
                    // onClick={(event) => handleClick(event, row.id)}
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
                    <TableCell align="right">{row.senderDesignation}</TableCell>
                    <TableCell align="right">{row.receiver}</TableCell>
                    <TableCell align="right">
                      {row.receiverDesignation}
                    </TableCell>
                    <TableCell align="right">{row.coreValue}</TableCell>
                    <TableCell align="right">{row.rewardPoints}</TableCell>
                    <TableCell align="right">
                      {row.date == undefined
                        ? row.date
                        : new Date(row.date).toLocaleString()}
                    </TableCell>
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
                            <IconButton>
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
                    {/* <TableCell align="right">{row.reportedBy}</TableCell>
                    <TableCell align="right">{row.reportingComment}</TableCell>
                    <TableCell align="right">
                      {row.reportedAt == undefined
                        ? row.reportedAt
                        : new Date(row.reportedAt).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">{row.moderatedBy}</TableCell>
                    <TableCell align="right">{row.moderatorComment}</TableCell> */}
                    {/* {row.isValid ? (
                      <TableCell align="right" padding="checkbox">
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    ) : (
                      <></>
                    )} */}
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
          rowsPerPageOptions={[5, 10, 25]}
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
