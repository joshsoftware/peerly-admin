import "./App.css";
import Login from "./login";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
  ]);

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
