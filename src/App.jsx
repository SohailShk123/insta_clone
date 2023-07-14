import React, { useEffect } from 'react'
import './App.css'
import { Routes,Route } from "react-router-dom";
import Home from './Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import PageNotFound from './pages/PageNotFound'
import CheackOut from './pages/CheackOut';



function App() {
 
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/cheackout' element={<CheackOut/>} />
        <Route path='*' element={<PageNotFound/>} />
    </Routes>
  )
}

export default App