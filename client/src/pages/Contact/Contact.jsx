import toast from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout/HomeLayout";
import { useState } from "react";
import { isEmail } from "../../helpers/regexmater";
import axiosInstance from "../../config/axiosInstance";

function Contact() {

    const [userInput,setUserInput]=useState({
        name:"",
        email:"",
        message:""
    })

    function handleUserChange(e){
        const {name,value}=e.target

        setUserInput({
            ...userInput,
            [name]:value
        })
    }

   async function onFormSubmit(e){
        e.preventDefault()

        if(!userInput.name || !userInput.email || !userInput.message){
            toast.error("All filds are required")
            return;
        }

        if(!isEmail(userInput.email)){
            toast.error("Invalid email provided")
            return;
        }

        try {
            const response=axiosInstance.post('/contact',userInput)
            toast.promise(response,{
                loading:"Submitting your query",
                success:"Form submitted successfully",
                error:"Falid to submit the form"
            })
            const responseData=await response;
            
            if(responseData?.data?.success){
                setUserInput({
                    email:"",
                    name:"",
                    message:""
                })
            }
        } catch (e) {
            toast.error("Operation faild.....")
        }
    }
    return (
       <HomeLayout>
          <div className="flex items-center justify-center h-[90vh]">
        <form onSubmit={onFormSubmit} noValidate className="flex flex-col items-center justify-center gap-2 p-5 w-[22rem] rounded-md text-white">
              <h1 className="text-3xl font-semibold">Contact Form</h1>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="name">Name</label>
                    <input 
                    onChange={handleUserChange}
                    value={userInput.name}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="enter your name"
                    className="bg-white border px-2 py-1 rounded-sm text-black"
                    />
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="email">Email</label>
                    <input 
                    onChange={handleUserChange}
                    value={userInput.email}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="enter your email"
                    className="bg-white border px-2 py-1 rounded-sm text-black"
                    />
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="message">Message</label>
                    <textarea 
                    onChange={handleUserChange}
                    value={userInput.message}
                    type="text"
                    id="message"
                    name="message"
                    placeholder="enter your message"
                    className="bg-white border px-2 py-1 rounded-sm text-black resize-none h-40"
                    />
                </div>
                <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                        Submit
                    </button>
            
        </form>
            
        </div>
       </HomeLayout>
    );
}

export default Contact;