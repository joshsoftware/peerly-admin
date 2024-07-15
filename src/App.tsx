import { useState } from "react";

import AppreciationPage from "./pages/AppreciationPage";
import ProfilePage from "./pages/ProfilePage";
import LandingPage from "./pages/LandingPage";
import PostAppreciationPage from "./pages/PostAppreciationPage/index";

function App() {
  const [page, setPage] = useState<
    "landing" | "appreciation-details" | "profile" | "post-appreciation"
  >("post-appreciation");

  const onAppreciationCardClickHandler = () => {
    setPage("appreciation-details");
  };

  const onProfileClickHandler = () => {
    setPage("profile");
  };

  const onPostAppreciationClickHandler = () => {
    setPage("post-appreciation");
  };

  const onBackArrowClickHandler = () => {
    setPage("landing");
  };

  switch (page) {
    case "landing":
      return (
        <LandingPage
          onProfileClickHandler={onProfileClickHandler}
          onAppreciationCardClickHandler={onAppreciationCardClickHandler}
          onPostAppreciationClickHandler={onPostAppreciationClickHandler}
        />
      );
      break;
    case "profile":
      return <ProfilePage onBackArrowClickHandler={onBackArrowClickHandler} />;
      break;
    case "appreciation-details":
      return (
        <AppreciationPage onBackArrowClickHandler={onBackArrowClickHandler} />
      );
      break;
    case "post-appreciation":
      return (
        <PostAppreciationPage
          onBackArrowClickHandler={onBackArrowClickHandler}
        />
      );
  }
}

export default App;
