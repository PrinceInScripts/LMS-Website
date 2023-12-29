import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import toast from "react-hot-toast";
import { isEmail, isValidPassword } from "../../helpers/regexmater";
import { useDispatch } from "react-redux";
import { createAccount } from "../../redux/slices/authSlice";

function Signup() {

    const navigate=useNavigate()
    const dispatch=useDispatch()

    const [signupDetails,setSignupDetials]=useState({
        email:'',
        fullName:'',
        password:'',
        avatar:''
    })

    const [previewImage,setPreviewImage]=useState('')

    function handleUserInput(e){
         const {name,value}=e.target;

         setSignupDetials({
            ...signupDetails,
            [name]:value
         })
    }

    

    function handleImage(e){
        e.preventDefault()
        const upoadedImage=e.target.files[0]

        if(!upoadedImage)
           return;

        setSignupDetials({
            ...signupDetails,
            avatar: upoadedImage
        })

        const fileReader=new FileReader()
        fileReader.readAsDataURL(upoadedImage)
        fileReader.addEventListener("load",function(){
            setPreviewImage(this.result)
        })
    }


    async function onFormSubmit(e){
             e.preventDefault()
            console.log(signupDetails);
        
        if(!signupDetails.fullName || !signupDetails.password || !signupDetails.email){
            toast.error("Please fill all the detials")
            return;
        }

        if(signupDetails.fullName.length <5){
            toast.error('Name should be atleast of 5 charcter');
            return;
        }

        if(!isEmail(signupDetails.email)){
            toast.error("Invalid email provided")
            return;
        }

        if(!isValidPassword(signupDetails.password)){
           toast.error("Invalid password provided, password should 6-16 character long with atleast a number and a special character")
           return;
        }

        const formData=new FormData();
        formData.append("fullName",signupDetails.fullName)
        formData.append("email",signupDetails.email)
        formData.append("password",signupDetails.password)
        formData.append("avatar",signupDetails.avatar)

        const response=await dispatch(createAccount(formData));
        console.log("response", response);
        
        if(response?.payload?.data.success){
            navigate("/")
        }

        setSignupDetials({
                email:'',
                fullName:'',
                password:'',
                avatar:''
        })

        setPreviewImage("")



    }


    return (
        <HomeLayout>
        <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
        <form onSubmit={onFormSubmit} noValidate className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 h-[36rem]  shadow-[0_0_10px_white]">
                <h1 className="text-2xl text-center font-bold">Registration Page</h1>
                <label htmlFor="image_uploads" className="cursor-pointer">
                    {previewImage ? (
                       <img className="w-24 h-24 rounded-full m-auto" src={previewImage} alt="" />
                    ) :(
                           <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
                    )}
                </label>
                <input
                onChange={handleImage}
                type="file"
                className="hidden"
                name="image_uploads"
                id="image_uploads"
                accept=".jpg, .jpeg, .png, .svg"
                />

                <div className="flex flex-col gap-1">
                    <label htmlFor="fullName" className="font-semibold">Name</label>
                    <input
                    onChange={handleUserInput}
                    value={signupDetails.fullName}
                    required
                    type="text"
                    name="fullName"
                    className="bg-transparent px-2 py-1 border"
                    placeholder="enter your username..."
                    id="fullName"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input
                     onChange={handleUserInput}
                     value={signupDetails.email}
                    required
                    type="email"
                    name="email"
                    className="bg-transparent px-2 py-1 border"
                    placeholder="enter your Email..."
                    id="email"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="font-semibold">Password</label>
                    <input
                     onChange={handleUserInput}
                     value={signupDetails.password}
                    required
                    type="password"
                    name="password"
                    className="bg-transparent px-2 py-1 border"
                    placeholder="enter your Password..."
                    id="password"
                    />
                </div>
                <button type="submit" className="mt-2 bg-yellow-800 hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer py-2 font-semibold text-lg rounded-md">
                   Create Account
                </button>
                <p className="text-center">
                            Already have an account ? <Link to="/signin" className="cusror-pointer text-accent">Login</Link>
                    </p>
             </form>
            
        </div>

        </HomeLayout>
    );
}

export default Signup;