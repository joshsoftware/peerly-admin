import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PermanentDrawerLeft from "../permanentSidebar";
import CoreValuesTable from "./components/table";
import { useGetCoreValuesQuery } from "./apiSlice";

const CoreValuesComponent = () => {
  const navigate = useNavigate()
  const authToken = useSelector((state: RootState) => state.loginStore.authToken);
  const {data: coreValueResp, isError: listCoreValuesError} = useGetCoreValuesQuery({
    authToken: authToken
  });
  useEffect(()=>{
    console.log("authtoken -> ",authToken)
    if(authToken === ""){
      navigate("/login")
    }else{
      navigate("/core_values")
    }
  },[authToken])
  return (
    <>
      <Typography pt={2} variant="h6">Core Values</Typography>
      {!listCoreValuesError ? <CoreValuesTable coreValueList={coreValueResp?.data} /> : <></>}
    </>
  );
};

const CoreValues = () => {
  return(
    <PermanentDrawerLeft component={<CoreValuesComponent/>} />
  )
}

export default CoreValues;
