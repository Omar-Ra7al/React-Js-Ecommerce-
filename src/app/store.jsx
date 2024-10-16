import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import authenticationReducer from "../features/authentication/authenticationSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    authentication: authenticationReducer,
  },
});
