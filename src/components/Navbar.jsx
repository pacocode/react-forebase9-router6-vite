//Link solo usar cuando no importa el lugar
//NavLink se usa para indicarle al usuario el lugar en donde se encuentra

import { useContext } from 'react';
import {Link, NavLink} from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const Navbar = () => {

    const {user, signOutUser} = useContext(UserContext);

    const handleClickLogOut = async () => {
        try{
            await signOutUser();

        } catch (error){
            console.log(error.code)
        }
    }

    return (
        <div>
            {
                user ? (
                <>
                    <NavLink to={"/"}>Inicio</NavLink>
                    <button onClick={handleClickLogOut}>Logout</button>
                </>
                ):(
                <>
                    <NavLink to={"/login"}>Login</NavLink>
                    <NavLink to={"/register"}>Register</NavLink>
                </>
                )
            }
        </div>
    )
}

export default Navbar;