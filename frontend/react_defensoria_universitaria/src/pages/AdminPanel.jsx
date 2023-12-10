
import { getAllSolicitudes } from "../api/registros.api";
import { FaFile } from "react-icons/fa";
import { RegistroCard } from "../components/RegistroCard";
import { RegistrosList } from "../components/RegistrosList";
import { useEffect,useState } from "react";
import Sidebar from "../components/SideBar";

import SoliDetails from "../components/SoliDetails";

export function AdminPanel() {
    const sugerenciasPendientes = 10;
    const consultasPendientes = 5;
    const quejasEnProceso = 3;
    const reclamosEnProceso = 7;

    const [registros, setRegistros]=useState({});
    
    useEffect(() => {
        async function loadRegistros(){
            const res = await getAllSolicitudes();
            setRegistros(res.data);
            
        }
        loadRegistros();
    },[]);

    return (
        <div className="flex flex-wrap">
            {/* Panel de Administración */}
            <Sidebar/>
            <SoliDetails/>
            {/* Contenido Principal */}
            {/* <div className="ml-14 p-4 w-full">
                <div className="max-w-7xl mx-auto bg-grisclaro rounded-lg shadow-lg p-10 my-10"> 
                    <h2 className="text-granate text-3xl font-bold text-center mb-4">SOLICITUDES RECIBIDAS POR DEFENSORIA UNIVERSITARIA</h2>
                    <div className="flex space-x-4 mb-4">
                       
                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <FaFile className="text-2xl text-gray-600 mb-2" /> 
                            <div className="text-2xl">Sugerencias</div>
                            <div className="text-green-500">{sugerenciasPendientes} Pendientes</div>
                        </div>
                        
                       
                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <FaFile className="text-2xl text-gray-600 mb-2" /> 
                            <div className="text-2xl">Consultas</div>
                            <div className="text-green-500">{consultasPendientes} Pendientes</div>
                        </div>
                        
                      
                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <FaFile className="text-2xl text-gray-600 mb-2" /> 
                            <div className="text-2xl">Quejas en Proceso</div>
                            <div className="text-green-500">{quejasEnProceso} En Proceso</div>
                        </div>
                        
                      
                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <FaFile className="text-2xl text-gray-600 mb-2" />
                            <div className="text-2xl">Reclamos en Proceso</div>
                            <div className="text-green-500">{reclamosEnProceso} En Proceso</div>
                        </div>
                    </div>

                    <a className="text-black text-2xl font-bold text-center mb-4">Listado de solicitudes</a>
                   
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nombre
                                    </th> 
                                </tr>
                            </thead>
                            <tbody>
                               
                                <RegistrosList/>
                            </tbody>

                            
                        </table>
                    </div>
                </div>
            </div> */}  
            
            
        </div>
    );
}
