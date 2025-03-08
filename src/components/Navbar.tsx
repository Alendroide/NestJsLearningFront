import { Link } from "react-router-dom";

export default function Navbar(){
    return(
        <>
            <div style={{display : "flex", alignItems : "center"}}>
                <h3>PepeNotes</h3>
                <div style={{marginLeft : "auto", display : "flex"}}>
                    <p style={{marginRight : "10px"}}><Link to={'/tasks'}>Tareas</Link></p>
                    <p style={{marginRight : "10px"}}><Link to={'/maps'}>Maps</Link></p>
                </div>
            </div>
            <hr />
        </>
    )
}