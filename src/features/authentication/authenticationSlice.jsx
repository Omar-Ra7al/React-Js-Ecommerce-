import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    name: "",
    email: "",
    password: {
      currentPass: "",
      newPass: "",
      confirmNewPass: "",
    },
    fristName: "",
    lastName: "",
    address: "",
  },
  login: {
    email: "",
    password: "",
  },
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    getStarted: (state, action) => {
      switch (action.payload.status) {
        case "name":
          state.userData.name = action.payload.value;
          break;
        case "email":
          state.userData.email = action.payload.value;
          break;
        case "password":
          state.userData.password.currentPass = action.payload.value;
          break;
        default:
          break;
      }
    },
    submitGetStarted: (state, action) => {
      if (
        state.userData.name &&
        state.userData.email &&
        state.userData.password.currentPass
      ) {
        localStorage.setItem("userData", JSON.stringify(state.userData));
        localStorage.setItem("logedIn", false);
        const navigate = action.payload;
        navigate(`/login`);
      } else {
        alert("Please fill out all required fields with valid information.");
      }
    },
    login: (state, action) => {
      switch (action.payload.status) {
        case "email":
          state.login.email = action.payload.value;
          break;
        case "password":
          state.login.password = action.payload.value;
          break;
        default:
          break;
      }
    },
    submitLogin: (state) => {
      const userDataLocalStorage = JSON.parse(localStorage.getItem("userData"));
      if (
        state.login.email == userDataLocalStorage.email &&
        state.login.password == userDataLocalStorage.password.currentPass
      ) {
        localStorage.setItem("logedIn", true);
        // To reload the page >>
        window.location.href = "/";
      } else {
        alert("Please fill out all required fields with valid information.");
      }
    },
    editUserData: (state, action) => {
      switch (action.payload.status) {
        case "frist-name":
          state.userData.fristName = action.payload.value;
          break;
        case "last-name":
          state.userData.lastName = action.payload.value;
          break;
        case "email":
          state.userData.email = action.payload.value;
          break;
        case "address":
          state.userData.address = action.payload.value;
          break;
        case "password":
          state.userData.password.currentPass = action.payload.value;
          break;
        case "new-password":
          state.userData.password.newPass = action.payload.value;
          break;
        case "confirm-new-password":
          state.userData.password.confirmNewPass = action.payload.value;
          break;
        default:
          break;
      }
    },
    submitChanges: (state) => {
      const userData = state.userData;
      const userDataLocalStorage = JSON.parse(localStorage.getItem("userData"));
      // Change Name
      if (userData.fristName != "" || userData.lastName != "") {
        // userData.name = userData.fristName + userData.lastName;
        localStorage.setItem(
          "userData",
          JSON.stringify({
            ...userDataLocalStorage,
            name: userData.fristName + userData.lastName,
            fristName: userData.fristName,
            lastName: userData.lastName,
          })
        );
        window.location.reload();
      }
      // Change Email
      if (userData.email != "") {
        localStorage.setItem(
          "userData",
          JSON.stringify({
            ...userDataLocalStorage,
            email: userData.email,
          })
        );
        window.location.reload();
      }
      // Change Address
      if (userData.address != "") {
        localStorage.setItem(
          "userData",
          JSON.stringify({
            ...userDataLocalStorage,
            address: userData.address,
          })
        );
        window.location.reload();
      }
      // Change Password
      if (
        userData.password.currentPass ==
          userDataLocalStorage.password.currentPass &&
        userData.password.newPass != "" &&
        userData.password.newPass === userData.password.confirmNewPass
      ) {
        localStorage.setItem(
          "userData",
          JSON.stringify({
            ...userDataLocalStorage,
            password: {
              ...userDataLocalStorage.password,
              currentPass: userData.password.newPass,
            },
          })
        );
        window.location.reload();
      }
    },
  },
});
export const {
  getStarted,
  submitGetStarted,
  login,
  submitLogin,
  editUserData,
  submitChanges,
} = authenticationSlice.actions;
export default authenticationSlice.reducer;
