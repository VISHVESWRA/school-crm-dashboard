import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Table from "./pages/table/Table";
import TeachersList from "./pages/teachers/TeachersList";
import TeachersForm from "./pages/teachers/TeachersForm";
import Login from "./pages/auth/Login";

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
          <Route element={<AppLayout />}>
            <Route path="/" element={<Table />} />
            <Route path="/login" element={<Login />} />
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
