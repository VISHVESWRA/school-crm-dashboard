import { configureStore } from "@reduxjs/toolkit";
import teachersReducer from "./redux/TeachersSlice.js";
import authSlice from "./redux/LoginSlice.js";

export const Store = configureStore({
  reducer: {
    teachers: teachersReducer,
    auth: authSlice,
  },
});
