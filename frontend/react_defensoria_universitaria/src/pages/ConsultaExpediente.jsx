
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
            <div className="max-w-7xl mx-auto bg-grisclaro rounded-lg shadow-lg p-10 my-10 ">
                <h4 className="text-granate text-3xl font-bold text-center mb-4">CONSULTA RÁPIDA POR EXPEDIENTE</h4>

                <div className=" flex  flex-col items-center  h-screen">
                    <p className="" >Ingrese el codigo de expediente  </p>
                    <form  onSubmit={onSubmit} className="flex ">
                        
                        <input
                        type="text"
                        placeholder="Código de Expediente"
                        {...register("codigo", )}
                        value={expediente}
                        onChange={(e) => setExpediente(e.target.value)}
                        className=" flex-initial w-96  px-2 mx-4 border-2 border-gray-500 rounded-lg"
                        />
                        {errors.nombre && <span>Este campo es requerido</span>}
                        
                        <button
                        type="submit"
                        className="flex-initial w-32 bg-granate text-white py-2 px-4 rounded-lg self-end"
                        >
                        Buscar
                        </button>
                    </form>
                    {mostrarResultados && (
                    <div className=" w-full flex  flex-col items-center  h-screen mt-4  ">
                        <h4 className="text-granate text-2xl font-bold text-center ">RECLAMO XYZ-123</h4>    
                        {/* Aquí mostrarías los resultados reales de la búsqueda */}
                        <p>Organo Universitario: Departamento de Psicología </p>
                        <p>Encargado: {solicitud.nombre} </p>
                        
                    
                        <div className=" py-5 px-5 bg-gradient-to-tr from-sky-100 to-purple-200  ">
                            <p className="underline underline-offset-1 pb-5 text-base  font-bold text-center ">Estado del Trámite </p>
                            <div className=" flex items-center justify-center">
                                
                                <ol className="relative flex w-full flex-row items-center gap-x-4">
                                <div className="static flex h-12 w-full rounded-full bg-gray-400 p-1">
                                    <li className="static z-50 -ml-5 min-w-fit rounded-r-full bg-gradient-to-tl from-indigo-700 to-indigo-900 transition-transform first:ml-0 first:rounded-full last:mr-0 last:w-full hover:scale-[1.02]">
                                    <div className="flex h-10 items-center justify-between">
                                        <div className="m-2 h-3 w-3 rounded-full bg-white p-1 shadow-lg shadow-black"></div>
                                        <a  className="text-sm font-medium text-indigo-50 transition duration-300 ease-in-out hover:text-indigo-100 focus:underline">Recibido</a>
                                        <div className="m-2 flex h-8 w-8 items-center justify-center rounded-full bg-white p-1 text-indigo-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-indigo-700" viewBox="0 0 512 512"><path d="M440.9 136.3a4 4 0 000-6.91L288.16 40.65a64.14 64.14 0 00-64.33 0L71.12 129.39a4 4 0 000 6.91L254 243.88a4 4 0 004.06 0zM54 163.51a4 4 0 00-6 3.49v173.89a48 48 0 0023.84 41.39L234 479.51a4 4 0 006-3.46V274.3a4 4 0 00-2-3.46zM272 275v201a4 4 0 006 3.46l162.15-97.23A48 48 0 00464 340.89V167a4 4 0 00-6-3.45l-184 108a4 4 0 00-2 3.45z" /></svg>
                                        </div>
                                    </div>
                                    </li>

                                    <li className="static z-40 -ml-5 min-w-fit rounded-r-full bg-gradient-to-tl from-violet-700 to-violet-900 transition-transform first:ml-0 first:rounded-full last:mr-0 last:w-full hover:scale-[1.02]">
                                    <div className="flex h-10 items-center justify-between">
                                        <div className="m-2 h-3 w-3 rounded-full bg-white p-1 shadow-lg shadow-black"></div>
                                        <a href="#!" className="text-sm font-medium text-violet-50 transition duration-300 ease-in-out hover:text-violet-100 focus:underline">Aprobado</a>
                                        <div className="m-2 flex h-8 w-8 items-center justify-center rounded-full bg-white p-1 text-violet-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-violet-700" viewBox="0 0 512 512"><path d="M479.66 268.7l-32-151.81C441.48 83.77 417.68 64 384 64H128c-16.8 0-31 4.69-42.1 13.94s-18.37 22.31-21.58 38.89l-32 151.87A16.65 16.65 0 0032 272v112a64 64 0 0064 64h320a64 64 0 0064-64V272a16.65 16.65 0 00-.34-3.3zm-384-145.4v-.28c3.55-18.43 13.81-27 32.29-27H384c18.61 0 28.87 8.55 32.27 26.91 0 .13.05.26.07.39l26.93 127.88a4 4 0 01-3.92 4.82H320a15.92 15.92 0 00-16 15.82 48 48 0 11-96 0A15.92 15.92 0 00192 256H72.65a4 4 0 01-3.92-4.82z"/></svg>
                                        </div>            
                                    </div>
                                    </li>

                                    <li className="static z-30 -ml-5 min-w-fit rounded-r-full bg-gradient-to-tl from-emerald-700 to-emerald-900 transition-transform first:ml-0 first:rounded-full last:mr-0 last:w-full hover:scale-[1.02]">
                                    <div className="flex h-10 items-center justify-between">
                                        <div className="m-2 h-3 w-3 rounded-full bg-white p-1 shadow-lg shadow-black"></div>
                                        <a href="#!" className="text-sm font-medium text-indigo-50 transition duration-300 ease-in-out hover:text-emerald-100 focus:underline">En Proceso</a>
                                        <div className="m-2 flex h-8 w-8 items-center justify-center rounded-full bg-white p-1 text-emerald-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-emerald-700" viewBox="0 0 512 512"><path d="M479.66 268.7l-32-151.81C441.48 83.77 417.68 64 384 64H128c-16.8 0-31 4.69-42.1 13.94s-18.37 22.31-21.58 38.89l-32 151.87A16.65 16.65 0 0032 272v112a64 64 0 0064 64h320a64 64 0 0064-64V272a16.65 16.65 0 00-.34-3.3zm-384-145.4v-.28c3.55-18.43 13.81-27 32.29-27H384c18.61 0 28.87 8.55 32.27 26.91 0 .13.05.26.07.39l26.93 127.88a4 4 0 01-3.92 4.82H320a15.92 15.92 0 00-16 15.82 48 48 0 11-96 0A15.92 15.92 0 00192 256H72.65a4 4 0 01-3.92-4.82z"/><path d="M368 160H144a16 16 0 010-32h224a16 16 0 010 32zM384 224H128a16 16 0 010-32h256a16 16 0 010 32z"/></svg>
                                        </div>
                                    </div>
                                    </li>

                                    <li className="static z-20 -ml-5 min-w-fit rounded-r-full bg-gradient-to-tl from-amber-700 to-amber-900 transition-transform first:ml-0 first:rounded-full last:mr-0 last:w-full hover:scale-[1.02]">
                                    <div className="flex h-10 items-center justify-between">
                                        <div className="m-2 h-3 w-3 rounded-full bg-white p-1 shadow-lg shadow-black"></div>
                                        <a href="#!" className="text-sm font-medium text-amber-50 transition duration-300 ease-in-out hover:text-amber-100 focus:underline">Terminado</a>
                                        <div className="m-2 flex h-8 w-8 items-center justify-center rounded-full bg-white p-1 text-amber-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="fill-amber-700" viewBox="0 0 512 512"><path d="M447.68 220.78a16 16 0 00-1-3.08l-37.78-88.16C400.19 109.17 379 96 354.89 96H157.11c-24.09 0-45.3 13.17-54 33.54L65.29 217.7A15.72 15.72 0 0064 224v176a16 16 0 0016 16h32a16 16 0 0016-16v-16h256v16a16 16 0 0016 16h32a16 16 0 0016-16V224a16.15 16.15 0 00-.32-3.22zM144 320a32 32 0 1132-32 32 32 0 01-32 32zm224 0a32 32 0 1132-32 32 32 0 01-32 32zM104.26 208l28.23-65.85C136.11 133.69 146 128 157.11 128h197.78c11.1 0 21 5.69 24.62 14.15L407.74 208z"/></svg>
                                        </div>
                                    </div>
                                    </li>

                                </div>
                                </ol>
                            </div>
                        </div>

                        <div className="w-full flex  flex-col items-center  h-screen ">
                            <div className="w-full flex   border-2 border-yellow-400 rounded-lg items-center ">
                                <div className="flex-initial w-1/6  px-2 mx-4 ">
                                <svg xmlns="http://www.w3.org/2000/svg"  className="fill-amber-700" viewBox="0 0 30 30"><path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM11.9805 17H13.9561V7.0332H13.7441L9.62207 8.50977V10.1162L11.9805 9.38477V17Z"/></svg>
 
                                </div>
                                <div className="flex-initial w-4/6 py-2 px-4  ">
                                    <h5 className=" text-xl font-bold">Titulo del Proceso </h5>
                                    <p className=" ">Descripción del Proceso: Lorem ipsum dolor sit amet consectetur 
                                    adipisicing elit. Earum, nisi autem? Est veniam, architecto neque, at esse molestiae 
                                    odio aliquid explicabo animi quod magnam nobis eveniet, quasi impedit dolorum incidunt.</p>
                                    <p className=" ">Encargado: Dr. Jorge Luis Perez Alvarez</p>
                                    <p className=" ">Estado: Recibido</p>
                                </div>
                                <div className="flex-initial w-1/6 py-2 px-4  ">
                                    
                                    <p className=" self-end">Fecha:24/10/2023</p>
                                </div>
                            </div>

                            <div className="w-full flex mt-5  border-2 border-blue rounded-lg items-center ">
                                <div className="flex-initial w-1/6  px-2 mx-4 ">
                                <svg xmlns="http://www.w3.org/2000/svg"  className="fill-amber-700" viewBox="0 0 30 30"><path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM11.9805 17H13.9561V7.0332H13.7441L9.62207 8.50977V10.1162L11.9805 9.38477V17Z"/></svg>
 
                                </div>
                                <div className="flex-initial w-4/6 py-2 px-4  ">
                                    <h5 className=" text-xl font-bold">Titulo del Proceso </h5>
                                    <p className=" ">Descripción del Proceso: Lorem ipsum dolor sit amet consectetur 
                                    adipisicing elit. Earum, nisi autem? Est veniam, architecto neque, at esse molestiae 
                                    odio aliquid explicabo animi quod magnam nobis eveniet, quasi impedit dolorum incidunt.</p>
                                    <p className=" ">Encargado: Dr. Jorge Luis Perez Alvarez</p>
                                    <p className=" ">Estado: Recibido</p>
                                </div>
                                <div className="flex-initial w-1/6 py-2 px-4  ">
                                    
                                    <p className=" self-end">Fecha:24/10/2023</p>
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