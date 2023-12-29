import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../../Layouts/HomeLayout/HomeLayout";
import { getAllCourses } from "../../../redux/slices/courseSlice";
import { useEffect } from "react";
import CourseCard from "../../../components/CourseCard/CourseCard";

function CourseList() {
    const dispatch=useDispatch()

    const {courseList}=useSelector((state)=>state.course);

    async function loadCourses(){
        await dispatch(getAllCourses())
    }

    useEffect(()=>{
        loadCourses()
    },[])
    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-20 lg:pt-12 lg:pl-20 p-1 lg:p-10 flex flex-col gap-10 text-white">
               <h1 className="text-center text-2xl lg:text-4xl font-semibold mb-5">
                  Explore courses made by {" "}
                  <span className="font-bold text-yellow-500">Industry experts</span>
               </h1>
               <div className="grid grid-cols-1 ml-5 md:ml-10 md:grid-cols-2 lg:grid-cols-3 gap-y-20">
               {courseList?.map((element)=>{
                return <CourseCard key={element._id} data={element}/>
               })}
             </div>
            </div>
           

        </HomeLayout>
    );
}

export default CourseList;