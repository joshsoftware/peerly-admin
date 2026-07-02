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
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import { IPropsTable } from "../types";
import DeleteDialog from "./deleteDialogueBox";
import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ResolveDialog from "./resolveDialogueBox";
import ReportedAppreciationReportDialog from "./reportedAppreciationReportDialog";

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
    label: "Report",
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
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={headCell.id === "status" ? {width: "60px"} :(headCell.id === "moderatorComment" ? { width: "157px"} : {width: "125px"}) }
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

        <TableCell align="left">Delete</TableCell>
        <TableCell align="left">Resolve</TableCell>
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  /** Currently selected financial year start (e.g. 2025), or undefined for "All" */
  selectedYear: number | undefined;
  /** Currently selected quarter (1–4), or undefined for "All" */
  selectedQuarter: number | undefined;
  onYearChange: (year: number | undefined) => void;
  onQuarterChange: (quarter: number | undefined) => void;
}

// Financial year options starting from 2024
const TOOLBAR_YEARS = Array.from(
  { length: new Date().getFullYear() - 2024 + 1 },
  (_, i) => 2024 + i
);

const QUARTER_NAMES: Record<number, string> = {
  1: 'Q1 (Mar–May)',
  2: 'Q2 (Jun–Aug)',
  3: 'Q3 (Sep–Nov)',
  4: 'Q4 (Dec–Feb)',
};

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { selectedYear, selectedQuarter, onYearChange, onQuarterChange } = props;
  const [reportDialogOpen, setReportDialogOpen] = useState(false);

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          justifyContent: "space-between",
          minHeight: "56px",
          gap: 2,
        }}
      >
        {/* Quarter/year search filters */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="rep-appr-filter-year-label" shrink>Year</InputLabel>
            <Select
              labelId="rep-appr-filter-year-label"
              id="rep-appr-filter-year-select"
              value={selectedYear !== undefined ? String(selectedYear) : ''}
              label="Year"
              onChange={(e) => {
                const val = e.target.value as string;
                onYearChange(val ? Number(val) : undefined);
                // Quarter reset is handled inside handleYearChange via onQuarterChange
              }}
              displayEmpty
            >
              <MenuItem value="">All Years</MenuItem>
              {TOOLBAR_YEARS.map((y) => (
                <MenuItem key={y} value={String(y)}>
                  {`${y}–${y + 1}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" size="small" sx={{ minWidth: 180 }} disabled={!selectedYear}>
            <InputLabel id="rep-appr-filter-quarter-label" shrink>Quarter</InputLabel>
            <Select
              labelId="rep-appr-filter-quarter-label"
              id="rep-appr-filter-quarter-select"
              value={selectedQuarter !== undefined ? String(selectedQuarter) : ''}
              label="Quarter"
              onChange={(e) => {
                const val = e.target.value as string;
                onQuarterChange(val ? Number(val) : undefined);
              }}
              displayEmpty
            >
              <MenuItem value="">All Quarters</MenuItem>
              {Object.entries(QUARTER_NAMES).map(([q, label]) => (
                <MenuItem key={q} value={q}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Button
          sx={{ width: "215px", flexShrink: 0 }}
          variant="outlined"
          onClick={() => setReportDialogOpen(true)}
        >
          Download Report
        </Button>
      </Toolbar>

      {/* Report download dialog — allows selecting quarter/year for the Excel export */}
      <ReportedAppreciationReportDialog open={reportDialogOpen} setOpen={setReportDialogOpen} />
    </>
  );
}

export default function ReportedAppreciationTable(props: IPropsTable & {
  /** Called whenever the quarter/year filter selection changes */
  onFilterChange?: (quarter: number | undefined, year: number | undefined) => void;
}) {
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<keyof Data>("date");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [rows, setRows] = useState<Data[]>([]);
  // Quarter/year filter state — drives both the table display and the parent API query
  const [filterYear, setFilterYear] = useState<number | undefined>(undefined);
  const [filterQuarter, setFilterQuarter] = useState<number | undefined>(undefined);

  const handleYearChange = (year: number | undefined) => {
    setFilterYear(year);
    setFilterQuarter(undefined);
    setPage(0);
    props.onFilterChange?.(undefined, year);
  };

  const handleQuarterChange = (quarter: number | undefined) => {
    setFilterQuarter(quarter);
    setPage(0);
    props.onFilterChange?.(quarter, filterYear);
  };

  useEffect(() => {
    const data = props.response;
    if (!data) {
      setRows([]);
      return;
    }

    const newRows = data.map((item) => {
      const updatedItem = {
        ...item,
        reported_by_first_name: item.reported_by_first_name || "",
        reported_by_last_name: item.reported_by_last_name || "",
        moderated_by_first_name: item.moderated_by_first_name || "",
        moderated_by_last_name: item.moderated_by_last_name || "",
        is_valid: item.is_valid === undefined ? true : item.is_valid,
      };

      return createData(
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
      );
    });
    setRows(newRows);
  }, [props.response]);

  const handleRequestSort = (
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

  const handleChangePage = (newPage: number) => {
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
    <Box sx={{ width: "85%", position: "fixed" }}>
      <Paper sx={{ width: "98%", mb: 2 }}>
        <EnhancedTableToolbar
          selectedYear={filterYear}
          selectedQuarter={filterQuarter}
          onYearChange={handleYearChange}
          onQuarterChange={handleQuarterChange}
        />
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
              onRequestSort={(_,x)=>handleRequestSort(x)}
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
                      align="left"
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
                      align="left"
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
                      align="left"
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
                      align="left"
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
                      align="left"
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
                      align="left"
                      sx={{
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Tooltip
                        title={
                          <p style={{ fontSize: "15px" }}>{row.reportedBy}</p>
                        }
                        sx={{ fontSize: "20px" }}
                        placement="bottom-start"
                      >
                        <span>{row.reportedBy}</span>
                      </Tooltip>
                      
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Tooltip
                        title={
                          <p style={{ fontSize: "15px" }}>{row.reportingComment}</p>
                        }
                        sx={{ fontSize: "20px" }}
                        placement="bottom-start"
                      >
                        <span>{row.reportingComment}</span>
                      </Tooltip>
                      
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Tooltip
                        title={
                          <p style={{ fontSize: "15px" }}>{row.reportedAt == undefined
                            ? row.reportedAt
                            : new Date(row.reportedAt).toLocaleString()}</p>
                        }
                        sx={{ fontSize: "20px" }}
                        placement="bottom-start"
                      >
                        <span>{row.reportedAt == undefined
                        ? row.reportedAt
                        : new Date(row.reportedAt).toLocaleString()}</span>
                      </Tooltip>
                   
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {" "}
                      <Tooltip
                        title={
                          <p style={{ fontSize: "15px" }}>{row.moderatedBy}</p>
                        }
                        sx={{ fontSize: "20px" }}
                        placement="bottom-start"
                      >
                        <span>{row.moderatedBy}</span>
                      </Tooltip>
                      
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Tooltip
                        title={
                          <p style={{ fontSize: "15px" }}>{row.moderatorComment}</p>
                        }
                        sx={{ fontSize: "20px" }}
                        placement="bottom-start"
                      >
                        <span>{row.moderatorComment}</span>
                      </Tooltip>
                      
                    </TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                    {row.status === "reported" ? (
                      <TableCell align="center" padding="checkbox">
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
                      <TableCell align="center" padding="checkbox">
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
          rowsPerPageOptions={[2, 5, 7]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_,newPage)=>handleChangePage(newPage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <DeleteDialog open={openDelete} setOpen={setOpenDelete} id={id} />
      <ResolveDialog open={openResolve} setOpen={setOpenResolve} id={id} />
    </Box>
  );
}