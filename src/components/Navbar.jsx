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

    const classButtonBlue = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

    const classButtonRed = "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800";

    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link to="/" className="flex items-center">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">URL Short App</span>
                </Link>
                <div className="flex md:order-2">
                    {
                        user ? (
                        <>
                            <NavLink to={"/"} className={classButtonBlue}>Inicio</NavLink>
                            <button onClick={handleClickLogOut} className={classButtonRed}>Logout</button>
                        </>
                        ):(
                        <>
                            <NavLink to={"/login"} className={classButtonBlue}>Login</NavLink>
                            <NavLink to={"/register"} className={classButtonBlue}>Register</NavLink>
                        </>
                        )
                    }
                    
                </div>
            </div>
        </nav>
    )
}

export default Navbar;