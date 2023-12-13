import User from "../models/user.model.js"
import AppError  from "../utlis/appError.js"
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

const cookieOptions={
    secure:true,
    maxAge:7*24*60*60*1000, //7 days
    httpOnly:true
}


//++++++++++++++++++++Registration Method+++++++++++++++++++++++

const register=async (req,res,next)=>{
    const {fullName,email,password}=req.body

    if(!fullName || !email || !password){
        return next(new AppError('All fields are required',400))
    }

    const userExits=await User.findOne({email})

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


        if(req.file){
             try {
            const result=await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms',
                width:250,
                height:250,
                gravity:'faces',
                crop:'fill'
            })
    
            if(result){
                user.avatar.public_id=result.public_id
                user.avatar.secure_url=result.secure_url
    
                //remove file from local server
                fs.rm(`uploads/${req.file.filename}`)
            }
        }
        catch (e) {
            return next(new AppError(e.message,'file not uploades,please try again',500))
    
        }
    } 
   
    await user.save()

    const token=await user.generateJWTToken()
    res.cookie('token',token,cookieOptions)

    user.password=undefined

    res.status(200).json({
        success:true,
        message:'User regsitered successfully',
        user
    })
}


//++++++++++++++++++++Login Method+++++++++++++++++++++++


const login=async (req,res,next)=>{

    const {email,password}=req.body;

    if(!email || !password){
        return next(new AppError('All fields are required',400))
    }

    const user=await User.findOne({
        email
    }).select('+password')

    if(!user || ! (await user.comparePassword(password))){  //TODO
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


//++++++++++++++++++++Logout Method+++++++++++++++++++++++


const logout=(req,res)=>{
   res.cookie('token',null,{
    secure:true,
    maxAge:0,
    httpOnly:true
   })

   res.status(201).json({
    success:true,
    message:'User logged out sucessfully',
    
})

}

//++++++++++++++++++++getProfile Method+++++++++++++++++++++++

const getProfile=(req,res)=>{
    const user=User.findById(req.user.id);

    res.status(200).json({
        success:true,
        message:'User details',
        user
    })
}

export{
    register,
    login,
    logout,
    getProfile
}