import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Aboutus from './pages/About/Aboutus'


function App() {

  return (
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/about' element={<Aboutus/>}/>
    </Routes>
  )
}

export default App
