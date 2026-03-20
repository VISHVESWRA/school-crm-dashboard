import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

// Pages
import UsersList from "./features/users/UsersList.jsx";
import UsersForm from "./features/users/UsersForm.jsx";
import Home from "./components/home/Home";
import LoginPage from "./features/auth/Login.jsx";
import ResetPage from "./features/auth/Reset.jsx";
import CourseList from "./pages/course/CourseList";
import CourseForm from "./pages/course/CourseForm";
import StudentForm from "./features/studdents/StudentsForm.jsx";
import StudentList from "./features/studdents/StudentsList.jsx";
import AttendanceSystem from "./Attendance.jsx";

// Components
import SideNavBar from "./components/side-navbar/SideNavBar";
import PrivateRoute from "./redux/authRoutes";

// Services
import { checkTokenExpiration } from "./services/CheckTokenValidity.js";
import ForgotPassword from "./features/auth/ForgotPassword.jsx";

function App() {
  const dispatch = useDispatch();

  // Check token expiration on mount
  useEffect(() => {
    checkTokenExpiration(dispatch);
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset" element={<ResetPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute role={"superadmin"} />}>
            <Route path="/" element={<SideNavBar />}>
              <Route index element={<Home />} />

              {/* User Routes */}
              <Route path="users" element={<UsersList />} />
              <Route path="users/new" element={<UsersForm />} />
              <Route path="users/:id" element={<UsersForm />} />

              {/* Course Routes */}
              <Route path="courses" element={<CourseList />} />
              <Route path="courses/new" element={<CourseForm />} />
              <Route path="courses/:id" element={<CourseForm />} />

              {/* Student Routes */}
              <Route path="students" element={<StudentList />} />
              <Route path="students/new" element={<StudentForm />} />
              <Route path="students/:id" element={<StudentForm />} />

              {/* Attendance Route */}
              <Route path="attendance" element={<AttendanceSystem />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
