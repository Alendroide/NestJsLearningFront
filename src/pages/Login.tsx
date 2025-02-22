import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { LoginSchema, LoginType } from "../types/LoginSchema";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){
    
    const navigate = useNavigate();
    const { register, formState : { errors }, handleSubmit } = useForm<LoginType>( { resolver : zodResolver(LoginSchema) } );
    const [resErrors, setResErrors] = useState<string | undefined>(undefined);

    async function onSubmit(data : LoginType){
        const { email, password } = data;
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}login`, { email, password });
        const resJson = await response.data;
        
        if(!resJson.token){
            setResErrors(resJson.message);
        }
        else{
            setResErrors(undefined);
            localStorage.setItem("token", resJson.token);
            navigate("/tasks");
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Correo:</label>
                <p>
                    <input
                        {...register("email")}
                        type="email"
                    />
                </p>
                
                <p>{errors?.email?.message}</p>

                <label htmlFor="password">Contraseña:</label>
                <p>
                <input
                    {...register("password")}
                    type="password"
                />
                </p>

                <p>{errors?.password?.message}</p>

                <p style={{color:'red'}}>{resErrors}</p>

                <button type="submit">Login</button>
            </form>
        </>
    )
}