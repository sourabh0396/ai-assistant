import { useState } from 'react'
import { reactLogo } from './assets/assetsConstant'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Customize from './pages/Customize'
import { useContext } from 'react'
import Customize2 from './pages/Customize2'
import { userDataContext } from './context/UserContext'

function App() {
  const { userData, } = useContext(userDataContext);
  return (
    // <Routes>
    //   <Route path='/' element={(userData?.assistantImage && userData?.assistantName) ? <Home /> : <Navigate to={"/customize"} />} />
    //   <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
    //   <Route path='/signin' element={!userData ? <SignIn /> : <Navigate to={"/"} />} />
    //   <Route path='/customize' element={userData ? <Customize /> : <Navigate to={"/signin"} />} />
    //   <Route path='/customize2' element={userData ? <Customize2 /> : <Navigate to={"/signin"} />} />
    // </Routes>

    <Routes>
      <Route path='/' element={(userData?.assistantImage && userData?.assistantName) ? <Home /> : <Navigate to={"/customize"} />} />
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
      <Route path='/signin' element={!userData ? <SignIn /> : <Navigate to={"/"} />} />
      <Route path='/customize' element={userData ? <Customize /> : <Navigate to={"/signin"} />} />
      <Route path='/customize2' element={userData ? <Customize2 /> : <Navigate to={"/signin"} />} />
    </Routes>
  )
}

export default App
