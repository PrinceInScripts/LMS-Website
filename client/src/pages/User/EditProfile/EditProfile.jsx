import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../../Layouts/HomeLayout/HomeLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { getUserData, updateProfile } from "../../../redux/slices/authSlice";

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
        FileReader.readAsDataUrl(uploadImage)
        FileReader.addEventListener("load",function (){
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
            
        </HomeLayout>
    );
}

export default EditProfile;