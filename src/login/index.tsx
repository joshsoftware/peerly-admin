import { Box, Divider } from "@mui/material";
import loginImage from "../assets/loginImage.webp";
import LoginForm from "./components/loginForm";

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        margin: "120px auto",
        width: "80%",
        justifyContent: "center",
      }}
    >
      <img src={loginImage} style={{
        width: "50%"
      }} alt="login image" />
      <Divider orientation="vertical"></Divider>
      <LoginForm/>
    </Box>
  );
};

export default Login;
