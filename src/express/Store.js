import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./redux/UsersSlice.js";
import authSlice from "./redux/LoginSlice.js";
import studentReducer from "./redux/StudentsSlice.js";

export const Store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authSlice,
    students: studentReducer,
  },
});
