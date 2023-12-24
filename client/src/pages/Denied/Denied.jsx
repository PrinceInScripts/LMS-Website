import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Denied() {
    const navigate=useNavigate()

    useEffect(()=>{
        toast.error("Access Denied")
    },[])
    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          403
        </h1>
        <button className="mt-5">
          <a className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0" />
  
            <span
              onClick={() => navigate(-1)}
              className="relative block px-8 py-3 bg-[#1A2238] border border-current"
            >
              Go Back
            </span>
          </a>
        </button>
      </main>
    );
}

export default Denied;