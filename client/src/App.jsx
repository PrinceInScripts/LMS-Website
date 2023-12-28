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
import CreateCourse from './pages/Courses/CreateCourse/CreateCourse'
import RequireAuth from './components/Auth/RequireAuth'
import Profile from './pages/User/Profile/Profile'
import EditProfile from './pages/User/EditProfile/EditProfile'
import Checkout from './pages/Payment/Checkout/Checkout'
import CheckoutSuccess from './pages/Payment/CheckoutSuccess/CheckoutSuccess'
import CheckoutFail from './pages/Payment/CheckoutFail/CheckoutFail'
import DisplayLectures from './pages/Dashboard/DisplayLectures/DisplayLectures'
import AddLecture from './pages/Dashboard/AddLecture/AddLecture'
import AdminDashboard from './pages/Dashboard/AdminDashboard/AdminDashboard'



function App() {

  return (
    <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/about' element={<Aboutus/>}/>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/signin' element={<Signin/>}/>
       <Route path='/courses' element={<CourseList/>}/>
       <Route path='/course/description' element={<CourseDescription/>}/>

       <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
          <Route path='/user/profile' element={<Profile/>}/>
          <Route path='/user/editprofile' element={<EditProfile/>}/>

          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/checkout/success' element={<CheckoutSuccess/>}/>
          <Route path='/checkout/fail' element={<CheckoutFail/>}/>

          <Route path='/course/displaylectures' element={<DisplayLectures/>}/>
          <Route path='/course/addlecture' element={<AddLecture/>}/>\

          <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
       </Route>

       <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
          <Route path='/course/create' element={<CreateCourse/>}/>
       </Route>

       <Route path='/contact' element={<Contact/>}/>
       <Route path='/denied' element={<Denied/>}/>
       <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default App
