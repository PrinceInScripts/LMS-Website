import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'

function NotFound() {
    const navigate=useNavigate()

    useEffect(()=>{
        toast.error("Page is not found")
    },[])
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <h1 className="text-9xl font-extrabold text-white">404</h1>
            <button className="mt-5">
                <a onClick={() => navigate(-1)} className="relative inline-block text-sm font-medium text-[#FF6A3D] active:text-yellow-500 focus:outline-none">
                    <button className="relative block px-8 py-3 btn btn-outline btn-secondary">
                        Go Back
                    </button>
                </a>
            </button>
        </div>
    );
}

export default NotFound;