import React from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import About from './pages/About'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App