import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import peerlyLogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/peerly-admin/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ backgroundColor: "#dee9f4" }}
      >
        <Toolbar
          variant="dense"
          sx={{
            justifyContent: "space-between",
            paddingLeft: "30px",
            paddingRight: "30px",
          }}
        >
          <Box
            component="img"
            sx={{
              height: 30,
            }}
            alt="Your logo."
            src={peerlyLogo}
          />
          <Button color="primary" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}