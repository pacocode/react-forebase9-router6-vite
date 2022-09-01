import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { errorsFirebase } from "../utils/errorsFirebase";
import { formValidate } from "../utils/formValidate";


import FormError from "../components/FormError";
import FormInput from "../components/FormInput";

const Register = () =>{

    const navigate = useNavigate();
    const {registerUser} = useContext(UserContext);
    const {required, patternEmail, minLength, checkSpaces, samePassword} = formValidate()
    
    const {register, handleSubmit, watch, formState: {errors}, getValues, setError } = useForm({
        defaultValues: {
            email: 'user1@test.com'
        }
    });

    //const onSubmit = async data => { //Line withour destructure
    const onSubmit = async ({email, password}) => { //Line that destructure the object
        try{
            await registerUser(email, password)
            navigate('/');
        }catch (error){
            console.log(error.code);
            setError('firebaseErrors',{
                message: errorsFirebase(error.code)
            });
        }    
    }

    return(
        <>
            <h1>Register</h1>
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
                <FormInput
                    type='password'
                    placeholder='Confirme Password'
                    {...register('conPassword',{
                        validate: samePassword(getValues)
                    })}
                >
                </FormInput>
                <FormError error={errors.conPassword} />
                <button type="submit">Register</button>
            </form>
        </>
    )
}

export default Register;