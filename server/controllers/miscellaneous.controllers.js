import User from "../models/user.model.js"
import AppError from "../utlis/appError.js"
import sendEmail from "../utlis/sendEmail.js"

//++++++++++++++++++++contactUs Method+++++++++++++++++++++++

export const contactUs=async (req,res,next)=>{
       const {name,email,message}=req.body

       if(!name || !email || !message){
          return next(new AppError("All filds are required"))
       }

       try {
        
        const subject='Contact Us Form'

        const textMessage=`${name} - ${email} <br/> ${message}`

        await sendEmail(process.env.CONTACT_US_EMAIL, subject, textMessage)
       } catch (e) {
          return next(new AppError(e.message,400))
       }

       res.status(200).json({
        success: true,
        message: 'Your request has been submitted successfully',
      });
}

//++++++++++++++++++++userStats Method+++++++++++++++++++++++

export const userStats=async (req,res,next)=>{
   const allUsersCount=await User.countDocuments()

   const subscribedUsersCount=await User.countDocuments({
      'subscription.status': 'active',
   })

   res.status(200).json({
      success: true,
      message: 'All registered users count',
      allUsersCount,
      subscribedUsersCount,
    });
}