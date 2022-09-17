import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { Navigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";

//const LayoutRequireAuth = ({children}) =>{
const LayoutRequireAuth = () =>{
    const {user} = useContext(UserContext);

    if(!user){
        return <Navigate to='/login' />
    }
    //return children
    return (
        <div className="container mx-auto">
            <Outlet />
        </div>
    )
}

export default LayoutRequireAuth;