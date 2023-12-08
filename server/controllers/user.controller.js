const User = require("../models/user.model")
const { default: AppError } = require("../utlis/appError")

const cookieOptions={
    secure:true,
    maxAge:7*24*60*60*1000, //7 days
    httpOnly:true
}

const register=async (req,res)=>{
    const {fullName,email,password}=req.body

    if(!fullName || !email || !password){
        return next(new AppError('All fields are required',400))
    }

    const userExits=User.findOne({email})

    if(userExits){
        return next(new AppError('Email Already exists',400))
    }

    const user=await User.create({
        fullName,
        email,
        password,
        avatar:{
            public_id:email,
            secure_url:'https://images.pexels.com/photos/19321435/pexels-photo-19321435/free-photo-of-a-christmas-tree-with-a-candle-and-a-book.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
        }
    })

    if(!user){
        return next(new AppError('User registration faild,please try again',400))
    }

    //TODO: upload user picture
    await user.save()

    //TODO: get JWT token in cookie

    user.password=undefined

    res.status(200).json({
        success:true,
        message:'User regsitered successfully',
        user
    })
}
const login=async (req,res)=>{

    const {email,password}=req.body;

    if(!email || !password){
        return next(new AppError('All fields are required',400))
    }

    const user=await User.findOne({
        email
    }).select('+password')

    if(!user || !user.comparePassword(password)){  //TODO
        return next(new AppError('User does not exists',400))
    }

    const token=await user.generateJWTToken()
    user.password=undefined

    res.cookie('token',token,cookieOptions)

    res.status(201).json({
        success:true,
        message:'User registered sucessfully',
        user
    })


}
const logout=(req,res)=>{

}
const getProfile=(req,res)=>{

}

module.exports={
    register,
    login,
    logout,
    getProfile
}