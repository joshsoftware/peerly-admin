import "./App.css";
import Login from "./login";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import Appreciations from "./appreciations";
import { useDispatch } from "react-redux";
import { getAuthToken } from "./login/slice";
import { useEffect } from "react";
import Home from "./home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/appreciations",
      element: <Appreciations />,
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
