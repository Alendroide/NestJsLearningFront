import { useForm } from "react-hook-form";
import { TaskSchema, TaskType } from "../types/TaskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TasksNew() {

    const { handleSubmit, register, formState : { errors }, watch } = useForm<TaskType>({
        resolver : zodResolver(TaskSchema),
        defaultValues : {
            title : "",
            description : "",
            done : false
        }
    });

    const navigate = useNavigate();
    const titleL = watch("title");
    const descriptionL = watch("description");

    async function onSubmit(data : TaskType) {
        const token = localStorage.getItem("token");
        const result = await axios.post(`${import.meta.env.VITE_BASE_URL}tasks`, data, { headers : { 'Authorization' : `Bearer ${token}` } });
        const resJson = await result.data;
        console.log(resJson);
        navigate("/tasks");
    }

    return (
        <>
            <h1>Crear nueva tarea</h1>
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

                <p>{errors.description?.message}</p>

                <button type="submit">Crear</button>
            </form>
        </>
    )
}