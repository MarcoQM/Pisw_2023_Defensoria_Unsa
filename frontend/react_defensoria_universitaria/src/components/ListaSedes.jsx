import { useEffect, useState } from "react"
import { getAllSedes } from "../api/registros.api"

export function ListaSedes(){

    const [sedes, setSedes] = useState([]);

    useEffect(() => {
        async function loadSedes(){
            const res = await getAllSedes();
            setSedes(res.data);
            console.log(res);
        } 
        loadSedes();
        
    }, []);

    return <div> 
        {sedes.map(sede => (
            <div key={sede.id}>
                <h1>{sede.nombre}</h1>
            </div>    
        ))}
    </div>;
}