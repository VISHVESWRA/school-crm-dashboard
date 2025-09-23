import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Table from "./pages/table/Table";
import TeachersList from "./pages/teachers/TeachersList";
import TeachersForm from "./pages/teachers/TeachersForm";
import Home from "./components/home/Home";
import LoginPage from "./pages/auth/Login";
import PrivateRoute from "./redux/authRoutes";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            element={
              <PrivateRoute role={"superAdmin"}>
                <AppLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="settings">
              <Route path="teachersList" element={<TeachersList />} />
              <Route path="teachersForm" element={<TeachersForm />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
