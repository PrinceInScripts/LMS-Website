const express=require('express')
const router=express.Router()
const {register,login,logout,getProfile} =require('../controllers/user.controller')
const {isLoggesIn} = require('../middlewares/auth.middleware')

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/me',isLoggesIn,getProfile)

module.exports =router;