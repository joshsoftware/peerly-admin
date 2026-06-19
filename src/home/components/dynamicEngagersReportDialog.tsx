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
import { useLazyDynamicEngagersReportQuery } from '../../appreciations/apiSlice';
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
  // Display label as a range, e.g., "2026-2027"
  label: string;
  // The starting year of the range
  startYear: number;
}

// Simple quarter names without month details
const QUARTER_LABELS: Record<number, string> = {
  1: 'Q1',
  2: 'Q2',
  3: 'Q3',
  4: 'Q4',
};

function getQuarterOptions(year: number): QuarterOption[] {
  return Object.entries(QUARTER_LABELS).map(([q, name]) => ({
    label: name,
    quarter: Number(q),
  }));
}

// Returns only quarters that have completed for the given start year (e.g., 2026)
function getAvailableQuarterOptions(startYear: number): QuarterOption[] {
  const now = new Date();
  return Object.entries(QUARTER_LABELS)
    .map(([q, name]) => ({ label: name, quarter: Number(q) }))
    .filter((q) => {
      // Quarter end date: month = quarter * 3, day 0 gives last day of previous month
      const quarterEnd = new Date(startYear, q.quarter * 3, 0);
      return quarterEnd < now;
    });
}

function getYearOptions(startYear: number): YearOption[] {
  const now = new Date();
  const currentYear = now.getFullYear();
  const options: YearOption[] = [];
  for (let y = startYear; y <= currentYear; y++) {
    options.push({ label: `${y}-${y + 1}`, startYear: y });
  }
  return options;
}

export default function DynamicEngagersReportDialog(props: IProps) {
  const authToken = useSelector((state: RootState) => state.loginStore.authToken);
  const [selectedQuarterKey, setSelectedQuarterKey] = useState<string>('');
  const [selectedYearKey, setSelectedYearKey] = useState<string>('');
  const [fetchReport, { isFetching }] = useLazyDynamicEngagersReportQuery();

  const years = useMemo(() => getYearOptions(2024), []); // START_YEAR same as backend constant
  const quarterOptions = selectedYearKey ? getAvailableQuarterOptions(parseInt(selectedYearKey)) : [];

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
        a.download = `dynamic_engagers_report_Q${quarter}_${year}.xlsx`;
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
        <DialogTitle>Download Dynamic Engagers Report</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Select a quarter and year to download the Dynamic Engagers report.
          </DialogContentText>
          <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={selectedYearKey}
              label="Year"
              onChange={(e) => setSelectedYearKey(e.target.value as string)}
            >
              {years.map((y) => (
                <MenuItem key={y.startYear} value={String(y.startYear)}>
                  {y.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
            <InputLabel id="quarter-select-label">Quarter</InputLabel>
            <Select
              labelId="quarter-select-label"
              id="quarter-select"
              value={selectedQuarterKey}
              label="Quarter"
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
