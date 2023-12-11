import express from 'express'
import {register,login,logout,getProfile} from '../controllers/user.controller.js'
import {isLoggesIn} from '../middlewares/auth.middleware.js'

const router=express.Router()


router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/me',isLoggesIn,getProfile)

export default router;