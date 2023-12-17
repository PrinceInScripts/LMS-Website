import {Router} from 'express'
import { addLectureToCourseById, createCourse, deleteCourse, getAllCourses, getLectureByCourseId, updateCourse } from '../controllers/course.contoller.js'
import { authorizedRoles, authorizedSubscriber, isLoggedIn } from '../middlewares/auth.middleware.js'
import upload from '../middlewares/multer.middleware.js'

const router=Router()

router
     .route('/')
     .get(getAllCourses)
     .post(
          isLoggedIn,
          authorizedRoles('ADMIN'),
          upload.single('thumbail'),
          createCourse
      )

router
      .route('/:courseId')
      .get(isLoggedIn,
            authorizedSubscriber,
            getLectureByCourseId)
      .put(
            isLoggedIn,
            authorizedRoles('ADMIN'),
            updateCourse
      )
      .delete(
            isLoggedIn,
            authorizedRoles('ADMIN'),
            deleteCourse
      )
      .post(
            isLoggedIn,
            authorizedRoles('ADMIN'),
            upload.single('lecture'),
            addLectureToCourseById
      )



export default router