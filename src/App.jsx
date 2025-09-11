import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <NavBar fixed="top" />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
