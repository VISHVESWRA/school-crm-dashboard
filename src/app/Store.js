import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/UsersSlice.js";
import authSlice from "../express/redux/LoginSlice.js";
import studentReducer from "../features/studdents/StudentsSlice.js";
import courseReducer from "../express/redux/CourseSlice.js";
import verifyEmailReducer from "../express/redux/VerifyEmail.js";

export const Store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authSlice,
    students: studentReducer,
    courses: courseReducer,
    verifyEmail: verifyEmailReducer,
  },
});
