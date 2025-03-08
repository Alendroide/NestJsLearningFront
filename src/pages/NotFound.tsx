import { Link } from "react-router-dom";

export default function NotFound(){
    return(
        <>
            <h1>404 - Not Found</h1>
            <p>La pagina que buscas no existe</p>
            <Link to="/tasks">Volver al inicio</Link>
        </>
    )
}