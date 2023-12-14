import Course from "../models/course.model.js"
import AppError from "../utlis/appError.js"


export const getAllCourses=async (req,res,next)=>{
    try {
        const courses=await Course.find({}).select('-lectures')

        res.status(200).json({
            success:true,
            message:'All courses',
            courses
        })
    } catch (e) {
        return next(
            new AppError(e.message,500)
        )
        
    }
}

export const getLectureByCourseId=async (req,res,next)=>{
    try {
        const {courseId}=req.params;

        const course=await Course.findById(courseId)

        if(!course){
            return next(
                new AppError('Invalid course id',400)
            )
        }

        res.status(200).json({
            success:true,
            message:'Course leture fetched succesfully',
            letures:course.letures
        })

    } catch (e) {
        return next(
            new AppError(e.message,500)
        )
    }
}