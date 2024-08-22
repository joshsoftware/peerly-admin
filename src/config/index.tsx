import QuaterTable from "./components/quater";
import { useGetGradesQuery, useGetOrgConfigQuery } from "./apiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import GradesTable from "./components/grades";
import OrgConfigTable from "./components/orgConfig";
import EditRenewalFreqDialog from "./components/editRenewalFreqDialog";
import { useEffect, useState } from "react";
import EditGradeDialog from "./components/editGradeDialogue";
import { useNavigate } from "react-router-dom";
import PermanentDrawerLeft from "../permanentSidebar";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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

export function ConfigTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const authToken = useSelector(
    (state: RootState) => state.loginStore.authToken
  );
  const { data: gradesResp, isError: listGradesError } = useGetGradesQuery({
    authToken: authToken,
  });
  const { data: orgConfigResp, isError: getOrgConfigError } =
    useGetOrgConfigQuery({
      authToken: authToken,
    });
  const [openEditFrequency, setOpenEditFrequency] = useState<boolean>(false);
  const [openEditGrade, setOpenEditGrade] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  useEffect(() => {
    console.log("authtoken -> ", authToken);
    if (authToken === "") {
      navigate("/login");
    } else {
      navigate("/config");
    }
  }, [authToken]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Quaters" {...a11yProps(0)} />
          <Tab label="Grades" {...a11yProps(1)} />
          <Tab label="Org Config" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <QuaterTable />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {!listGradesError ? (
          <GradesTable
            gradesList={gradesResp?.data}
            setOpen={setOpenEditGrade}
            id={id}
            setId={setId}
          />
        ) : (
          <></>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {!getOrgConfigError ? (
          <OrgConfigTable
            orgConfig={orgConfigResp?.data}
            setOpen={setOpenEditFrequency}
          />
        ) : (
          <></>
        )}
      </CustomTabPanel>
      <EditRenewalFreqDialog
        open={openEditFrequency}
        setOpen={setOpenEditFrequency}
      />
      <EditGradeDialog
        open={openEditGrade}
        setOpen={setOpenEditGrade}
        id={id}
      />
    </Box>
  );
}

const Config = () => {
  return <PermanentDrawerLeft component={<ConfigTabs />} />;
};

export default Config;