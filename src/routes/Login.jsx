import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from 'react-router-dom';


const Login = () =>{

    const [email, setEmail] = useState('user1@test.com')
    const [password, setPassword] = useState('abc123.')
    
    const {loginUser} = useContext(UserContext);

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('Procesando forma', email, password);
        try{
            await loginUser(email, password);
            console.log('Usuario logeado');
            navigate('/');
        }catch (error){
            console.log(error.code);
        }

    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Ingrese Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Ingrese Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login;