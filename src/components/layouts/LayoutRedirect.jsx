import { useState } from "react";
import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useFireStone } from "../../hooks/useFireStone";
import Title from "../Title";

const LayoutRedirect = () => {

    const {nanoid}= useParams();
    const {searchData} = useFireStone();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        searchData(nanoid)
            .then((docSnap) => {
                if(docSnap.exists()){
                    window.location.href = docSnap.data().origin
                } else {
                    setLoading(false);
                }
            })
    },[]);

    if(loading) return <Title text='Cargando Redireccionamiento....'/>

    console.log(nanoid);
    
    return (
        <div className="mx-auto container">
            <Outlet />
        </div>
    )
}

export default LayoutRedirect;