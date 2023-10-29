
import { FaEnvelope, FaHome, FaSearch, FaExclamationCircle, FaComments, FaFile } from "react-icons/fa";

export function AdminPanel() {
    

    const sugerenciasPendientes = 10;
    const consultasPendientes = 5;
    const quejasEnProceso = 3;
    const reclamosEnProceso = 7;

    return (
        <div className="flex">
            {/* Panel de Administración */}
            <div className="bg-red-500 w-1/4 p-4">
                <div className="max-w-7xl mx-auto bg-granate rounded-lg shadow-lg p-10 my-10"> {/* Cuadro granate */}
                    <div className="flex items-center mb-4">
                        <FaHome className="text-white text-2xl" /> {/* Icono de la casa */}
                        <div className="text-2xl text-white mr-2"> Inicio de sitio</div>
                    </div>
                    <div className="text-white">
                        <li className="flex items-center">
                            <FaEnvelope className="text-white text-2xl mr-2" /> {/* Icono de la carta */}
                            <a href="/sugerencias" className="block py-2">Panel de sugerencias</a>
                        </li>
                        <li className="flex items-center">
                            <FaSearch className="text-white text-2xl mr-2" /> {/* Icono de búsqueda */}
                            <a href="/consultas" className="block py-2">Panel de consultas</a>
                        </li>
                        <li className="flex items-center">
                            <FaExclamationCircle className="text-white text-2xl mr-2" /> {/* Icono de exclamación */}
                            <a href="/quejas" className="block py-2">Panel de Quejas</a>
                        </li>
                        <li className="flex items-center">
                            <FaComments className="text-white text-2xl mr-2" /> {/* Icono de comentarios */}
                            <a href="/reclamos" className="block py-2">Panel de Reclamos</a>
                        </li>
                    </div>
                    <div className="hidden  mt-4idden lg:block w-5 h-5 sm:w-20 sm:h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 mt-4">
                        <img
                            src="/defensoria.png"
                            alt="Defensoria"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                </div>
            </div>

            {/* Contenido Principal */}
            <div className="w-3/4 p-4">
                <div className="max-w-7xl mx-auto bg-grisclaro rounded-lg shadow-lg p-10 my-10"> {/* cuadro gris*/}
                    <h2 className="text-granate text-3xl font-bold text-center mb-4">SOLICITUDES RECIBIDAS POR DEFENSORIA UNIVERSITARIA</h2>
                    <div className="flex space-x-4 mb-4">
                        {/* Cuadro de Sugerencias */}
                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <FaFile className="text-2xl text-gray-600 mb-2" /> {/* Icono de archivo */}
                            <div className="text-2xl">Sugerencias</div>
                            <div className="text-green-500">{sugerenciasPendientes} Pendientes</div>
                        </div>
                        
                        {/* Cuadro de Consultas */}
                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <FaFile className="text-2xl text-gray-600 mb-2" /> {/* Icono de archivo */}
                            <div className="text-2xl">Consultas</div>
                            <div className="text-green-500">{consultasPendientes} Pendientes</div>
                        </div>
                        
                        {/* Cuadro de Quejas en Proceso */}
                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <FaFile className="text-2xl text-gray-600 mb-2" /> {/* Icono de archivo */}
                            <div className="text-2xl">Quejas en Proceso</div>
                            <div className="text-green-500">{quejasEnProceso} En Proceso</div>
                        </div>
                        
                        {/* Cuadro de Reclamos en Proceso */}
                        <div className="bg-white p-4 rounded-lg shadow-md text-center">
                            <FaFile className="text-2xl text-gray-600 mb-2" /> {/* Icono de archivo */}
                            <div className="text-2xl">Reclamos en Proceso</div>
                            <div className="text-green-500">{reclamosEnProceso} En Proceso</div>
                        </div>
                    </div>

                    <a className="text-black text-2xl font-bold text-center mb-4">Listado de solicitudes</a>
                    {/* Tabla de Datos */}
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
                                    {/* columnas según los datos */}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <a>001</a> {/* ID */}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        Juan Perez {/* Nombre */}
                                    </td>
                                    {/* Otras celdas para las otras columnas */}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
