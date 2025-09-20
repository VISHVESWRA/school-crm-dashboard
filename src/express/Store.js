import { configureStore } from "@reduxjs/toolkit";
import teachersReducer from "./redux/TeachersSlice.js";
// import authReducer from "./authSlice";

export const Store = configureStore({
  reducer: {
    teachers: teachersReducer,
    // auth: authReducer,
  },
});
