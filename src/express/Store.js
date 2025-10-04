import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./redux/UsersSlice.js";
import authSlice from "./redux/LoginSlice.js";

export const Store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authSlice,
  },
});
