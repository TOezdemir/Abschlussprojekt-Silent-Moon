import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/userContext";

export default function ProtectedRoutes(){
    const {user, isLoading, isGuest} = useUserContext()

    if(isLoading){
        return null
    }

    if(user || isGuest){
        return <Outlet />
    }
    return <Navigate to="/FirstPage"/>

}