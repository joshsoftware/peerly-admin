import "./App.css";
import Login from "./login";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Appreciations from "./appreciations";
import { useDispatch } from "react-redux";
import { getAuthToken } from "./login/slice";
import { useEffect } from "react";
import Home from "./home";
import Config from "./config";
import Badges from "./badges";
import CoreValues from "./coreValues";

function App() {
  const router = createBrowserRouter([
    {
      path: "/peerly-admin/",
      element: <Home />,
    },
    {
      path: "/peerly-admin/login",
      element: <Login />,
    },
    {
      path: "/peerly-admin/appreciations",
      element: <Appreciations />,
    },
    {
      path: "/peerly-admin/config",
      element: <Config />,
    },
    {
      path: "/peerly-admin/badges",
      element: <Badges />,
    },
    {
      path: "/peerly-admin/core_values",
      element: <CoreValues />,
    },
  ]);

  const dispatch = useDispatch();

  const sendData = () => {
    const authToken: string | null = localStorage.getItem("token");
    if (authToken) {
      dispatch(getAuthToken(authToken));
    }
  };

  useEffect(() => {
    sendData();
  }, []);
  

  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
