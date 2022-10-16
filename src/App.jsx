import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Home from './pages/Home/Index.jsx'
import Login from './pages/Login/Index.jsx'
import Room from './pages/Room/Index.jsx'

const App = () => {
  const Layout = () => {
    return (
      <>
        <Outlet />
      </>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="*" element={<div>404 error</div>} />
      </Route>
    </Routes>
  )
}

export default App;
