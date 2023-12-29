import { useDispatch } from "react-redux";
import HomeLayout from "../../../Layouts/HomeLayout/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { createNewCourse } from "../../../redux/slices/courseSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CreateCourse() {

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [userInput,setUserInput]=useState({
        title:"",
        description:"",
        category:"",
        createdBy:"",
        thumbail:null,
        previewImage:""
    })

 
    function handleImageUpload(e){
        e.preventDefault()
        const uploadedImage=e.target.files[0]

        if(uploadedImage){
            const fileReader=new FileReader()
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener("load",function(){
                setUserInput({
                    ...userInput,
                    thumbail:uploadedImage,
                    previewImage:this.result
                })
            })
        }
    }

    function handleUserInput(e){
        const {name,value}=e.target;
        setUserInput({
            ...userInput,
            [name]:value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault()

        if(!userInput.title || !userInput.description || !userInput.createdBy || !userInput.thumbail)
        {
            toast.error("All fileds are mandatory")
            return;
        }
        const response=await dispatch(createNewCourse(userInput))
        
        if(response?.payload?.success){
          setUserInput({
            title:"",
            description:"",
            category:"",
            createdBy:"",
            thumbail:null,
            previewImage:""
          })
          navigate("/courses")
        }
    }

    return (
        <HomeLayout>
            <div className="h-[90vh] flex items-center justify-center">
                <form
                onSubmit={onFormSubmit}
                className="flex flex-col justify-center mt-20 lg:mt-0 gap-5 rounded-lg p-4 lg:p-10 text-white w-[350px] lg:w-[700px] lg:h-[450px] my-10 shadow-[0_0_10px_white] relative"
                >
                    <div className="flex items-center justify-center gap-4 lg:block">
                    <Link onClick={()=>navigate(-1)} className="lg:absolute lg:top-8 top-2 text-2xl link text-accent cursor-pointer">
                  <AiOutlineArrowLeft/>
                  </Link>
                  <h1 className="text-center text-2xl font-bold mt-2">Create New Course</h1>

                    </div>
                  

                  <main className="lg:grid lg:grid-cols-2 grid grid-cols-1 gap-x-10">
                     <div className="gap-y-6 flex gap-2 items-center justify-center lg:block lg:gap-0">
                         <div>
                            <label htmlFor="image_uploads" className="cursor-pointer text-center">
                                {userInput?.previewImage ? (
                                    <img
                                    src={userInput?.previewImage}
                                    className="lg:w-full lg:h-44 m-auto border"
                                    />
                                ) : (
                                   <div className="w-full h-44 m-auto flex items-center justify-center border">
                                       <h1 className="font-bold text-sm lg:text-lg">Upload course thumnail</h1>
                                   </div>
                                )}
                            </label>
                            <input 
                            className="hidden"
                            type="file"
                            id="image_uploads"
                            accept=".jpg, .png, .jpeg, .svg"
                            onChange={handleImageUpload}
                            name="image_uploads"
                            />
                         </div>
                         <div className="flex flex-col gap-1">
                             <label htmlFor="title" className="text-lg font-semibold">Course title</label>
                             <input 
                              required
                              type="text"
                              name="title"
                              id="title"
                              placeholder="enter the title of the course"
                              onChange={handleUserInput}
                              value={userInput.title}
                              className="px-2 bg-transparent py-1 border"
                             />
                         </div>
                     </div>

                     <div className="flex flex-col gap-1">
                         <div className="flex flex-col gap-1">
                         <label htmlFor="createdBy" className="text-lg font-semibold">Instructor</label>
                             <input 
                              required
                              type="text"
                              name="createdBy"
                              id="createdBy"
                              placeholder="enter the instructor of the course"
                              onChange={handleUserInput}
                              value={userInput.createdBy}
                              className="px-2 bg-transparent py-1 border"
                             />
                         </div>
                         <div className="flex flex-col gap-1">
                         <label htmlFor="category" className="text-lg font-semibold">Category</label>
                             <input 
                              required
                              type="text"
                              name="category"
                              id="category"
                              placeholder="enter the category of the course"
                              onChange={handleUserInput}
                              value={userInput.category}
                              className="px-2 bg-transparent py-1 border"
                             />
                         </div>
                         <div className="flex flex-col gap-1">
                         <label htmlFor="description" className="text-lg font-semibold">Description</label>
                             <textarea 
                              required
                              type="text"
                              name="description"
                              id="description"
                              placeholder="enter the description of the course"
                              onChange={handleUserInput}
                              value={userInput.description}
                              className="px-2 bg-transparent py-1 border h-24 resize-none overflow-y-scroll"
                             />
                         </div>
                     </div>
                  </main>
                  <button 
                  type="submit"
                  className="w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300"
                  >
                    Create Course
                  </button>
                </form>

            </div>
        </HomeLayout>
    );
}

export default CreateCourse;