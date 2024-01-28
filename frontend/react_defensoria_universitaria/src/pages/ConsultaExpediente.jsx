
import { useState } from "react";
//import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { getExpediente } from "../api/registros.api";
import { getDni } from "../api/registros.api";

export function ConsultaExpediente() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const [solicitud, setSolicitud] = useState("");
    //const [clave, setClave] = useState("");
    const [expediente, setExpediente] = useState("");
    const [dni, setDni] = useState("");
    const [mostrarResultados, setMostrarResultados] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    

    const onSubmit=handleSubmit(async data=>{
        const res = await getExpediente(data.codigo, data.dni)
        
        setSolicitud(res.data);
        console.log(res.data)




        // Aquí, normalmente realizarías la búsqueda con los valores de expediente y clave.
        // Puedes simular una búsqueda y mostrar los resultados con un mensaje.
        setMostrarResultados(true);

    });

    {showEditForm && (
        <EditFormModal
          solicitud={solicitud}
          onClose={() => setShowEditForm(false)}
        />
      )}

    return (

        <div className="w-screen" >
          
            <div className="max-w-7xl mx-auto  bg-grisclaro rounded-lg shadow-lg md:p-10 my-10 h-full">
                <h4 className="text-granate-900 text-3xl font-bold text-center mb-4">CONSULTA RÁPIDA POR EXPEDIENTE</h4>

                <div className=" flex  flex-col items-center ">
                    <p className="mb-5" style={{ fontWeight: 'bold' }}>Ingrese el codigo de expediente  </p>
                    <form onSubmit={onSubmit} className="flex flex-col">
                        <input
                        type="text"
                        placeholder="Código de Expediente"
                        {...register("codigo")}
                        value={expediente}
                        onChange={(e) => setExpediente(e.target.value)}
                        className="mb-2 p-2 border-2 border-gray-500 rounded-lg"
                        />
                        <p className="mb-5" style={{ fontWeight: 'bold' }}>Ingrese su número de DNI  </p>
                        <input
                        type="text"
                        placeholder="Número de DNI"
                        {...register("dni")}
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        className="mb-2 p-2 border-2 border-gray-500 rounded-lg"
                        />
                        <button
                        type="submit"
                        className="w-32 bg-granate-900 text-white py-2 px-4 rounded-lg self-end"
                        >
                        Buscar
                        </button>
                    </form>
                    {mostrarResultados && (
                    
                    <div className=" w-full flex flex-col items-center mt-4">
                         <h4 className="text-granate-900 text-2xl font-bold ">RECLAMO {solicitud.codigo_expediente}</h4>    
                        {/* Aquí mostrarías los resultados reales de la búsqueda */}
                        <p className=" "><strong>Solicitado por:</strong> {solicitud.nombre} {solicitud.apellido}</p>

                        <div className=" py-5 px-5 bg-gradient-to-tr from-sky-100 to-purple-200  ">
                            <p className="underline underline-offset-1 pb-5 text-base  font-bold text-center ">Estado del Trámite </p>
                            <div className=" flex items-center justify-center">
                                
                                <ol className="relative flex w-full  flex-row items-center gap-x-4">
                                <div className="static flex h-12 w-full  rounded-full bg-gray-400 p-1">
                                    {(solicitud.estado_solicitud >=1) && (
                                            <li className="static z-40 -ml-5 min-w-fit rounded-r-full bg-gradient-to-tl from-yellow-500 to-yellow-600 transition-transform first:ml-0 first:rounded-full last:mr-0 last:w-full hover:scale-[1.02]">
                                            <div className="flex h-10 items-center justify-between">
                                                <div className="m-2 h-3 w-3 rounded-full bg-white p-1 shadow-lg shadow-black"></div>
                                                <a  className="text-sm font-medium text-indigo-50 transition duration-300 ease-in-out hover:text-indigo-100 focus:underline">Recibido</a>
                                                <div className="m-2 flex h-8 w-8 items-center justify-center rounded-full bg-white p-1 text-indigo-700">
                                                    <svg className="fill-yellow-400  w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM11.9805 17H13.9561V7.0332H13.7441L9.62207 8.50977V10.1162L11.9805 9.38477V17Z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                            </li>
                                            
                                        
                                    )}
                                    {(solicitud.estado_solicitud === 2 || solicitud.estado_solicitud === 3 || solicitud.estado_solicitud ===4) &&  (
                                        
                                        <li className="static z-30 -ml-5 min-w-fit rounded-r-full bg-gradient-to-tl from-red-500 to-red-700 transition-transform first:ml-0 first:rounded-full last:mr-0 last:w-full hover:scale-[1.02]">
                                        <div className="flex h-10 items-center justify-between">
                                            <div className="m-2 h-3 w-3 rounded-full bg-white p-1 shadow-lg shadow-black"></div>
                                            <a href="#!" className="text-sm font-medium text-violet-50 transition duration-300 ease-in-out hover:text-violet-100 focus:underline">{solicitud.estado_solicitud_nombre }</a>
                                            <div className="m-2 flex h-8 w-8 items-center justify-center rounded-full bg-white p-1 text-violet-700">
                                                <svg className="fill-red-500 w-10" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM9.15723 17H15.9795V15.4072H11.7002L13.9629 13.0215C14.5827 12.3424 15.0202 11.7477 15.2754 11.2373C15.5306 10.7269 15.6582 10.2256 15.6582 9.7334C15.6582 8.83561 15.3734 8.14062 14.8037 7.64844C14.2386 7.15625 13.4434 6.91016 12.418 6.91016C11.748 6.91016 11.1488 7.05371 10.6201 7.34082C10.0915 7.62337 9.68131 8.0153 9.38965 8.5166C9.10254 9.0179 8.95898 9.57161 8.95898 10.1777H10.9414C10.9414 9.67643 11.069 9.27311 11.3242 8.96777C11.584 8.65788 11.9372 8.50293 12.3838 8.50293C12.7985 8.50293 13.1175 8.63053 13.3408 8.88574C13.5641 9.13639 13.6758 9.48275 13.6758 9.9248C13.6758 10.2484 13.5687 10.5902 13.3545 10.9502C13.1449 11.3102 12.819 11.7318 12.377 12.2148L9.15723 15.6465V17Z" />
                                                </svg>
                                            </div>            
                                        </div>
                                        </li>
                                    )}
                                    {(solicitud.estado_solicitud >4) &&  (
                                        
                                        <li className="static z-30 -ml-5 min-w-fit rounded-r-full bg-gradient-to-tl from-red-500 to-red-700 transition-transform first:ml-0 first:rounded-full last:mr-0 last:w-full hover:scale-[1.02]">
                                        <div className="flex h-10 items-center justify-between">
                                            <div className="m-2 h-3 w-3 rounded-full bg-white p-1 shadow-lg shadow-black"></div>
                                            <a href="#!" className="text-sm font-medium text-violet-50 transition duration-300 ease-in-out hover:text-violet-100 focus:underline">Admitido</a>
                                            <div className="m-2 flex h-8 w-8 items-center justify-center rounded-full bg-white p-1 text-violet-700">
                                                <svg className="fill-red-500 w-10" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM9.15723 17H15.9795V15.4072H11.7002L13.9629 13.0215C14.5827 12.3424 15.0202 11.7477 15.2754 11.2373C15.5306 10.7269 15.6582 10.2256 15.6582 9.7334C15.6582 8.83561 15.3734 8.14062 14.8037 7.64844C14.2386 7.15625 13.4434 6.91016 12.418 6.91016C11.748 6.91016 11.1488 7.05371 10.6201 7.34082C10.0915 7.62337 9.68131 8.0153 9.38965 8.5166C9.10254 9.0179 8.95898 9.57161 8.95898 10.1777H10.9414C10.9414 9.67643 11.069 9.27311 11.3242 8.96777C11.584 8.65788 11.9372 8.50293 12.3838 8.50293C12.7985 8.50293 13.1175 8.63053 13.3408 8.88574C13.5641 9.13639 13.6758 9.48275 13.6758 9.9248C13.6758 10.2484 13.5687 10.5902 13.3545 10.9502C13.1449 11.3102 12.819 11.7318 12.377 12.2148L9.15723 15.6465V17Z" />
                                                </svg>
                                            </div>            
                                        </div>
                                        </li>
                                    )}
                                    
                                    {solicitud.estado_solicitud >= 5 && (
                                        <li className="static z-20 -ml-5 min-w-fit rounded-r-full bg-gradient-to-tl from-indigo-700 to-indigo-900 transition-transform first:ml-0 first:rounded-full last:mr-0 last:w-full hover:scale-[1.02]">
                                        <div className="flex h-10 items-center justify-between">
                                            <div className="m-2 h-3 w-3 rounded-full bg-white p-1 shadow-lg shadow-black"></div>
                                            <a href="#!" className="text-sm font-medium text-indigo-50 transition duration-300 ease-in-out hover:text-emerald-100 focus:underline">En proceso</a>
                                            <div className="m-2 flex h-8 w-8 items-center justify-center rounded-full bg-white p-1 text-emerald-700">
                                                <svg className="fill-indigo-800 w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12.2197 11.1484H11.167V12.6934H12.2129C13.3066 12.6934 13.8535 13.1901 13.8535 14.1836C13.8535 14.5938 13.7191 14.9242 13.4502 15.1748C13.1859 15.4209 12.819 15.5439 12.3496 15.5439C11.9395 15.5439 11.5931 15.4255 11.3105 15.1885C11.0326 14.9515 10.8936 14.6462 10.8936 14.2725H8.91797C8.91797 15.1338 9.23242 15.8265 9.86133 16.3506C10.4948 16.8747 11.3083 17.1367 12.3018 17.1367C13.3636 17.1367 14.2158 16.8701 14.8584 16.3369C15.5055 15.8037 15.8291 15.0951 15.8291 14.2109C15.8291 13.6641 15.6901 13.1901 15.4121 12.7891C15.1387 12.388 14.7217 12.0872 14.1611 11.8867C14.6123 11.6816 14.9769 11.3877 15.2549 11.0049C15.5329 10.6221 15.6719 10.2028 15.6719 9.74707C15.6719 8.86296 15.3734 8.17025 14.7764 7.66895C14.1794 7.16309 13.3545 6.91016 12.3018 6.91016C11.6956 6.91016 11.1396 7.02637 10.6338 7.25879C10.1325 7.49121 9.74056 7.81478 9.45801 8.22949C9.18001 8.63965 9.04102 9.10449 9.04102 9.62402H11.0166C11.0166 9.29134 11.1442 9.02246 11.3994 8.81738C11.6546 8.60775 11.9714 8.50293 12.3496 8.50293C12.7689 8.50293 13.097 8.61458 13.334 8.83789C13.5755 9.0612 13.6963 9.37337 13.6963 9.77441C13.6963 10.1891 13.5755 10.5218 13.334 10.7725C13.0924 11.0231 12.721 11.1484 12.2197 11.1484Z"/>
                                                </svg>    
                                            </div>
                                        </div>
                                        </li>
                                    )}
                                    {solicitud.estado_solicitud === 6 && (
                                        <li className="static z-10 -ml-5 min-w-fit rounded-r-full bg-gradient-to-tl from-emerald-700 to-emerald-900 transition-transform first:ml-0 first:rounded-full last:mr-0 last:w-full hover:scale-[1.02]">
                                        <div className="flex h-10 items-center justify-between">
                                            <div className="m-2 h-3 w-3 rounded-full bg-white p-1 shadow-lg shadow-black"></div>
                                            <a href="#!" className="text-sm font-medium text-amber-50 transition duration-300 ease-in-out hover:text-amber-100 focus:underline">Finalizado</a>
                                            <div className="m-2 flex h-8 w-8 items-center justify-center rounded-full bg-white p-1 text-amber-700">
                                                <svg className="fill-emerald-900 w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15.1299 13.2539H14.002V7.04688H12.0059L7.85645 13.6025L7.94531 14.8467H12.0264V17H14.002V14.8467H15.1299V13.2539ZM12.0264 13.2539H9.8252L11.8965 9.96582L12.0264 9.74023V13.2539Z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        </li>
                                    )}
                                </div>
                                </ol>
                                
                            </div>
                        </div>

                        <div className="w-full flex  flex-col items-center   ">

                            {solicitud.estado_solicitud >= 1 && (
                            <div className="w-full flex   border-2 border-yellow-400 rounded-lg md:items-center ">
                                <div className="flex-initial w-1/6  md:px-2 md:mx-4 ">
                                    <svg className="fill-yellow-400 lg:w-32 md:w-20 sm:w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM11.9805 17H13.9561V7.0332H13.7441L9.62207 8.50977V10.1162L11.9805 9.38477V17Z"/>
                                    </svg>
                                </div>
                                <div className="flex-initial w-4/6 py-2 px-4  ">
                                    <h4 className="text-granate-900 text-2xl font-bold ">Recibido</h4>    
                                    <p className=" "><strong>Solicita:</strong> {solicitud.solicita}</p>
                                </div>
                                <div className="flex-initial w-1/6 py-2 px-4  ">
                                    
                                <p className=" self-end">Fecha: {solicitud.fecha_modificacion}  </p>
                                </div>
                            </div>
                            )}
                            {(solicitud.estado_solicitud === 2 || solicitud.estado_solicitud === 3 || solicitud.estado_solicitud === 4) && (
                            <div className="w-full flex mt-5  border-2 border-red-500 rounded-lg md:items-center ">
                                <div className="flex-initial w-1/6  md:px-2 md:mx-4 ">
                                    <svg className="fill-red-500 lg:w-32 md:w-20 sm:w-10" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM9.15723 17H15.9795V15.4072H11.7002L13.9629 13.0215C14.5827 12.3424 15.0202 11.7477 15.2754 11.2373C15.5306 10.7269 15.6582 10.2256 15.6582 9.7334C15.6582 8.83561 15.3734 8.14062 14.8037 7.64844C14.2386 7.15625 13.4434 6.91016 12.418 6.91016C11.748 6.91016 11.1488 7.05371 10.6201 7.34082C10.0915 7.62337 9.68131 8.0153 9.38965 8.5166C9.10254 9.0179 8.95898 9.57161 8.95898 10.1777H10.9414C10.9414 9.67643 11.069 9.27311 11.3242 8.96777C11.584 8.65788 11.9372 8.50293 12.3838 8.50293C12.7985 8.50293 13.1175 8.63053 13.3408 8.88574C13.5641 9.13639 13.6758 9.48275 13.6758 9.9248C13.6758 10.2484 13.5687 10.5902 13.3545 10.9502C13.1449 11.3102 12.819 11.7318 12.377 12.2148L9.15723 15.6465V17Z" />
                                    </svg> 
                                </div>
                                <div className="flex-initial w-4/6 py-2 px-4  ">
                                    <h4 className="text-granate-900 text-2xl font-bold ">{solicitud.estado_solicitud_nombre }</h4>    
                                    <p className=" "><strong>Descripción:</strong> {solicitud.descripcion}</p>
                                    <p className=" "><strong>Encargado1:</strong> {solicitud.encargado_nombre}</p>
                                    {
                                        solicitud.estado_solicitud==3 &&(
                                            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => setShowEditForm(true)}>
                                                Editar
                                            </button>
                                        )
                                    }
                                    
                                </div>
                                <div className="flex-initial w-1/6 py-2 px-4  ">
                                    
                                <p className=" self-end">Fecha: {solicitud.fecha_modificacion}  </p>
                                </div>
                            </div>
                            )}
                            {(solicitud.estado_solicitud > 4) && (
                            <div className="w-full flex mt-5  border-2 border-red-500 rounded-lg md:items-center ">
                                <div className="flex-initial w-1/6  md:px-2 md:mx-4 ">
                                    <svg className="fill-red-500 lg:w-32 md:w-20 sm:w-10" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM9.15723 17H15.9795V15.4072H11.7002L13.9629 13.0215C14.5827 12.3424 15.0202 11.7477 15.2754 11.2373C15.5306 10.7269 15.6582 10.2256 15.6582 9.7334C15.6582 8.83561 15.3734 8.14062 14.8037 7.64844C14.2386 7.15625 13.4434 6.91016 12.418 6.91016C11.748 6.91016 11.1488 7.05371 10.6201 7.34082C10.0915 7.62337 9.68131 8.0153 9.38965 8.5166C9.10254 9.0179 8.95898 9.57161 8.95898 10.1777H10.9414C10.9414 9.67643 11.069 9.27311 11.3242 8.96777C11.584 8.65788 11.9372 8.50293 12.3838 8.50293C12.7985 8.50293 13.1175 8.63053 13.3408 8.88574C13.5641 9.13639 13.6758 9.48275 13.6758 9.9248C13.6758 10.2484 13.5687 10.5902 13.3545 10.9502C13.1449 11.3102 12.819 11.7318 12.377 12.2148L9.15723 15.6465V17Z" />
                                    </svg> 
                                </div>
                                <div className="flex-initial w-4/6 py-2 px-4  ">
                                    <h4 className="text-granate-900 text-2xl font-bold ">Admitido</h4>    
                                    <p className=" "><strong>Descripción:</strong> {solicitud.descripcion}</p>
                                    <p className=" "><strong>Encargado1:</strong> {solicitud.encargado_nombre}</p>
                                    
                                </div>
                                <div className="flex-initial w-1/6 py-2 px-4  ">
                                    
                                <p className=" self-end">Fecha: {solicitud.fecha_modificacion}  </p>
                                </div>
                            </div>
                            )}
                            {solicitud.estado_solicitud >= 5 && (
                            <div className="w-full flex mt-5  border-2 border-indigo-800 rounded-lg md:items-center ">
                                <div className="flex-initial w-1/6  md:px-2 md:mx-4 ">
                                    <svg className="fill-indigo-800 lg:w-32 md:w-20 sm:w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12.2197 11.1484H11.167V12.6934H12.2129C13.3066 12.6934 13.8535 13.1901 13.8535 14.1836C13.8535 14.5938 13.7191 14.9242 13.4502 15.1748C13.1859 15.4209 12.819 15.5439 12.3496 15.5439C11.9395 15.5439 11.5931 15.4255 11.3105 15.1885C11.0326 14.9515 10.8936 14.6462 10.8936 14.2725H8.91797C8.91797 15.1338 9.23242 15.8265 9.86133 16.3506C10.4948 16.8747 11.3083 17.1367 12.3018 17.1367C13.3636 17.1367 14.2158 16.8701 14.8584 16.3369C15.5055 15.8037 15.8291 15.0951 15.8291 14.2109C15.8291 13.6641 15.6901 13.1901 15.4121 12.7891C15.1387 12.388 14.7217 12.0872 14.1611 11.8867C14.6123 11.6816 14.9769 11.3877 15.2549 11.0049C15.5329 10.6221 15.6719 10.2028 15.6719 9.74707C15.6719 8.86296 15.3734 8.17025 14.7764 7.66895C14.1794 7.16309 13.3545 6.91016 12.3018 6.91016C11.6956 6.91016 11.1396 7.02637 10.6338 7.25879C10.1325 7.49121 9.74056 7.81478 9.45801 8.22949C9.18001 8.63965 9.04102 9.10449 9.04102 9.62402H11.0166C11.0166 9.29134 11.1442 9.02246 11.3994 8.81738C11.6546 8.60775 11.9714 8.50293 12.3496 8.50293C12.7689 8.50293 13.097 8.61458 13.334 8.83789C13.5755 9.0612 13.6963 9.37337 13.6963 9.77441C13.6963 10.1891 13.5755 10.5218 13.334 10.7725C13.0924 11.0231 12.721 11.1484 12.2197 11.1484Z"/>
                                    </svg>
 
                                </div>
                                <div className="flex-initial w-4/6 py-2 px-4  ">
                                    <h4 className="text-granate-900 text-2xl font-bold ">En proceso</h4>    
                                    <p className=" "><strong>Descripción:</strong> {solicitud.descripcion}</p>
                                    <p className=" "><strong>Encargado:</strong> {solicitud.encargado_nombre}</p>
                                </div>
                                <div className="flex-initial w-1/6 py-2 px-4  ">
                                    
                                <p className=" self-end">Fecha: {solicitud.fecha_modificacion}  </p>
                                </div>                               
                            </div>
                            )}
                            {solicitud.estado_solicitud === 6 && (
                            <div className="w-full flex mt-5  border-2 border-emerald-900 rounded-lg md:items-center ">
                                    <div className="flex-initial w-1/6  md:px-2 md:mx-4 ">
                                        <svg className="fill-emerald-900 lg:w-32 md:w-20 sm:w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM15.1299 13.2539H14.002V7.04688H12.0059L7.85645 13.6025L7.94531 14.8467H12.0264V17H14.002V14.8467H15.1299V13.2539ZM12.0264 13.2539H9.8252L11.8965 9.96582L12.0264 9.74023V13.2539Z"/>
                                        </svg>
    
                                    </div>
                                    <div className="flex-initial w-4/6 py-2 px-4  ">
                                    <h4 className="text-granate-900 text-2xl font-bold ">{solicitud.estado_solicitud_nombre }</h4>    
                                    <p className=" "><strong>Descripción:</strong> {solicitud.descripcion}</p>
                                    <p className=" "><strong>Encargado:</strong> {solicitud.encargado_nombre}</p>
                                    </div>
                                    <div className="flex-initial w-1/6 py-2 px-4  ">
                                        
                                    <p className=" self-end">Fecha: {solicitud.fecha_modificacion}  </p>
                                    </div>
                            </div>
                            )}
                        </div>
                    </div>

                    
                        


                        


                    

                    )}
                </div>
            </div>            
        </div>

        );
        const EditFormModal = ({ solicitud, onClose }) => {
            // Agrega el código necesario para el formulario de edición
          
            return (
              // Estructura de la ventana emergente
              <div className="modal">
                {/* Contenido del formulario de edición */}
                {/* ... */}
                <button onClick={onClose}>Cerrar</button>
              </div>
            );
          };
    }
    export default ConsultaExpediente;