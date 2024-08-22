import { Button, TextField } from "@mui/material";
import { userLoginBody } from "../types";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAdminLoginMutation } from "../apiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getAuthToken } from "../slice";

const LoginForm = () => {
  const navigate = useNavigate();
  const initialValues: userLoginBody = {
    email: "",
    password: "",
  };
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email!").required("Required!"),
    password: Yup.string().required("Required!"),
  });
  const [loginAdmin] = useAdminLoginMutation();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginAdmin(values)
        .unwrap()
        .then((resp) => {
          console.log("response -> ", resp);
          toast.success(resp.message);
          localStorage.setItem("token", resp.data.AuthToken);
          dispatch(getAuthToken(resp.data.AuthToken));
          navigate("/");
        })
        .catch((resp) => {
          console.log("response -> ", resp);
          toast.error(resp.data.message);
        });
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "40%",
      }}
    >
      <TextField
        sx={{ margin: "5px auto", width: "80%" }}
        id="standard-basic"
        label="Email"
        name="email"
        variant="standard"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        sx={{ margin: "5px auto", width: "80%" }}
        id="standard-basic"
        type="password"
        label="Password"
        name="password"
        variant="standard"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <Button
        sx={{
          margin: "15px auto",
        }}
        variant="contained"
        type="submit"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;