import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../../Layouts/HomeLayout/HomeLayout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addCourseLecture } from "../../../redux/slices/lectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function AddLecture() {
    
    const { state } = useLocation();

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [userInput,setUserInput]=useState({
        id:state?._id,
        lecture:undefined,
        title:"",
        description:"",
        videoSrc:""
    })

    function handleInputChange(e){
         const {name,value}=e.target;
         setUserInput({
            ...userInput,
            [name]:value
         })
    }

    function getVideo(e){
        const video=e.target.files[0]
        const source=window.URL.createObjectURL(video)
        setUserInput({
            ...userInput,
            videoSrc:source,
            lecture:video
        })
    }

   async function handleFormSubmit(e){
       e.preventDefault()
       
       if(!userInput.lecture || !userInput.title || !userInput.description){
        toast.error("All fields are required")
        return
       }

       const res=await dispatch(addCourseLecture(userInput))

       if (res?.payload?.success) {
        setUserInput({
          id: state?._id,
          lecture: undefined,
          title: "",
          description: "",
          videoSrc: "",
        });
        navigate(-1)
      }
    }

    useEffect(()=>{
                if(!state){
            navigate(-1)
        }
    },[])
    return (
        <HomeLayout>
            <div className=" text-white flex flex-col items-center justify-center gap-10 mx-16 min-h-[90vh]">
        <div className="flex flex-col gap-5 lg:p-10 p-4 shadow-[0_0_10px_black] w-80 lg:w-96 rounded-lg">
          <header className="flex items-center justify-center relative">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-2 text-xl text-green-500"
            >
              <AiOutlineArrowLeft />
            </button>
            <h1 className="text-xl text-yellow-500 font-semibold">
              Add your new lecture
            </h1>
          </header>
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              value={userInput.title}
              onChange={handleInputChange}
              placeholder="Enter the title for lecture"
              className="bg-transparent px-3 py-1 border"
            />

            <textarea
              name="description"
              value={userInput.description}
              onChange={handleInputChange}
              placeholder="Enter the description for lecture"
              className="resize-none overflow-y-scroll h-24 bg-transparent px-3 py-1 border"
            />
            {userInput.videoSrc ? (
              <video
                src={userInput.videoSrc}
                muted
                controls
                controlsList="nodownload nofullscreen"
                disablePictureInPicture
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
              ></video>
            ) : (
              <div className="h-48 border flex items-center justify-center cursor-pointer">
                <label
                  htmlFor="lecture"
                  className="font-semibold text-xl cursor-pointer"
                >
                  Choose your video
                </label>
                <input
                  type="file"
                  name="lecture"
                  id="lecture"
                  onChange={getVideo}
                  accept="video/mp4,video/x-m4v,video/*"
                  className="hidden"
                />
              </div>
            )}

            <button className="btn btn-primary py-1 font-semibold text-lg">
              Add Lecture
            </button>
          </form>
        </div>
      </div>
        </HomeLayout>
    );
}

export default AddLecture;