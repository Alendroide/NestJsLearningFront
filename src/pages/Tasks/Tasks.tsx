import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { TaskType } from "../../types/TaskSchema";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Tasks(){

    const [page,setPage] = useState<number>(1);
    const [title,setTitle] = useState<string>("");
    const [done,setDone] = useState<string>("");

    const getTasks = async() => {
        const token = localStorage.getItem("token");
        let url = `${import.meta.env.VITE_BASE_URL}tasks?page=${page}`;

        //Estas condiciones se usan para agregar filtros a la url
        if (title) url += `&title=${title}`;
        if (done) url += `&done=${done}`;

        const tareas = await axios.get<TaskType[]>(url,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
        return tareas.data;
    }
    
    const { data, isLoading, isError, error } = useQuery({
        queryKey : ["tareas",page,title,done],
        queryFn : getTasks
    })

    return(
    <>
        <Link to="/tasks/new">
            <button>Crear nueva</button>
        </Link>
        <h1>Todas las tareas:</h1>
        
        <p>
            <input type="text" value={title} onChange={(e) => { setTitle(e.target.value); setPage(1) }} placeholder="Buscar tarea..."/>
            <select value={done} onChange={(e) => { setDone(e.target.value); setPage(1) }} >
                <option value="">Todos</option>
                <option value="true">Completadas</option>
                <option value="false">Pendientes</option>
            </select>
        </p>

        <div style={{display:"flex"}}>
            {page > 1 && <button onClick={() => setPage(page-1)}>Anterior</button> }
            <h4 style={{margin:"0 10px"}}>Pagina {page}</h4>
            { data && data?.length === 10 && <button onClick={() => setPage(page+1)}>Siguiente</button>}
        </div>

        {isLoading ? (<h4>Cargando...</h4>) :
        data?.length === 0 ? (<h4>No hay más tareas para mostrar...</h4>) : 
            data?.map(task=>(
                <div key={task.id} style={{border:"1px solid black",padding:"10px",margin:"10px"}}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    {task.done ?(<p style={{color:"lightgreen"}}>Completada</p>):(<p style={{color:"red"}}>Pendiente</p>)}
                    <Link to={`/tasks/edit/${task.id}`}><button>Editar</button></Link>
                </div>
            ))
        }
        {isError && (<h4>{error?.message}</h4>)}
    </>
    )
}