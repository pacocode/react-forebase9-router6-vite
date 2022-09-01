import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'

import { errorsFirebase } from "../utils/errorsFirebase";
import { formValidate } from "../utils/formValidate";


import FormError from "../components/FormError";
import FormInput from "../components/FormInput";



const Login = () =>{
    
    const {loginUser} = useContext(UserContext);

    const navigate = useNavigate();

    const {required, patternEmail, minLength, checkSpaces} = formValidate()

    const {register, handleSubmit, watch, formState: {errors}, getValues, setError } = useForm({
        defaultValues: {
            email: 'user1@test.com'
        }
    });

    const onSubmit = async ({email, password}) => { //Line that destructure the object
        try{
            await loginUser(email, password)
            navigate('/');
        }catch (error){
            console.log(error.code);
            setError('firebaseErrors',{
                message: errorsFirebase(error.code)
            });
        }    
    }

    return (
        <>
            <h1>Login</h1>
            <FormError error={errors.firebaseErrors} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type='email'
                    placeholder='Ingrese Email'
                    {...register('email', {
                        required,
                        pattern: patternEmail
                    })}
                ></FormInput>
                <FormError error={errors.email} />
                <FormInput
                    type='password'
                    placeholder='Ingrese Password'
                    {...register('password', {
                        //Validation 1 
                        minLength,
                        //Validation 2
                        validate: checkSpaces
                    } )}
                >
                </FormInput>
                <FormError error={errors.password} />
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login;