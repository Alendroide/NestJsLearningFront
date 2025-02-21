import { useQuery } from "@tanstack/react-query";
import axios from "axios"

export default function Tasks(){

    const getTasks = async() => {
        const tareas = await axios.get("http://localhost:3000/tasks",{
            headers : {
                'Authorization' : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoiYWxlbmRyb2lkZXl0QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiQWxlbmRyb2lkZSIsImlhdCI6MTc0MDE1MjAzNH0.OK0khtZl71fawY1RjlYadTO29q95kqv8w2mmo0Ib-NQ"
            }
        })
        return tareas.data; 
    }
    
    const { data, isLoading, isError, error } = useQuery({
        queryKey : "tareas",
        queryFn : getTasks
    })

    if(isLoading) return 'cargando...';
    if(isError) return (<>{error.message}</>);

    return(
    <>
        {data.map(user=>(
            <div>
                <p>{user.id}</p>
                <h3>{user.name}</h3>
                <p>{user.username}</p>
            </div>
        ))}
    </>
    )
}