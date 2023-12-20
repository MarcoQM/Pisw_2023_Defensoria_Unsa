/*import {RegistrosList} from "../components/RegistrosList";*/
import { useEffect,useState } from "react";
import {getAllSolicitudes} from "../api/registros.api";
import {RegistroCard} from './RegistroCard';

export function RegistrosList(){
    const [registros, setRegistros]=useState([]);


    useEffect(() => {
        async function loadRegistros(){
            const res = await getAllSolicitudes();
            setRegistros(res.data);
        }
        loadRegistros();
    },[]);

    return (
        <>
        
        {registros.map((registro, index) =>(
                <RegistroCard key={registro.id} registro={registro} index={index}/>
       
       
       ))}
            
        </>     
)
}