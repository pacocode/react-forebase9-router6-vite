//Link solo usar cuando no importa el lugar
//NavLink se usa para indicarle al usuario el lugar en donde se encuentra

import { useContext } from 'react';
import {Link, NavLink} from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const Navbar = () => {

    const {user, setUser} = useContext(UserContext);

    return (
        <div>
            {
                user ? 
                <>
                <NavLink to={"/"}>Inicio</NavLink>
                <button onClick={() => setUser(false)}>Logout</button>
                </>
                :(
                <>
                <NavLink to={"/login"}>Login</NavLink>
                <button onClick={() => setUser(true)}>Login</button>
                </>
                )
            }
        </div>
    )
}

export default Navbar;