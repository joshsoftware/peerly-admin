import { Typography } from "@mui/material";
import QuaterTable from "./components/quater";
import TemporaryDrawer from "../sideBar";
import { useGetGradesQuery, useGetOrgConfigQuery } from "./apiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import GradesTable from "./components/grades";
import OrgConfigTable from "./components/orgConfig";
import EditRenewalFreqDialog from "./components/editRenewalFreqDialog";
import { useEffect, useState } from "react";
import EditGradeDialog from "./components/editGradeDialogue";
import { useNavigate } from "react-router-dom";

const Config = () => {
  const navigate = useNavigate()
  const authToken = useSelector((state: RootState) => state.loginStore.authToken);
  const {data: gradesResp, isError: listGradesError} = useGetGradesQuery({
    authToken: authToken
  });
  const {data: orgConfigResp, isError: getOrgConfigError} = useGetOrgConfigQuery({
    authToken: authToken
  });
  const [openEditFrequency, setOpenEditFrequency] = useState<boolean>(false);
  const [openEditGrade, setOpenEditGrade] = useState<boolean>(false);
  const [id,setId] = useState<number>(0);
  useEffect(()=>{
    console.log("authtoken -> ",authToken)
    if(authToken === ""){
      navigate("/login")
    }else{
      navigate("/config")
    }
  },[authToken])
  return (
    <>
      <TemporaryDrawer />
      <Typography variant="h6">Quaters</Typography>
      <QuaterTable />
      <Typography pt={2} variant="h6">Grades</Typography>
      {!listGradesError ? <GradesTable gradesList={gradesResp?.data} setOpen={setOpenEditGrade} id={id} setId={setId}/> : <></>}
      <Typography pt={2} variant="h6">Organisation Config</Typography>
      {!getOrgConfigError ? <OrgConfigTable orgConfig={orgConfigResp?.data} setOpen={setOpenEditFrequency}/> : <></>}
      <EditRenewalFreqDialog open={openEditFrequency} setOpen={setOpenEditFrequency}/>
      <EditGradeDialog open={openEditGrade} setOpen={setOpenEditGrade} id={id}/>
    </>
  );
};

export default Config;
