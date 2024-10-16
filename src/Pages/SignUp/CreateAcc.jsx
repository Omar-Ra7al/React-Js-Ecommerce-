// Material-UI Components and Icons
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Container,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

// public/assets
import SingupImg from "../../../public/assets/Images/Home/Signup.png";

// CSS
import "./SignUp.css";

// React Router
import { Link, useNavigate } from "react-router-dom";

// Redux and Redux Actions
import { useDispatch } from "react-redux";
import {
  getStarted,
  submitGetStarted,
} from "../../features/authentication/authenticationSlice";

export default function CreatAcc() {
  // Redux >>
  const dispatch = useDispatch();

  // React router >>
  const navigate = useNavigate();

  const submitGetStartedForm = () => {
    dispatch(submitGetStarted(navigate));
  };

  const valid = (value, status) => {
    dispatch(getStarted({ value: value, status: status }));
  };

  return (
    <Box className="section signUp">
      {/* Img Left side >> */}
      <img src={SingupImg} alt="Sign Up" className="signup-image" />
      <Container>
        {/* Form Right side >> */}
        <Box className="section form-container">
          <Typography variant="h4" component="h1">
            Create an account
          </Typography>
          <Typography variant="subtitle1" component="p">
            Enter your details below
          </Typography>

          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            className="input-field"
            onChange={(e) => {
              valid(e.target.value, "name");
            }}
          />
          <TextField
            fullWidth
            label="Email or Phone Number"
            variant="outlined"
            className="input-field"
            onChange={(e) => {
              valid(e.target.value, "email");
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            className="input-field"
            onChange={(e) => {
              valid(e.target.value, "password");
            }}
          />

          <Button
            onClick={() => {
              submitGetStartedForm();
            }}
            fullWidth
            variant="contained"
            color="primary"
            className="create-account-btn">
            Create Account
          </Button>

          <Divider className="divider">or</Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            className="google-signup-btn">
            Sign up with Google
          </Button>

          <Typography variant="body2">
            Already have an account?
            <Button variant="text" color="primary" className="login-btn">
              <Link to={"/login"}>Login</Link>
            </Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
