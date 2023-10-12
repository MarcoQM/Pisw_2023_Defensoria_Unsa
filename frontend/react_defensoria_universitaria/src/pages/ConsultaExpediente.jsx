
import { useState } from "react";
//import { useState, useEffect } from "react";
//import axios from "axios";

export function ConsultaExpediente() {

    const [expediente, setExpediente] = useState("");
    const [clave, setClave] = useState("");
    const [mostrarResultados, setMostrarResultados] = useState(false);

    const handleBuscar = () => {
        // Aquí, normalmente realizarías la búsqueda con los valores de expediente y clave.
        // Puedes simular una búsqueda y mostrar los resultados con un mensaje.
        setMostrarResultados(true);
    };



    return (

        <div className="Relative" >
            <div className="max-w-7xl mx-auto bg-grisclaro rounded-lg shadow-lg p-10 my-10">
                <h4 className="text-granate text-3xl font-bold text-center mb-4">CONSULTA RÁPIDA POR EXPEDIENTE</h4>

                <div className="flex flex-col items-center  h-screen">
                    
                    <form className="flex flex-col items-center">
                        <input
                        type="text"
                        placeholder="Código de Expediente"
                        value={expediente}
                        onChange={(e) => setExpediente(e.target.value)}
                        className="mb-2 p-2 border border-gray-300 rounded"
                        />
                        <input
                        type="password"
                        placeholder="Clave"
                        value={clave}
                        onChange={(e) => setClave(e.target.value)}
                        className="mb-2 p-2 border border-gray-300 rounded"
                        />
                        <button
                        type="button"
                        onClick={handleBuscar}
                        className="bg-granate text-white py-2 px-4 rounded self-end"
                        >
                        Buscar
                        </button>
                    </form>
                    {mostrarResultados && (
                        <div className="mt-4">
                        <h2 className=" text-lg font-bold">Resultados de la búsqueda:</h2>
                        {/* Aquí mostrarías los resultados reales de la búsqueda */}
                        <p>Nombre: John Doe</p>
                        <p>Fecha de Expedición: 2023-10-12</p>
                        <p>...</p>
                        </div>
                    )}
                </div>
            </div>            
        </div>

        );
    }
    export default ConsultaExpediente;