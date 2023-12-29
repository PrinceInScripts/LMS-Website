import { useDispatch } from "react-redux";
import HomeLayout from "../../../Layouts/HomeLayout/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { isValidPassword } from "../../../helpers/regexmater";
import toast from "react-hot-toast";
import { changePassword } from "../../../redux/slices/authSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function ChangePassword() {
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [userPassword,setUserPassword]=useState({
        oldPassword:"",
        newPassword:""
    })

    function handlePasswordChange(e){
        const {name,value}=e.target
        setUserPassword({
            ...userPassword,
            [name]:value
        })
    }

    async function handleFormSubmit(e){
        e.preventDefault()

        if(!userPassword.oldPassword || !userPassword.newPassword){
            toast.error("All filds are mandatory")
            return;
        }

        if(!isValidPassword(userPassword.newPassword)){
            toast.error("Minimum password length should be 6 with Uppercase, Lowercase, Number and Symbol")
            return;
        }

        const response=await dispatch(changePassword(userPassword))

        setUserPassword({
            oldPassword:"",
            newPassword:""
        })

        if(response?.payload?.success){
            navigate("/user/profile")
        }
    }


    return (
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
              <form
              onSubmit={handleFormSubmit}
              className="flex flex-col justify-center gap-6 rounded-lg p-10 text-white w-80 h-[26rem] shadow-[0_0_10px_white]"
              >
                <h1 className="text-center text-2xl font-bold">Change Password</h1>

                <div className="flex flex-col gap-1">
                   <label htmlFor="oldPassword" className="text-lg font-semibold">
                      Old Password
                   </label>
                   <input
                   required
                   type="password"
                   name="oldPassword"
                   id="oldPassword"
                   placeholder="Enter your old Password"
                   className="bg-transparent px-2 py-1 border"
                   value={userPassword.oldPassword}
                   onChange={handlePasswordChange}
                   />
                </div>
                <div className="flex flex-col gap-1">
                   <label htmlFor="newPassword" className="text-lg font-semibold">
                      New Password
                   </label>
                   <input
                   required
                   type="password"
                   name="newPassword"
                   id="newPassword"
                   placeholder="Enter your new Password"
                   className="bg-transparent px-2 py-1 border"
                   value={userPassword.newPassword}
                   onChange={handlePasswordChange}
                   />
                </div>

                <Link to={"/user/profile"}>
                  <p className="text-accent link text-lg font-serif cursor-pointer flex items-center justify-center w-full gap-2">
                    <AiOutlineArrowLeft/> Back to Profile
                  </p>
                </Link>

                <button
                className="w-full bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 rounded-lg py-2 font-semibold text-lg cursor-pointer"
                type="submit"
                >
                    Change Password
                </button>
              </form>
            </div>
        </HomeLayout>
    );
}

export default ChangePassword;