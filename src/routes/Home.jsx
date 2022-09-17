import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "../components/Button";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";

import { useFireStone } from "../hooks/useFireStone";
import { errorsFirebase } from "../utils/errorsFirebase";
import { formValidate } from "../utils/formValidate";

const Home = () =>{

    const [copy, setCopy] = useState({})

    const {required, patternUrl } = formValidate();

    const {register, handleSubmit, watch, formState: {errors}, getValues, setError, resetField, setValue } = useForm();

    const { data, error, loading, getData, addData, deleteData, updateData } = useFireStone();

    const [newOriginID, setNewOriginID] = useState()

    useEffect(() => {
        //console.log(auth.currentUser);
        console.log('getData');
        getData();
    }, []);

    if(loading.getData) return <p>Loading data.....</p>
    if(error) return <p>{error}</p>

    const onSubmit = async ({url}) => {
        try{
            if(newOriginID) {
                await updateData(newOriginID, url);
                setNewOriginID('');
                //setUrlText('');
            } else {
                await addData(url);
            }
    
            resetField('url');

        } catch (error) {
            const {code, message } = errorsFirebase(error.code);
            setError(code,{
                message
            });
        }finally {

        }


        //setUrlText('');//Reinicia el valor
    }

    const handClickDelete = async (nanoid) => {
        console.log('Delete item');
        await deleteData(nanoid);
    }

    const handClickEdit = (item) => {
        console.log('Click edit');
        setValue('url',item.origin);
        //setUrlText(item.origin);
        setNewOriginID(item.nanoid);
    }

    const pathURL = window.location.href;

    const handClickCopy = async (nanoid) => {
        await navigator.clipboard.writeText(window.location.href + nanoid);
        console.log('Copiado');
        setCopy({[nanoid]: true});
    }

    return (
        <>
            <Title text="Home" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type='text'
                    placeholder='https://www.google.com'
                    {...register('url', {
                        required,
                        pattern: patternUrl
                    })}
                    label='Ingresa tu URL'
                    error={errors.url}
                >
                    <FormError error={errors.url} />
                </FormInput>
                {
                    newOriginID ? (
                        <Button 
                            type='submit'
                            text='Edit URL'
                            color='green'
                            loading={loading.updateData}
                        />
                    ) : (
                        <Button 
                            type='submit'
                            text='Add URL'
                            color='blue'
                            loading={loading.addData}
                        />
                    )
                }
            </form>
            {
                data.map(item => (
                    <div 
                        key={item.nanoid} 
                        className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-2"
                    >
                        <h5 
                            className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                        >
                            {pathURL}{item.nanoid}
                        </h5>
                        <p 
                            className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                        >
                            {item.origin}
                        </p>
                        <div className="flex space-x-2">
                            <Button 
                                type='button'
                                text='Delete'
                                color='red'
                                loading={loading[item.nanoid]}
                                onClick={() => handClickDelete(item.nanoid)}
                            />
                            <Button 
                                type='button'
                                text='Edit'
                                color='green'
                                onClick={() => handClickEdit(item)}
                            />
                            <Button 
                                type='button'
                                text={copy[item.nanoid] ? 'Copied' : 'Copy'}
                                color='blue'
                                onClick={() => handClickCopy(item.nanoid)}
                            />
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Home;