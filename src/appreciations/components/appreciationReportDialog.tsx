import * as React from 'react';
import { useState, useMemo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useLazyAppreciationReportQuery } from '../apiSlice';
import { toast } from 'react-toastify';

interface IProps {
  open: boolean;
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

interface QuarterOption {
  label: string;
  quarter: number;
}

interface YearOption {
  /** Display label shown in the dropdown, e.g. "2026-2027" */
  label: string;
  /** The starting calendar year of this financial year range */
  startYear: number;
}

// Financial quarter labels (Q1 = Mar–May, Q2 = Jun–Aug, Q3 = Sep–Nov, Q4 = Dec–Feb)
const QUARTER_LABELS: Record<number, string> = {
  1: 'Q1 (Mar–May)',
  2: 'Q2 (Jun–Aug)',
  3: 'Q3 (Sep–Nov)',
  4: 'Q4 (Dec–Feb)',
};

/**
 * Returns the quarters whose end date has already passed for the given start year.
 * Quarter end dates (based on financial quarters):
 *   Q1 ends May 31  → month index 5, day 31
 *   Q2 ends Aug 31  → month index 8, day 31
 *   Q3 ends Nov 30  → month index 11, day 30
 *   Q4 ends Feb 28/29 of startYear+1
 */
function getAvailableQuarterOptions(startYear: number): QuarterOption[] {
  const now = new Date();
  const quarterEndDates: Record<number, Date> = {
    1: new Date(startYear, 5, 1),         // June 1 (exclusive end of Q1)
    2: new Date(startYear, 8, 1),         // Sep 1 (exclusive end of Q2)
    3: new Date(startYear, 11, 1),        // Dec 1 (exclusive end of Q3)
    4: new Date(startYear + 1, 2, 1),     // Mar 1 next year (exclusive end of Q4)
  };
  return Object.entries(QUARTER_LABELS)
    .map(([q, label]) => ({ label, quarter: Number(q) }))
    .filter(({ quarter }) => quarterEndDates[quarter] < now);
}

/** Generates year-range options from the given startYear up to the current calendar year. */
function getYearOptions(startYear: number): YearOption[] {
  const currentYear = new Date().getFullYear();
  const options: YearOption[] = [];
  for (let y = startYear; y <= currentYear; y++) {
    options.push({ label: `${y}-${y + 1}`, startYear: y });
  }
  return options;
}

export default function AppreciationReportDialog(props: IProps) {
  const authToken = useSelector((state: RootState) => state.loginStore.authToken);
  const [selectedQuarterKey, setSelectedQuarterKey] = useState<string>('');
  const [selectedYearKey, setSelectedYearKey] = useState<string>('');
  const [fetchReport, { isFetching }] = useLazyAppreciationReportQuery();

  // START_YEAR should match the earliest financial year configured in the backend
  const years = useMemo(() => getYearOptions(2024), []);
  const quarterOptions = selectedYearKey
    ? getAvailableQuarterOptions(parseInt(selectedYearKey, 10))
    : [];

  const handleClose = () => {
    props.setOpen(false);
    setSelectedQuarterKey('');
    setSelectedYearKey('');
  };

  const handleDownload = async () => {
    if (!selectedQuarterKey || !selectedYearKey) {
      toast.warn('Please select both quarter and year.');
      return;
    }
    const quarter = parseInt(selectedQuarterKey, 10);
    const year = parseInt(selectedYearKey, 10);
    const quarterLabel = QUARTER_LABELS[quarter];
    try {
      const result = await fetchReport({ quarter, year, authToken });
      if (result.data) {
        const blob = new Blob([result.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `appreciation_report_Q${quarter}_${year}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        toast.success(`Report downloaded for ${quarterLabel} ${year}`);
        handleClose();
      } else if (result.error) {
        toast.error('Failed to download the report. Please try again.');
      }
    } catch {
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Download Appreciations Report</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Select a year and quarter to download the Appreciations report.
          </DialogContentText>
          <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
            <InputLabel id="appr-report-year-label">Year</InputLabel>
            <Select
              labelId="appr-report-year-label"
              id="appr-report-year-select"
              value={selectedYearKey}
              label="Year"
              onChange={(e) => {
                setSelectedYearKey(e.target.value as string);
                // Reset quarter when year changes so stale options are cleared
                setSelectedQuarterKey('');
              }}
            >
              {years.map((y) => (
                <MenuItem key={y.startYear} value={String(y.startYear)}>
                  {y.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
            <InputLabel id="appr-report-quarter-label">Quarter</InputLabel>
            <Select
              labelId="appr-report-quarter-label"
              id="appr-report-quarter-select"
              value={selectedQuarterKey}
              label="Quarter"
              disabled={!selectedYearKey}
              onChange={(e) => setSelectedQuarterKey(e.target.value as string)}
            >
              {quarterOptions.map((q) => (
                <MenuItem key={q.quarter} value={String(q.quarter)}>
                  {q.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleDownload}
            disabled={!selectedQuarterKey || !selectedYearKey || isFetching}
            variant="contained"
          >
            {isFetching ? 'Downloading...' : 'Download'}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
