import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Aboutus from './pages/About/Aboutus'
import NotFound from './pages/Not Found/NotFound'
import Signup from './pages/Signup/Signup'
import Signin from './pages/Signin/Signin'


function App() {

  return (
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/about' element={<Aboutus/>}/>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/signin' element={<Signin/>}/>
       <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default App
