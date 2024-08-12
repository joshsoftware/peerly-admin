import { useSelector } from "react-redux";
import { useGetAppreciationsQuery } from "../appreciations/apiSlice";
import PermanentDrawerLeft from "../permanentSidebar";
import AppreciationCountCard from "./components/appreciationCountCard";
import { RootState } from "../store";
import NotificationCard from "./components/sendNotificationCard";
import DownloadExcelCard from "./components/downloadExcel";

const HomeComponent = () => {
  const authToken = useSelector(
    (state: RootState) => state.loginStore.authToken
  );
  const { data: appreciations, isError: listAppreciationsError } =
    useGetAppreciationsQuery({
      page: 1,
      page_size: 10,
      authToken: authToken,
    });
  return (
    <>
      {!listAppreciationsError ? (
        <AppreciationCountCard
          count={appreciations?.data.metadata.total_records}
        />
      ) : (
        <AppreciationCountCard count={0} />
      )}
      <NotificationCard />
      <DownloadExcelCard />
    </>
  );
};

const Home = () => {
  return <PermanentDrawerLeft component={<HomeComponent />} />;
};

export default Home;
