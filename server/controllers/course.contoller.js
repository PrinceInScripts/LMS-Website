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
            lectures:course.lectures
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


//++++++++++++++++++++addLectureToCourseById Method+++++++++++++++++++++++

export const addLectureToCourseById = async (req, res, next) => {
    const { title, description } = req.body;
    const { courseId } = req.params;
    let lectureData = {};
  
    try {
      if (!title || !description) {
        throw new AppError('All fields are required', 400);
      }
  
      const course = await Course.findById(courseId);
  
      if (!course) {
        throw new AppError('Course with given id does not exist!', 400);
      }
  
      if (req.file) {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: 'lms',
          chunk_size: 200000000,
          resource_type: 'video',
        });
  
        if (result) {
          lectureData.public_id = result.public_id;
          lectureData.secure_url = result.secure_url;
        }
  
        await fs.unlink(req.file.path); // Use fs.unlink for file removal
  
        course.lectures.push({
          title,
          description,
          lecture: lectureData,
        });
  
        course.numberOfLectures = course.lectures.length;
        await course.save();
  
        res.status(200).json({
          success: true,
          message: 'Lecture Added successfully',
          course,
        });
      }
    } catch (error) {
      // Handle errors here
      next(new AppError(error.message, error.statusCode || 500));
    }
  };
  

//++++++++++++++++++++removeLectureFromCourse Method+++++++++++++++++++++++

export const removeLectureFromCourse = async (req, res, next) => {
    const { courseId, lectureId } = req.query;
    
    if (!courseId) {
      return next(new AppError('Course ID is required', 400));
    }
  
    if (!lectureId) {
      return next(new AppError('Lecture ID is required', 400));
    }
  
    const course = await Course.findById(courseId);
  
    if (!course) {
      return next(new AppError('Invalid ID or Course does not exist.', 404));
    }
  
    const lectureIndex = course.lectures.findIndex(
      (lecture) => lecture._id.toString() === lectureId.toString()
    );
  
    if (lectureIndex === -1) {
      return next(new AppError('Lecture does not exist.', 404));
    }
  
    await cloudinary.v2.uploader.destroy(
      course.lectures[lectureIndex].lecture.public_id,
      {
        resource_type: 'video',
      }
    );
  
    course.lectures.splice(lectureIndex, 1);
  
    course.numberOfLectures = course.lectures.length;
  
    await course.save();
  
    res.status(200).json({
      success: true,
      message: 'Course lecture removed successfully',
    });
  };