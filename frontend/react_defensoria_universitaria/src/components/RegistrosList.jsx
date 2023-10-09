/*import {RegistrosList} from "../components/RegistrosList";*/
import { useEffect,useState } from "react";
import {getAllRegistros} from "../api/registros.api";
import {RegistroCard} from './RegistroCard';

export function RegistrosList(){
    const [registros, setRegistros]=useState([]);
    
    useEffect(() => {
        async function loadRegistros(){
            const res = await getAllRegistros();
            setRegistros(res.data);
        }
        loadRegistros();
    },[]);
    return (
        <div>
        {registros.map((registro) =>(
                <RegistroCard Key={registro.id} registro={registro} />
        ))}
</div>     )
}