import Course from "../models/course.model.js"
import AppError from "../utlis/appError.js"
import cloudinary from 'cloudinary'
import fs from 'fs/promises'


//++++++++++++++++++++getAllCourses Method+++++++++++++++++++++++

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

//++++++++++++++++++++getLectureByCourseId Method+++++++++++++++++++++++

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


//++++++++++++++++++++createCourse Method+++++++++++++++++++++++

export const createCourse=async (req,res,next)=>{
    try {
        const {title,description,category,createdBy}=req.body

        if(!title || !description || !category || !createdBy){
            return next(new AppError('All fileds are required',400))
        }

        const course=await Course.create({
            title,
            description,
            category,
            createdBy,
            thumbail:{
                public_id:'DUMMY',
                secure_url:'DUMMY'
            }
        })

        if(req.file){
            const result=await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms',
            });

            if(result){
                course.thumbail.public_id=result.public_id,
                course.thumbail.secure_url=result.secure_url
            }
            fs.rm(`uploads/${req.file.filename}`);
        }

        await course.save()

        res.status(200).json({
            success:true,
            message:'Course created successfully!',
            course
        })


    } catch (e) {
        return next(
            new AppError(e.message,500)
        )
    }
}


//++++++++++++++++++++updateCourse Method+++++++++++++++++++++++

export const updateCourse=async (req,res,next)=>{
    try {
        const {courseId}=req.params;

        const course=await Course.findByIdAndUpdate(
            courseId,
            {
                $set:req.body
            },
            {
                runValidators:true
            }

        )

        if(!course){
            return next(
                new AppError('Course does not exists',400)
            )
        }

        res.status(200).json({
            success:true,
            message:'Course updated successfully',
            course
        })
    } catch (e) {
        return next(
            new AppError(e.message,500)
        )
    }
}


//++++++++++++++++++++deleteCourse Method+++++++++++++++++++++++

export const deleteCourse=async (req,res,next)=>{
    try {
        const {courseId}=req.params;

        const course=await Course.findById(courseId)

        if(!course){
            return next(
                new AppError('Course does not exist with given id',500)
            )
        }

        await Course.findByIdAndDelete(courseId)

        res.status(200).json({
            success:true,
            message:'Course Deleted Sucessfully'
        })
    } catch (e) {
        return next(
            new AppError(e.message,500)
        )
    }
}


export const addLectureToCourseById=async (req,res,next)=>{
    try {
        const {title,description}=req.body

        const {courseId}=req.params

        if(!title || !description){
            return next(
                new AppError('All fileds are required',400)
            )
        }

        const course=await Course.findById(courseId)

        if(!course){
            return next(
                new AppError('Course with given id does not exist!',400)
            )
        }

        const letureData={
            title,
            description,
            lecture:{}
        }

        if(req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms'
            })

            if(result){
                letureData.lecture.public_id=result.public_id
                letureData.lecture.secure_url=result.secure_url
            }

            fs.rm(`uploads/${req.file.filename}`);

            course.lectures.push(letureData)
            course.numbersOfLectures=course.lectures.length

            await course.save();

            res.status(200).json({
                success:true,
                message:'Lecture Added successfully',
                course
            })


        }
    } catch (e) {
        return next(
            new AppError(e.message,500)
        )
    }
}