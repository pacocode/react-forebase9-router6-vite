import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

const Register = () =>{

    const navigate = useNavigate();
    const {registerUser} = useContext(UserContext);
    
    const {register, handleSubmit, watch, formState: {errors}, getValues, setError } = useForm({
        defaultValues: {
            email: 'user1@test.com'
        }
    });

    //const onSubmit = async data => { //Line withour destructure
    const onSubmit = async ({email, password}) => { //Line that destructure the object
        console.log(email, password)
        try{
            await registerUser(email, password)
            console.log('Usuario Creado');
            navigate('/');
        }catch (error){
            console.log(error.code);
            if(error.code === 'auth/email-already-in-use'){
                console.log('El correo ya existe');
            }
            switch(error.code){
                case 'auth/email-already-in-use':
                    console.log('El correo ya existe');
                    setError('email',{
                        message: 'El correro ya existe'
                    })
                    break;
                default:
                    console.log('Error con el servidor');
            }
        }    
    }

    return(
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                    type="email" 
                    placeholder="Ingrese Email"
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'Campo Obligatorio'
                        },
                        pattern: {
                            value: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
                            message: 'Formato de email incorrecto'
                        }
                    })}
                />
                {
                    errors.email && <p>{errors.email.message}</p>
                }
                <input 
                    type="password" 
                    placeholder="Ingrese Password"
                    {...register('password', {
                        //Validation 1 
                        minLength: {
                            value: 6,
                            message: 'Minimo 6 caracteres'
                        },
                        //Validation 2
                        validate: {
                            checkSpaces: (v) => {
                                if(!v.trim()){
                                    return "escribe algo"
                                }
                                return true;
                                //v.trim() || 'Escribe algo'
                            }
                        }
                    } )}
                />
                {
                    errors.password && <p>{errors.password.message}</p>
                }
                <input 
                    type="password" 
                    placeholder="Confirme Password"
                    {...register('conPassword',{
                        validate: {
                            CustomErrorequals: (v) =>
                                v === getValues('password') ||
                                "No coinciden las contraseñas"
                        }
                    })}
                />
                {
                    errors.conPassword && <p>{errors.conPassword.message}</p>
                }
                <button type="submit">Register</button>
            </form>
        </>
    )
}

export default Register;