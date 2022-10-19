import React from 'react'
import {Routes, Route, Outlet, Redirect} from 'react-router-dom'
import Home from './pages/Home/Index.jsx'
import Login from './pages/Login/Index.jsx'
import Room from './pages/Room/Index.jsx'
import {PrivateRoute} from "./components/PrivateRoute";

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
            <Route exact path='/' element={<PrivateRoute/>}>
                <Route exact path='/' element={<Home/>}/>
            </Route>
            <Route exact path='/room/:id' element={<PrivateRoute/>}>
                <Route exact path='/room/:id' element={<Room/>}/>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<div>404 error</div>} />
        </Route>

      {/*<Route path="/" element={<Layout />}>*/}
      {/*  <Route path="/" element={<Home />} />*/}
      {/*  <Route path="/login" element={<Login />} />*/}
      {/*  <Route path="/room/:id" element={<Room />} />*/}
      {/*  <Route path="*" element={<div>404 error</div>} />*/}
      {/*</Route>*/}
    </Routes>
  )
}

export default App;
