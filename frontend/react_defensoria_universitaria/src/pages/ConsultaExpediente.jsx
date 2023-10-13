
import { useState } from "react";
//import { useState, useEffect } from "react";
//import axios from "axios";
import { useForm } from "react-hook-form";
import { getExpediente } from "../api/registros.api";

export function ConsultaExpediente() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const [solicitud, setSolicitud] = useState("");

    const [expediente, setExpediente] = useState("");
    const [clave, setClave] = useState("");
    const [mostrarResultados, setMostrarResultados] = useState(false);
    

    const onSubmit=handleSubmit(async data=>{
        const res = await getExpediente(data.codigo)
        
        setSolicitud(res.data);




        // Aquí, normalmente realizarías la búsqueda con los valores de expediente y clave.
        // Puedes simular una búsqueda y mostrar los resultados con un mensaje.
        setMostrarResultados(true);

    });



    return (

        <div className="Relative" >
            <div className="max-w-7xl mx-auto bg-grisclaro rounded-lg shadow-lg p-10 my-10">
                <h4 className="text-granate text-3xl font-bold text-center mb-4">CONSULTA RÁPIDA POR EXPEDIENTE</h4>

                <div className="flex flex-col items-center  h-screen">
                    
                    <form  onSubmit={onSubmit} className="flex flex-col items-center">
                        <input
                        type="text"
                        placeholder="Código de Expediente"
                        {...register("codigo", )}
                        value={expediente}
                        onChange={(e) => setExpediente(e.target.value)}
                        className="mb-2 p-2 border border-gray-300 rounded"
                        />
                        {errors.nombre && <span>Este campo es requerido</span>}
                        <input
                        type="password"
                        placeholder="Clave"
                        {...register("clave", )}
                        value={clave}
                        onChange={(e) => setClave(e.target.value)}
                        className="mb-2 p-2 border border-gray-300 rounded"
                        />
                        <button
                        type="submit"
                        className="bg-granate text-white py-2 px-4 rounded self-end"
                        >
                        Buscar
                        </button>
                    </form>
                    {mostrarResultados && (
                        <div className="mt-4">
                        <h2 className=" text-lg font-bold">Resultados de la búsqueda:</h2>
                        {/* Aquí mostrarías los resultados reales de la búsqueda */}
                        <p>Nombre: {solicitud.nombre} </p>
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