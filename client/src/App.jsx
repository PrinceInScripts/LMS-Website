import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Aboutus from './pages/About/Aboutus'
import NotFound from './pages/Not Found/NotFound'
import Signup from './pages/Signup/Signup'
import Signin from './pages/Signin/Signin'
import Contact from './pages/Contact/Contact'
import Denied from './pages/Denied/Denied'
import CourseList from './pages/Courses/CourseList/CourseList'
import CourseDescription from './pages/Courses/CourseDescription/CourseDescription'



function App() {

  return (
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/about' element={<Aboutus/>}/>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/signin' element={<Signin/>}/>
       <Route path='/courses' element={<CourseList/>}/>
       <Route path='/course/description' element={<CourseDescription/>}/>
       <Route path='/contact' element={<Contact/>}/>
       <Route path='/denied' element={<Denied/>}/>
       <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default App
