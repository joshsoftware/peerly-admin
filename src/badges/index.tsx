import { Typography } from "@mui/material";
import TemporaryDrawer from "../sideBar";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetBadgesQuery } from "./apiSlice";
import BadgesTable from "./components/table";
import EditBadgeDialog from "./components/dialogueBox";
import PermanentDrawerLeft from "../permanentSidebar";

const BadgesComponent = () => {
  const navigate = useNavigate()
  const authToken = useSelector((state: RootState) => state.loginStore.authToken);
  const {data: badgesResp, isError: listBadgesError} = useGetBadgesQuery({
    authToken: authToken
  });
  const [open, setOpen] = useState<boolean>(false);
  const [id,setId] = useState<number>(0);
  useEffect(()=>{
    console.log("authtoken -> ",authToken)
    if(authToken === ""){
      navigate("/login")
    }else{
      navigate("/badges")
    }
  },[authToken])
  return (
    <>
      <Typography pt={2} variant="h6">Badges</Typography>
      {!listBadgesError ? <BadgesTable badgeList={badgesResp?.data} setOpen={setOpen} id={id} setId={setId}/> : <></>}
     
      <EditBadgeDialog open={open} setOpen={setOpen} id={id}/>
    </>
  );
};

const Badges = () => {
  return(
    <PermanentDrawerLeft component={<BadgesComponent/>} />
  )
}

export default Badges;
