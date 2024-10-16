// Css >>
import "./ManageAccount.css";

// Mui >>
import { Container, Box, Typography, TextField, Button } from "@mui/material";

// Redux >>
import { useDispatch } from "react-redux";
import {
  editUserData,
  submitChanges,
} from "../../../features/authentication/authenticationSlice";

export default function ManageAccount() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const dispatch = useDispatch();

  const submitChangesForm = () => {
    dispatch(submitChanges());
  };

  const valid = (value, status) => {
    dispatch(editUserData({ value: value, status: status }));
  };

  return (
    <Box className="section mange-acc">
      <Container>
        {/* Title >> */}
        <Box className="details">
          <Typography className="title">
            Home / <span style={{ fontWeight: "bold" }}>My Account</span>
          </Typography>
          <Box className="slide-icons">
            <Typography className="title">
              Welcome <span className="user-name">Mr {userData.fristName}</span>
            </Typography>
          </Box>
        </Box>

        <Box className="manage-acc">
          {/* Menue >> */}
          <Box className="menu">
            <Box>
              <Typography className="menu-title">Manage My Account</Typography>

              <Typography className="menu-item user-name">
                My Profile
              </Typography>
              <Typography className="menu-item">Address Book</Typography>
              <Typography className="menu-item">My Payment Options</Typography>
            </Box>

            <Box>
              <Typography className="menu-title">My Orders</Typography>
              <Typography className="menu-item">My Orders</Typography>
              <Typography className="menu-item">My Returns</Typography>
            </Box>

            <Box>
              <Typography className="menu-title">My WishList</Typography>
            </Box>
          </Box>

          {/* Form >> */}
          <Box className="form">
            <Box className="profile-form">
              {/* Title */}
              <Typography variant="h5" className="form-title">
                Edit Your Profile
              </Typography>

              {/* First Name and Last Name */}
              <Box className="input-row">
                <Box className="input-half">
                  <Typography>First Name</Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      if (e.target.value.trim("")) {
                        valid(e.target.value, "frist-name");
                      }
                    }}
                  />
                </Box>
                <Box className="input-half">
                  <Typography>Last Name</Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      if (e.target.value.trim("")) {
                        valid(e.target.value, "last-name");
                      }
                    }}
                  />
                </Box>
              </Box>

              {/* Email and Address */}
              <Box className="input-row">
                <Box className="input-half">
                  <Typography>Email</Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      if (e.target.value.trim("")) {
                        valid(e.target.value, "email");
                      }
                    }}
                  />
                </Box>
                <Box className="input-half">
                  <Typography>Address</Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      if (e.target.value.trim("")) {
                        valid(e.target.value, "address");
                      }
                    }}
                  />
                </Box>
              </Box>

              {/* Password Changes */}
              <Typography variant="h6" className="password-title">
                Password Changes
              </Typography>

              <Box className="input-row-full">
                <Typography>Current Password</Typography>
                <TextField
                  fullWidth
                  type="password"
                  placeholder="Enter Current Password"
                  variant="outlined"
                  size="small"
                  onChange={(e) => {
                    if (e.target.value.trim("")) {
                      valid(e.target.value, "password");
                    }
                  }}
                />
              </Box>

              <Box className="input-row-full">
                <Typography>New Password</Typography>
                <TextField
                  fullWidth
                  type="password"
                  placeholder="Enter New Password"
                  variant="outlined"
                  size="small"
                  onChange={(e) => {
                    if (e.target.value.trim("")) {
                      valid(e.target.value, "new-password");
                    }
                  }}
                />
              </Box>

              <Box className="input-row-full">
                <Typography>Confirm New Password</Typography>
                <TextField
                  fullWidth
                  type="password"
                  placeholder="Confirm New Password"
                  variant="outlined"
                  size="small"
                  onChange={(e) => {
                    if (e.target.value.trim("")) {
                      valid(e.target.value, "confirm-new-password");
                    }
                  }}
                />
              </Box>

              {/* Buttons */}
              <Box className="buttons">
                <Button>Cancel</Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    submitChangesForm();
                  }}>
                  Save Changes
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
