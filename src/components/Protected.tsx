import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type Props = {
    children : React.ReactNode
}

export default function Protected({ children } : Props){

    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/login");
        }
        else{
            async function verifyToken() {
                try{
                    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}verify`,{},{
                        headers : {
                            'Authorization' : `Bearer ${token}`
                        }
                    });
                    const resJson = await response.data;

                    //resJson es un booleano, true si el token es valido, false de lo contrario
                    if(!resJson){
                        localStorage.removeItem("token");
                        navigate("/login");
                    }
                }
                catch(error){
                    localStorage.removeItem("token");
                    navigate("/login");
                }
                finally{
                    setLoading(false);
                }
            }
            verifyToken();
        }
    },[]);

    if(loading) return 'cargando...';

    return(
        <>
            {children}
        </>
    )
}