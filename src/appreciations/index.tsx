import AppreciationTable from "./components/table";
import { useGetAppreciationsQuery, useGetReportedAppreciationsQuery } from "./apiSlice";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";
import PermanentDrawerLeft from "../permanentSidebar";

const Appreciations = () => {
  const navigate = useNavigate()
  const authToken = useSelector((state: RootState) => state.loginStore.authToken);
  const { data: appreciations, isError: listAppreciationsError } = useGetAppreciationsQuery({
    page: 1,
    page_size: 10,
    authToken: authToken
  });
  const { data: reportedAppreciations, isError: listReportedAppreciationsError} = useGetReportedAppreciationsQuery({authToken: authToken})
  const [filter, setFilter] = useState<string>("appreciations")

  useEffect(()=>{
    console.log("authtoken -> ",authToken)
    if(authToken === ""){
      navigate("/login")
    }else{
      navigate("/appreciations")
    }
  },[authToken])

  const response = useMemo(() => {
    if(filter == "appreciations"){
      return appreciations?.data.appreciations
    }
    else if(filter == "reported"){
      return reportedAppreciations?.data.appreciations
    }

  },[filter, appreciations?.data.appreciations, reportedAppreciations?.data.appreciations])

  return (
    <>
      {/* <TemporaryDrawer/> */}
      {listAppreciationsError || listReportedAppreciationsError ? (
            <h1>Error</h1>
      ) : (
        <PermanentDrawerLeft component={<AppreciationTable response={response} setFilter={setFilter} filter={filter} />} />
        
      )}
    </>
  );
};

export default Appreciations;
