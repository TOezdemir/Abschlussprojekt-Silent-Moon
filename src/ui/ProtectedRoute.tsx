import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/userContext";

export default function ProtectedRoutes(){
    const {user, isLoading} = useUserContext()

    if(isLoading){
        return null
    }

    if(user){
        return <Outlet />
    }
    return <Navigate to="/"/>

}