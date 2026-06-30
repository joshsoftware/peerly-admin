import {
  useGetAppreciationsQuery,
  useGetReportedAppreciationsQuery,
} from "./apiSlice";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import PermanentDrawerLeft from "../permanentSidebar";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./appreciations.css"
import AppreciationTable from "./components/appreciationTable";
import ReportedAppreciationTable from "./components/reportedAppreciationTable";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function AppTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const authToken = useSelector(
    (state: RootState) => state.loginStore.authToken
  );

  // Quarter/year filter state for the Appreciations tab
  const [apprQuarter, setApprQuarter] = useState<number | undefined>(undefined);
  const [apprYear, setApprYear] = useState<number | undefined>(undefined);

  // Quarter/year filter state for the Reported Appreciations tab
  const [repApprQuarter, setRepApprQuarter] = useState<number | undefined>(undefined);
  const [repApprYear, setRepApprYear] = useState<number | undefined>(undefined);

  const { data: appreciations, isError: listAppreciationsError } =
    useGetAppreciationsQuery({
      page: 1,
      page_size: 1000,
      authToken: authToken,
      // Only pass when both are set; otherwise the backend returns all records
      quarter: apprQuarter,
      year: apprYear,
    });

  const {
    data: reportedAppreciations,
    isError: listReportedAppreciationsError,
  } = useGetReportedAppreciationsQuery({
    authToken: authToken,
    quarter: repApprQuarter,
    year: repApprYear,
  });

  useEffect(() => {
    console.log("authtoken -> ", authToken);
    if (authToken === "") {
      navigate("/login");
    } else {
      navigate("/appreciations");
    }
  }, [authToken]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={(_,number)=>handleChange(number)}
          aria-label="basic tabs example"
        >
          <Tab label="Appreciations" {...a11yProps(0)} />
          <Tab label="Reported Appreciations" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {listAppreciationsError || listReportedAppreciationsError ? (
          <h1>Error</h1>
        ) : (
          <AppreciationTable
            response={appreciations?.data.appreciations}
            onFilterChange={(quarter, year) => {
              setApprQuarter(quarter);
              setApprYear(year);
            }}
          />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {!listReportedAppreciationsError ? (
          <ReportedAppreciationTable
            response={reportedAppreciations?.data.appreciations}
            onFilterChange={(quarter, year) => {
              setRepApprQuarter(quarter);
              setRepApprYear(year);
            }}
          />
        ) : (
          <></>
        )}
      </CustomTabPanel>
    </Box>
  );
}

const Appreciations = () => {
  return <PermanentDrawerLeft component={<AppTabs />} />;
};

export default Appreciations;