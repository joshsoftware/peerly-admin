import Header from "../header"
import PermanentDrawerLeft from "../permanentSidebar"

export function HomeTab() {
    return(
        <>
        <Header/>
        </>
    )
}


const Home = () => {
    return <PermanentDrawerLeft component={<HomeTab />} />;
  };

export default Home
