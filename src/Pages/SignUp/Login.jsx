import { Container } from "@mui/system";
import SingupImg from "../../../public/assets/Images/Home/Signup.png";
import { Box, TextField, Button, Typography } from "@mui/material";
import "./SignUp.css";
import { useDispatch } from "react-redux";
import {
  login,
  submitLogin,
} from "../../features/authentication/authenticationSlice";

export default function Login() {
  const dispatch = useDispatch();

  const submitLoginForm = () => {
    dispatch(submitLogin());
  };

  const valid = (value, status) => {
    dispatch(login({ value: value, status: status }));
  };
  return (
    <Box className="section signUp">
      {/* Img >> */}
      <img src={SingupImg} alt="Sign Up" className="signup-image" />
      <Container>
        {/* Form >> */}
        <Box className="section form-container">
          <Typography variant="h4" component="h1">
            Log in to Exclusive
          </Typography>
          <Typography variant="subtitle1" component="p">
            Enter your details below
          </Typography>

          <TextField
            fullWidth
            label="johndoe@example.com"
            variant="outlined"
            className="input-field"
            onChange={(e) => {
              valid(e.target.value, "email");
            }}
          />
          <TextField
            fullWidth
            label="Password123"
            type="password"
            variant="outlined"
            className="input-field"
            onChange={(e) => {
              valid(e.target.value, "password");
            }}
          />
          <Box className="login-forget">
            <Button
              onClick={() => {
                submitLoginForm();
              }}
              fullWidth
              variant="contained"
              color="primary"
              className="create-account-btn login">
              Login
            </Button>
            <Button fullWidth className="google-signup-btn forget">
              Forget Password ?
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
