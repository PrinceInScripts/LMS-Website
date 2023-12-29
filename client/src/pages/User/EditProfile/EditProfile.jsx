import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../../Layouts/HomeLayout/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getUserData, updateProfile } from "../../../redux/slices/authSlice";
import { BsPersonCircle } from "react-icons/bs";

function EditProfile() {
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [data,setData]=useState({
        fullName:"",
        previewImage:"",
        avatar:undefined,
        userId:useSelector(state=>state?.auth?.data?._id)
    })

    function handleImageUpload(e){
        e.preventDefault()

        const uploadImage=e.target.files[0]
        const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
        fileReader.addEventListener("load",function (){
            setData({
                ...data,
                previewImage:this.result,
                avatar: uploadImage 
            })
        })
    }

    function handleInputChange(e){
        const {name,value}=e.target
        setData({
            ...data,
            [name]:value
        })
    }
    
   async function onFormSubmit(e){
       e.preventDefault()

       if(!data.fullName || !data.avatar){
           toast.error("All fileds are mandatory")
           return;
       }

       if(data.fullName.length < 5){
          toast.error("Name cannot be less than 5 charcters")
          return;
       }

       const formData=new FormData()
       formData.append("fullName",data.fullName)
       formData.append("avatar",data.avatar)


       await dispatch(updateProfile([data.userId,formData]))
       await dispatch(getUserData())

       navigate("/user/profile")
    }
    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
              <form
              onSubmit={onFormSubmit}
              className="flex flex-col justify-center gap-5 rounded-lg p-10 text-white w-80 h-[26rem] shadow-[0_0_10px_white]"
              >
                <h1 className="text-center text-2xl font-semibold">
                    Edit Profile
                </h1>

                <label htmlFor="image_uploads" className="cursor-pointer">
                      {
                        data.previewImage ? (
                            <img 
                            src={data.previewImage}
                            className="w-36 h-28 rounded-full m-auto"
                            />
                        ) :(
                            <BsPersonCircle className="w-36 h-28 rounded-full m-auto"/>
                        )
                      }
                </label>
                <input 
                type="file"
                onChange={handleImageUpload}
                id="image_uploads"
                accept=".jpg, .png, .jpeg, .svg"
                className="hidden"
                />

                <div className="flex flex-col gap-1">
                    <label htmlFor="fullName" className="text-lg font-semibold">
                       Full name
                    </label>
                    <input
                     required
                     type="text"
                     id="fullName"
                     name="fullName"
                     placeholder="Enter your name"
                     value={data.fullName}
                     className="bg-transparent px-2 py-1 border"
                     onChange={handleInputChange}
                    />
                </div>
                <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-sm py-2 cursor-pointer text-center"
                >
                 Update Profile
                </button>
                <Link to="/user/profile">
                <p className="link text-green-600 cursor-pointer flex items-center justify-center w-full gap-2 ">
                    Go back to profile
                </p>
                </Link>

              </form>
            </div>
        </HomeLayout>
    );
}

export default EditProfile;