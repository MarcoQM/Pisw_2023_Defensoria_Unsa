
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
                        <div className="p-4 mt-4">
                        <h1 className="text-4xl text-center font-semibold mb-6">Package status</h1>
                        <div className="container">
                        <div className="flex flex-col md:grid grid-cols-12 text-gray-50">
                            <div className="flex md:contents">
                            <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                                <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-green-500 pointer-events-none"></div>
                                </div>
                                <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center">
                                <i className="fas fa-check-circle text-white"></i>
                                </div>
                            </div>
                            <div className="bg-green-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
                                <h3 className="font-semibold text-lg mb-1">Package Booked</h3>
                                <p className="leading-tight text-justify w-full">
                                21 July 2021, 04:30 PM
                                </p>
                            </div>
                            </div>
                            <div className="flex md:contents">
                            <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                                <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-green-500 pointer-events-none"></div>
                                </div>
                                <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center">
                                <i className="fas fa-check-circle text-white"></i>
                                </div>
                            </div>
                            <div className="bg-green-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
                                <h3 className="font-semibold text-lg mb-1">Out for Delivery</h3>
                                <p className="leading-tight text-justify">
                                22 July 2021, 01:00 PM
                                </p>
                            </div>
                            </div>
                            <div className="flex md:contents">
                            <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                                <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-red-500 pointer-events-none"></div>
                                </div>
                                <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-red-500 shadow text-center">
                                <i className="fas fa-times-circle text-white"></i>
                                </div>
                            </div>
                            <div className="bg-red-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
                                <h3 className="font-semibold text-lg mb-1 text-gray-50">Cancelled</h3>
                                <p className="leading-tight text-justify">
                                Customer cancelled the order
                                </p>
                            </div>
                            </div>
                            <div className="flex md:contents">
                            <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
                                <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-gray-300 pointer-events-none"></div>
                                </div>
                                <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gray-300 shadow text-center">
                                <i className="fas fa-exclamation-circle text-gray-400"></i>
                                </div>
                            </div>
                            <div className="bg-gray-300 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
                                <h3 className="font-semibold text-lg mb-1 text-gray-400">Delivered</h3>
                                <p className="leading-tight text-justify">
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    





                        </div>
                        




                    )}
                </div>
            </div>            
        </div>

        );
    }
    export default ConsultaExpediente;