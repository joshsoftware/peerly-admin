import { Typography } from "@mui/material";
import QuaterTable from "./components/quater";
import TemporaryDrawer from "../sideBar";
import { useGetGradesQuery, useGetOrgConfigQuery } from "./apiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import GradesTable from "./components/grades";
import OrgConfigTable from "./components/orgConfig";
import EditRenewalFreqDialog from "./components/editRenewalFreqDialog";
import { useState } from "react";

const Config = () => {
  const authToken = useSelector((state: RootState) => state.loginStore.authToken);
  const {data: gradesResp, isError: listGradesError} = useGetGradesQuery({
    authToken: authToken
  });
  const {data: orgConfigResp, isError: getOrgConfigError} = useGetOrgConfigQuery({
    authToken: authToken
  });
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <TemporaryDrawer />
      <Typography variant="h6">Quaters</Typography>
      <QuaterTable />
      <Typography pt={2} variant="h6">Grades</Typography>
      {!listGradesError ? <GradesTable gradesList={gradesResp?.data}/> : <></>}
      <Typography pt={2} variant="h6">Organisation Config</Typography>
      {!getOrgConfigError ? <OrgConfigTable orgConfig={orgConfigResp?.data} setOpen={setOpen}/> : <></>}
      <EditRenewalFreqDialog open={open} setOpen={setOpen}/>
    </>
  );
};

export default Config;
