import { configureStore } from "@reduxjs/toolkit";
import teachersReducer from "./TeachersSlice";
// import authReducer from "./authSlice";

export const Store = configureStore({
  reducer: {
    teachers: teachersReducer,
    // auth: authReducer,
  },
});
