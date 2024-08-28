import { useSelector } from "react-redux";
import { useGetAppreciationsQuery } from "../appreciations/apiSlice";
import PermanentDrawerLeft from "../permanentSidebar";
import AppreciationCountCard from "./components/appreciationCountCard";
import { RootState } from "../store";
import NotificationCard from "./components/sendNotificationCard";
// import DownloadExcelCard from "./components/downloadExcel";
import { useEffect, useState } from "react";
import NotifiyAllDialog from "./components/notifyAllDilogBox";
import NotifiyUserDialog from "./components/notifyUserDialogBox";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const [openNotifyAll, setOpenNotifyAll] = useState(false);
  const [openNotifyUser, setOpenNotifyUser] = useState(false);

  const authToken = useSelector(
    (state: RootState) => state.loginStore.authToken
  );
  const { data: appreciations, isError: listAppreciationsError } =
    useGetAppreciationsQuery({
      page: 1,
      page_size: 10,
      authToken: authToken,
    });
  const navigate = useNavigate();
  useEffect(() => {
    console.log("authtoken -> ", authToken);
    if (authToken === "") {
      navigate("/peerly-admin/login");
    } else {
      navigate("/peerly-admin/");
    }
  }, [authToken]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        {!listAppreciationsError ? (
          <AppreciationCountCard
            count={appreciations?.data.metadata.total_records}
          />
        ) : (
          <AppreciationCountCard count={0} />
        )}
        <NotificationCard
          setOpenNotifyAll={setOpenNotifyAll}
          setOpenNotifyUser={setOpenNotifyUser}
        />
      </Box>
      <NotifiyAllDialog open={openNotifyAll} setOpen={setOpenNotifyAll} />
      <NotifiyUserDialog open={openNotifyUser} setOpen={setOpenNotifyUser} />
    </>
  );
};

const Home = () => {
  return <PermanentDrawerLeft component={<HomeComponent />} />;
};

export default Home;