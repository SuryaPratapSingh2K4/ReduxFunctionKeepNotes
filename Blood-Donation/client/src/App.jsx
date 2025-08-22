import React from "react"
import Header from "./components/Header"
import { BrowserRouter as Router } from "react-router-dom"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Delete from "./pages/Delete"
import NotFound from "./components/NotFound"

function App() {

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/blood-donations/create" element={<Create/>}/>
        <Route path="/blood-donations/edit/:id" element={<Update/>}/>
        <Route path="/blood-donations/delete/:id" element={<Delete/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App
