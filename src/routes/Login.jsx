import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from 'react-router-dom';


const Login = () =>{
    
    const {user, setUser} = useContext(UserContext);

    const navigate = useNavigate();

    const handleClickLogin = () => {
        setUser(true);
        navigate('/');
    }

    return (
        <>
            <h1>Home</h1>
            <h2>Login</h2>
            <h2>
                {
                    user ? 'En Linea': 'outline'
                }
            </h2>
            {/* <button onClick={()=> setUser(!user)}>Acceder</button> */}
            <button onClick={handleClickLogin}>Acceder</button>
        </>
    )
}

export default Login;