import express from 'express'
import {register,login,logout,getProfile} from '../controllers/user.controller.js'
import {isLoggesIn} from '../middlewares/auth.middleware.js'
import upload from '../middlewares/multer.middleware.js'

const router=express.Router()


router.post('/register',upload.single('avatar'),register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/me',isLoggesIn,getProfile)

export default router;