import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { errorsFirebase } from "../utils/errorsFirebase";
import { formValidate } from "../utils/formValidate";


import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

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
            const {code, message } = errorsFirebase(error.code);
            setError(code,{
                message
            });
        }    
    }

    return(
        <>
            <Title text='New User'/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type='email'
                    placeholder='Ingrese Email'
                    {...register('email', {
                        required,
                        pattern: patternEmail
                    })}
                    label='Ingresa tu correo'
                    error={errors.email}
                >
                    <FormError error={errors.email} />
                </FormInput>

                <FormInput
                    type='password'
                    placeholder='Ingrese Password'
                    {...register('password', {
                        //Validation 1 
                        minLength: minLength(6),
                        //Validation 2
                        validate: checkSpaces
                    } )}
                    label='Ingresa tu password'
                    error={errors.password}
                >
                    <FormError error={errors.password} />
                </FormInput>

                <FormInput
                    type='password'
                    placeholder='Confirme Password'
                    {...register('conPassword',{
                        validate: samePassword(getValues('password'))
                    })}
                    label='Repite tu password'
                    error={errors.conPassword}
                >
                    <FormError error={errors.conPassword} />
                </FormInput>
                <Button text='Register' type='submit' />
            </form>
        </>
    )
}

export default Register;