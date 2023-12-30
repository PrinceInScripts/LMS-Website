import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout/HomeLayout";
import toast from "react-hot-toast";
import { isEmail } from "../../helpers/regexmater";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";

function Signin() {

    const navigate=useNavigate()
    const dispatch=useDispatch()

    const [signinDetails,setSigninDetials]=useState({
        email:'',
        password:'',
    })


    function handleUserInput(e){
         const {name,value}=e.target;

         setSigninDetials({
            ...signinDetails,
            [name]:value
         })
    }


    async function onFormSubmit(e){
             e.preventDefault()
        
        if(!signinDetails.password || !signinDetails.email){
            toast.error("Please fill all the detials")
            return;
        }

        if(!isEmail(signinDetails.email)){
            toast.error("Invalid email provided")
            return;
        }
        
        const response=await dispatch(login(signinDetails));
        
        if(response?.payload?.data.success){
            navigate("/")
        }

        setSigninDetials({
                email:'',
                password:'',
        })
    }


    return (
        <HomeLayout>
        <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
        <form onSubmit={onFormSubmit} noValidate className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white  w-80 h-[30rem]  shadow-[0_0_10px_white]">
                <h1 className="text-2xl text-center font-bold">Login Page</h1>

                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input
                     onChange={handleUserInput}
                     value={signinDetails.email}
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
                     value={signinDetails.password}
                    required
                    type="password"
                    name="password"
                    className="bg-transparent px-2 py-1 border"
                    placeholder="enter your Password..."
                    id="password"
                    />
                </div>
                <div  className="relative left-40 w-32 border-none hover:border-none">
                <Link to={"/forgotPassword"}>
                   <p className="text-white border-none">
                    Forgot Password?
                    </p>
                </Link>
                </div>
                 
                
                
                
                <button type="submit" className="mt-2 bg-yellow-800 hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer py-2 font-semibold text-lg rounded-md">
                   Sign In
                </button>
                <p className="text-center">
                            Don't have an account ? <Link to="/signup" className="cusror-pointer text-accent">Signup</Link>
                    </p>
             </form>
            
        </div>

        </HomeLayout>
    );
}

export default Signin;