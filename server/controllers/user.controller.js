import User from "../models/user.model.js"
import AppError  from "../utlis/appError.js"
import cloudinary from 'cloudinary'
import fs from 'fs/promises'
import sendEmail from "../utlis/sendEmail.js"
import crypto from 'crypto'

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
            secure_url:'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg'
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

const getProfile=async (req,res)=>{
    const user=await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        message:'User details',
        user
    })
}

//++++++++++++++++++++forgotPassword Method+++++++++++++++++++++++


const forgotPassword=async (req,res,next)=>{
      const {email}=req.body;

      if(!email){
        return next(
            new AppError('Email is required',400)
        )
      }

      const user=await User.findOne({email})

      if(!user){
        return next(
            new AppError('Email is not registered',400)
        )
      }

      const resetToken=await user.generatePasswordToken()

      await user.save()

      const resetPasswordUrl=`${process.env.FRONTEND_URL}/reset-password/${resetToken}`
      const subject='Reset Password'
      const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.\n If you have not requested this, kindly ignore.`;

      console.log(resetPasswordUrl);
      try {
         await sendEmail(email,subject,message)

         res.status(200).json({
            success:true,
            message:`Reset password token has been sent to ${email} successfully!`
         })
      } catch (e) {
        user.forgotPasswordToken=undefined
        user.forgotPasswordExpiry=undefined

        await user.save()
        return next(new AppError(e.message,500))
      }

}

//++++++++++++++++++++resetPassword Method+++++++++++++++++++++++

const resetPassword=async (req,res,next)=>{
          const {resetToken}=req.params;
          const {password}=req.body;

          const forgotPasswordToken=crypto
                                    .createHash('sha256')
                                    .update(resetToken)
                                    .digest('hex')
        
           const user=await User.findOne({
                forgotPasswordToken,
                forgotPasswordExpiry:{$gt: Date.now()}
           })

           if(!user){
            return next(
                new AppError('Token is invalid or expired, please try again',400)
            )
           }

           user.password=password;
           user.forgotPasswordExpiry=undefined
           user.forgotPasswordToken=undefined

           await user.save()

           res.status(200).json({
            success:true,
            message:'Password changed successfully'
           })
}

//++++++++++++++++++++changePassword Method+++++++++++++++++++++++

const changePassword=async function(req,res,next){
         const {oldPassword,newPassword}=req.body;
         const {id}=req.user

         if(!oldPassword || !newPassword){
            return next(
                new AppError('All fields are mandatory',400)
            )
         }

         const user=await User.findById(id).select('+password')

         if(!user){
            return next(
                new AppError('User does not exist',400)
            )
         }

         const isPassword=await user.comparePassword(oldPassword);

         if(!isPassword){
            return next(
                new AppError('Invalid old password',400)
            )
         }

         user.password=newPassword

         await user.save()

         user.password=undefined

         res.status(200).json({
            success:true,
            message:'Password changed successfully'
         })
}

//++++++++++++++++++++updateUser Method+++++++++++++++++++++++


const updateUser=async function(req,res,next){
    const {fullName}=req.body;
    const {id}=req.params
    
    const user=await User.findById(id)

    if(!user){
        return next(
            new AppError('User does not exist',400)
        )
    }

    if(fullName){
        user.fullName=fullName
    }

    if(req.file){
        await cloudinary.v2.uploader.destroy(user.avatar.public_id)
        
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

    await user.save()

    res.status(200).json({
        success:true,
        message:'User details updated successfylly'
    })
}

export{
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUser
}