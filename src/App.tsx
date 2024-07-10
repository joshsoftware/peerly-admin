import { useState } from "react";

import GoldetStarIcon from "./assets/images/icons/golderStar.png";
import ProfilePhoto from "./assets/images/person.png";

import AppreciationCard from "./components/AppreciationCard";
import LeaderboardCard from "./components/LeaderboardCard";
import AppreciationPage from "./pages/AppreciationPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [isDetailsPageVisible, setDetailsPageVisibility] = useState(true);
  const [isProfilePageVisible, setProfilePageVisibility] = useState(false);

  const toggleDetailsPage = () => {
    setProfilePageVisibility(false);
    setDetailsPageVisibility((isDetailsPageVisible) => !isDetailsPageVisible);
  };

  const toggleProfilePage = () => {
    setDetailsPageVisibility(false);
    setProfilePageVisibility((isProfilePageVisible) => !isProfilePageVisible);
  };

  if (isProfilePageVisible) {
    return <ProfilePage onBackArrowClickHandler={toggleDetailsPage} />;
  }
  if (isDetailsPageVisible) {
    return (
      <div>
        {/* header */}
        <div>
          <div className="flex justify-between p-6 ">
            <div className="flex items-center">
              <h1 className="font-semibold text-zinc-950 text-base">Peerly</h1>
            </div>
            <div className="flex items-center relative">
              <div
                onClick={toggleProfilePage}
                className="flex gap-2 p-2 pr-16 bg-gradient-to-b from-[#F1F1F1] to-[#336AF1] border-[#3069F6] border-solid border-2 rounded-3xl text-zinc-50"
              >
                <img src={GoldetStarIcon} className="size-5" />
                <div>2000</div>
                <div className="-z-10 before:absolute before:size-14 before:-top-3 before:-right-2 before:border-[#3069F6] before:border-2 before:rounded-r-full before:rounded-t-full before:rounded-b-full before:bg-zinc-900"></div>
                <div className="absolute size-[52px] -top-[10px] -right-[6px]  rounded-r-full rounded-t-full rounded-b-full bg-zinc-100">
                  <img
                    src={ProfilePhoto}
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center px-6">
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="size-4 text-[#3C3C4399] z-10"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="block ps-10 bg-[#F0F0F0ED] backdrop-blur-md rounded-xl p-2 w-full text-[#3C3C4399] caret-[#3C3C4399] outline-[#3C3C4399]/40 text-sm"
                placeholder="Search Co-Worker"
              />
            </div>
          </div>
        </div>
        {/* Leaderboard Tab */}
        <div className="bg-[#F4F6FF]  mt-4">
          <div className="text-center px-6">
            <ul className="flex text-base font-semibold  text-[#535353] ">
              <li className="me-2">
                <span className="inline-block p-2 border-b-2  rounded-t-lg  text-blue-600 border-blue-600 active">
                  Top 10
                </span>
              </li>
              <li className="me-2">
                <span
                  className="inline-block p-2  border-b-2 border rounded-t-lg  border-transparent"
                  aria-current="page"
                >
                  Active Users
                </span>
              </li>
            </ul>
          </div>
          {/* List Leaderboard */}
          <ul className="flex gap-4 pl-6 mt-4 pb-6 overflow-auto scroll-smooth focus:scroll-auto">
            {/*List Element  */}
            <LeaderboardCard appretiationPoint={500} badgeType="platinum" />
            <LeaderboardCard appretiationPoint={400} badgeType="gold" />
            <LeaderboardCard appretiationPoint={300} badgeType="silver" />
            <LeaderboardCard appretiationPoint={200} badgeType="none" />
            <LeaderboardCard appretiationPoint={100} badgeType="none" />
            <LeaderboardCard appretiationPoint={100} badgeType="none" />
          </ul>
        </div>
        {/* Appreciation List */}
        <div className="h-[calc(100vh-320px)] mt-4 overflow-auto scroll-smooth px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <AppreciationCard onAppreciationCardClick={toggleDetailsPage} />
            <AppreciationCard onAppreciationCardClick={toggleDetailsPage} />
            <AppreciationCard onAppreciationCardClick={toggleDetailsPage} />
            <AppreciationCard onAppreciationCardClick={toggleDetailsPage} />
            <AppreciationCard onAppreciationCardClick={toggleDetailsPage} />
            <AppreciationCard onAppreciationCardClick={toggleDetailsPage} />
            {/* Loader */}
            {/* <div className="bg-[#F7F7F7] rounded-lg h-36 w-full min-h-36"></div> */}
          </div>
        </div>
        {/* Give Appreciation Button */}
        <button
          className="bg-[#3069F6] text-nowrap text-white text-base rounded-xl px-24 py-4 fixed bottom-6
      left-[50%] transform -translate-x-1/2 -translate-y-1/2"
        >
          Give Appreciation
        </button>
      </div>
    );
  }
  if (!isDetailsPageVisible) {
    return <AppreciationPage onBackArrowClickHandler={toggleDetailsPage} />;
  }
}

export default App;
