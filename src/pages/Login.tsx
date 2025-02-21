import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { LoginSchema, LoginType } from "../types/LoginSchema";
import axios from "axios";

export default function Login(){

    const { reset, register, formState : { errors }, handleSubmit } = useForm<LoginType>( { resolver : zodResolver(LoginSchema) } );

    async function onSubmit(data : LoginType){
        reset();
        const { email, password } = data;
        
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

                <button type="submit">Login</button>
            </form>
        </>
    )
}