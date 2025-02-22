import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskSchema, TaskType } from "../types/TaskSchema";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function TasksEdit(){

    const navigate = useNavigate();
    const { id } = useParams();
    const [task,setTask] = useState<TaskType>();

    const { reset, handleSubmit, register, formState : { errors }, watch } = useForm<TaskType>({
        resolver : zodResolver(TaskSchema),
        defaultValues : {
            title : task?.title || "",
            description : task?.description || "",
        }
    })

    useEffect(()=>{
        const getTask = async() => {
            const token = localStorage.getItem("token");
            const tarea = await axios.get<TaskType | any>(`${import.meta.env.VITE_BASE_URL}tasks/${id}`,{
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            })
            if(tarea?.data?.status === 404) return navigate("/tasks");
            setTask(tarea.data);
            reset(tarea.data);
        }
        getTask();
    },[reset]);


    const titleL = watch("title");
    const descriptionL = watch("description");

    async function onSubmit(data : TaskType) {
        const token = localStorage.getItem("token");
        const result = await axios.put(`${import.meta.env.VITE_BASE_URL}tasks/${id}`, data, { headers : { 'Authorization' : `Bearer ${token}` } });
        const resJson = await result.data;
        if(resJson?.status === 404) alert("Tarea no encontrada");
        navigate("/tasks");
    }

    return(
        <>
            <h1>Editar tarea</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <label htmlFor="title">Título</label>
                <p>
                    <input {...register("title")} type="text" />
                    <span style={ titleL.length > 100 ? {color : "red"} : {}}> {titleL.length} / 100 </span>
                </p>
                <p>{errors.title?.message}</p>
                
                <label htmlFor="description">Descripción</label>
                <p>
                    <textarea {...register("description")} ></textarea>
                    <span style={ descriptionL.length > 191 ? {color : "red"} : {}}> {descriptionL.length} / 191 </span>
                </p>

                <p>
                    <input {...register("done")} type="checkbox" />
                </p>

                <p>{errors.description?.message}</p>

                <button type="submit">Crear</button>
            </form>
        </>
    )
}