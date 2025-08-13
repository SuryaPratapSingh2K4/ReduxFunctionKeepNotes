import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'express'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-group" element={<AddGroup />} />
        <Route path="/group/:id" element={<GroupDetails />} />
      </Routes>
    </div>
  )
}

export default App
