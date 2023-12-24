import AppError from "../utlis/appError.js"
import sendEmail from "../utlis/sendEmail.js"


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