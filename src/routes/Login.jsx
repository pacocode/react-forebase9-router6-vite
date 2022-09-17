import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'

import { errorsFirebase } from "../utils/errorsFirebase";
import { formValidate } from "../utils/formValidate";


import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

const Login = () =>{
    
    const {loginUser} = useContext(UserContext);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const {required, patternEmail, minLength, checkSpaces} = formValidate();

    const {register, handleSubmit, watch, formState: {errors}, getValues, setError } = useForm({
        defaultValues: {
            email: 'user1@test.com'
        }
    });

    const onSubmit = async ({email, password}) => { //Line that destructure the object
        try{
            setLoading(true);
            await loginUser(email, password)
            navigate('/');
        }catch (error){
            console.log(error.code);
            const {code, message } = errorsFirebase(error.code);
            setError(code,{
                message
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Title text='Login'/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type='email'
                    placeholder='Ingrese Email'
                    {...register('email', {
                        required,
                        pattern: patternEmail
                    })}
                    label='Ingresa tu Correo'
                    error={errors.email}
                >
                    <FormError error={errors.email} />
                </FormInput>
                
                <FormInput
                    type='password'
                    placeholder='Ingrese Password'
                    {...register('password', {
                        //Validation 1 
                        minLength,
                        //Validation 2
                        validate: checkSpaces
                    } )}
                    label='Ingresa Password'
                    error={errors.password}
                >
                    <FormError error={errors.password} />
                </FormInput>
                <Button text='Login' type='submit' loading={loading}></Button>
            </form>
        </>
    )
}

export default Login;