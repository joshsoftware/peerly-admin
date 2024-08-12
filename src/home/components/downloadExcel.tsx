import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useState } from "react";
import { useDownloadReportQuery } from "../apiSlice";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function DownloadExcelCard() {
  const authToken = useSelector((state: RootState) => state.loginStore.authToken);
  const { data, error, isLoading } = useDownloadReportQuery({authToken});
  const handleClick = () => {
    console.log("data -> ",data)
    if (data) {
      // Create a URL for the Blob
      const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

      // Create a link element and trigger a download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report.xlsx"; // Set the desired filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } else if (error) {
      console.error("Error downloading the report:", error);
    }
  };
  return (
    <Box sx={{ minWidth: 160 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="body1">
            Download report for the quarter in excel format
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClick}>
            Download Report
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
