

import { FaFile } from "react-icons/fa";
//import { RegistrosList } from "../components/RegistrosList";
//import { useState } from 'react';
import Sidebar from "../components/SideBar";

import TablaExpediente from '../components/TablaExpediente';

export function AdminPanel() {




    const sugerenciasPendientes = 10;
    const consultasPendientes = 5;
    const quejasEnProceso = 3;
    const reclamosEnProceso = 7;

   

    // eslint-disable-next-line no-unused-vars
    const handleDateFilterChange = ({ startDate, endDate }) => {
        // Lógica para filtrar los datos por fechas
        // Actualiza el estado con los datos filtrados
      };
    
      // eslint-disable-next-line no-unused-vars
      const handleSearchChange = (searchTerm) => {
        // Lógica para filtrar los datos por código de expediente
        // Actualiza el estado con los datos filtrados
      };





    
    
    

    return (
        <div className="flex flex-wrap">
            {/* Panel de Administración */}
            <div className="w-full">
                <Sidebar/>
            </div>

            {/* Contenido Principal */}
            <div className="w-screen">
                <div className="max-w-full mx-auto bg-grisclaro rounded-lg shadow-lg ml-14 p-10"> {/* cuadro gris*/}
                    <h2 className="text-granate text-4xl font-bold text-center mb-4">SOLICITUDES RECIBIDAS</h2>
                    
                    <div className="flex   space-x-4 mb-4 mt-10">
                        {/* Cuadro de Sugerencias */}
                        <button className="w-full  bg-granate hover:bg-granate-claro p-4 rounded-lg shadow-md text-center">
                            <FaFile className="text-2xl text-white mb-2" /> {/* Icono de archivo */}
                            <div className="text-2xl text-white">Quejas</div>
                            <div className="text-green-500 text-white">{sugerenciasPendientes} Pendientes</div>
                        </button>
                        
                        {/* Cuadro de Consultas */}
                        <button className="w-full bg-granate  hover:bg-granate-claro p-4 rounded-lg shadow-md text-center">
                            <FaFile className="text-2xl text-white mb-2" /> {/* Icono de archivo */}
                            <div className="text-2xl text-white">Reclamos</div>
                            <div className="text-green-500 text-white">{consultasPendientes} Pendientes</div>
                        </button>
                        
                        {/* Cuadro de Quejas en Proceso */}
                        <button className=" w-full bg-granate  hover:bg-granate-claro p-4 rounded-lg shadow-md text-center">
                            <FaFile className="text-2xl text-white mb-2" /> {/* Icono de archivo */}
                            <div className="text-2xl text-white">Sugerencias</div>
                            <div className="text-white">{quejasEnProceso} En Proceso</div>
                        </button>
                        
                        {/* Cuadro de Reclamos en Proceso */}
                        <button className="w-full bg-granate hover:bg-granate-claro p-4 rounded-lg shadow-md text-center">
                            <FaFile className="text-2xl text-white mb-2" /> {/* Icono de archivo */}
                            <div className="text-2xl text-white">Consultas</div>
                            <div className="text-green-500 text-white">{reclamosEnProceso} En Proceso</div>
                        </button>
                    </div>
                    
                   

                    <div className="container mx-auto mt-10 p-4">
                        <h1 className="text-2xl font-bold mb-4">Listado de Solicitudes</h1>
                        
                        <TablaExpediente />
                    </div>

                    

                    

                        
                </div>
            </div>
        </div>
    );
}
