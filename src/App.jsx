import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import SideNavBar from './components/side-navbar/SideNavBar'

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
        <NavBar theme={theme} setTheme={setTheme} />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
