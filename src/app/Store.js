import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/UsersSlice.js";
import authSlice from "../features/auth/LoginSlice.js";
import studentReducer from "../features/studdents/StudentsSlice.js";
import courseReducer from "../features/courses/CourseSlice.js";
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
