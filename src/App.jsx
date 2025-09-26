import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import TeachersList from "./pages/teachers/TeachersList";
import TeachersForm from "./pages/teachers/TeachersForm";
import Home from "./components/home/Home";
import LoginPage from "./pages/auth/Login";
import PrivateRoute from "./redux/authRoutes";
import SideNavBar from "./components/side-navbar/SideNavBar";
import CourseList from "./pages/course/CourseList";
import CourseForm from "./pages/course/CourseForm";
import StudentForm from "./pages/students/StudentForm";
import StudentList from "./pages/students/StudentList";

function App() {
  // const [theme, setTheme] = useState(() => {
  //   return localStorage.getItem("theme") || "light";
  // });

  // useEffect(() => {
  //   document.documentElement.setAttribute("data-bs-theme", theme);
  //   localStorage.setItem("theme", theme);
  // }, [theme]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            element={
              <PrivateRoute role={["superAdmin", "teacher"]}>
                <SideNavBar />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="settings">
              <Route path="teachersList" element={<TeachersList />} />
              <Route path="teachersForm" element={<TeachersForm />} />
              <Route path="teachersForm/:id" element={<TeachersForm />} />
              <Route path="courseForm" element={<CourseForm />} />
              <Route path="courseForm/:id" element={<CourseForm />} />
              <Route path="courseList" element={<CourseList />} />
              <Route path="studentForm" element={<StudentForm />} />
              <Route path="studentForm/:id" element={<StudentForm />} />
              <Route path="studentList" element={<StudentList />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
