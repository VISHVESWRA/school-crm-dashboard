import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import UsersList from "./pages/users/UsersList";
import UsersForm from "./pages/users/UsersForm";
import Home from "./components/home/Home";
import LoginPage from "./pages/auth/Login";
import PrivateRoute from "./redux/authRoutes";
import SideNavBar from "./components/side-navbar/SideNavBar";
import CourseList from "./pages/course/CourseList";
import CourseForm from "./pages/course/CourseForm";
import StudentForm from "./pages/students/StudentForm";
import StudentList from "./pages/students/StudentList";
import {Toaster} from "react-hot-toast";
import ResetPage from "./pages/auth/Reset";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {checkTokenExpiration} from "./services/CheckTokenValidity.js";
import AttendanceSystem from "./Attendance.jsx";

function App() {
  // const [theme, setTheme] = useState(() => {
  //   return localStorage.getItem("theme") || "light";
  // });

  // useEffect(() => {
  //   document.documentElement.setAttribute("data-bs-theme", theme);
  //   localStorage.setItem("theme", theme);
  // }, [theme]);
  const dispatch = useDispatch();

  useEffect(() => {
    checkTokenExpiration(dispatch);
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <div>
          <Toaster position="top-right" reverseOrder={true} />
        </div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset" element={<ResetPage />} />
          <Route
            element={
              <PrivateRoute role={["superAdmin", "user", "staff"]}>
                <SideNavBar />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="settings">
              <Route path="usersList" element={<UsersList />} />
              <Route path="usersForm" element={<UsersForm />} />
              <Route path="usersForm/:id" element={<UsersForm />} />
              <Route path="courseForm" element={<CourseForm />} />
              <Route path="courseForm/:id" element={<CourseForm />} />
              <Route path="courseList" element={<CourseList />} />
              <Route path="studentForm" element={<StudentForm />} />
              <Route path="studentForm/:id" element={<StudentForm />} />
              <Route path="studentList" element={<StudentList />} />
              <Route path="attendance" element={<AttendanceSystem />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
