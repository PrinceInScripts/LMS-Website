import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../../Layouts/HomeLayout/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { cancelCourseBundle } from "../../../redux/slices/razorPaySlice";
import { getUserData } from "../../../redux/slices/authSlice";

function Profile() {
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const userData=useSelector(state=>state?.auth?.data)

    async function hanldeCancellation(){
        toast("Intiating cancellation")
        await dispatch(cancelCourseBundle())
        await dispatch(getUserData())
        toast.success("Cancellation complete")
        navigate("/")

    }

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <div className="my-10 flex flex-col gap-4 rounded-lg px-10 py-10 text-white w-96 h-[35rem] shadow-[0_0_10px_white]">
                   <img
                   src={userData?.avatar?.secure_url}
                   className="w-42 m-auto rounded-full border border-black"
                   />
                   <h3 className="text-xl font-semibold text-center capitalize">
                     {userData?.fullName}
                   </h3>
                   <div className="grid grid-cols-2">
                    <p>Email : </p> <p> {userData?.email}</p>
                    <p>Role : </p> <p> {userData?.role}</p>
                    <p>Subscription : </p> <p> {userData?.subscription?.status === "active" ? "Active" : "Inactive"}</p>
                   </div>

                   <div className="flex items-center justify-between gap-2">
                    <Link
                    to="/changepassword"
                    className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
                    >Change Password
                    </Link>

                    <Link
                    to="/user/editprofile"
                    className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
                    >Edit Profile</Link>
                   </div>

                   {userData?.subscription?.status === "active" && (
                    <button onClick={hanldeCancellation} className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                        Cancel subscription
                    </button>
                   )}
                </div>

            </div>
        </HomeLayout>
    );
}

export default Profile;