import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function NotRequireAuth() {
    const {isLoggedIn}=useSelector((state)=>state.auth)

    return isLoggedIn?<Navigate to={"/"}/>: <Outlet/>
}


export default NotRequireAuth;