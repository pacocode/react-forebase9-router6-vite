import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from 'react-router-dom';

const Register = () =>{

    const [email, setEmail] = useState('user1@test.com')
    const [password, setPassword] = useState('abc123.')

    const navigate = useNavigate();

    const {registerUser} = useContext(UserContext);

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('Procesando forma', email, password);
        try{
            await registerUser(email, password)
            console.log('Usuario Creado');
            navigate('/');
        }catch (error){
            console.log(error.code);
        }

    }

    return(
        <>
            <h1>Register</h1>
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
                <button type="submit">Register</button>
            </form>
        </>
    )
}

export default Register;