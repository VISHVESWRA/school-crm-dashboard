import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import SideNavBar from './components/side-navbar/SideNavBar'
import { Sidebar } from 'lucide-react'
import Form from './components/form'
import AppLayout from './components/AppLayout'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Form />} />
            {/* add more pages here */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
