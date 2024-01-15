import { getAllSolicitudes } from "../api/registros.api";
import { FaFile } from "react-icons/fa";
import { RegistroCard } from "../components/RegistroCard";
import { RegistrosList } from "../components/RegistrosList";
import { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";

export function AdminNotificaciones() {
    const [numNotificaciones, setNumNotificaciones] = useState(0);
    const [busqueda, setBusqueda] = useState('');
    const [registros, setRegistros] = useState([]);

    useEffect(() => {
        async function loadRegistros() {
            const res = await getAllSolicitudes();

            // Aplicar filtro por número de notificaciones
            let registrosFiltrados = res.data.slice(0, numNotificaciones);

            // Aplicar filtro por búsqueda
            if (busqueda.trim() !== '') {
                registrosFiltrados = registrosFiltrados.filter(registro =>
                    registro.mensaje.toLowerCase().includes(busqueda.toLowerCase())
                );
            }

            setRegistros(registrosFiltrados);
        }

        loadRegistros();
    }, [numNotificaciones, busqueda]);

    return (
        <div className="flex">
            {/* Panel de Administración */}
            <Sidebar/>

            {/* Contenido Principal */}
            <div className="ml-14 p-4 w-full">
                <div className="max-w-7xl mx-auto bg-grisclaro rounded-lg shadow-lg p-10 my-10">
                    <h2 className="text-granate text-3xl font-bold text-center mb-4">NOTIFICACIONES</h2>

                    <div className="flex justify-between mb-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500 mr-2">Número de notificaciones:</label>
                            <input
                                type="number"
                                className="border rounded-md p-1"
                                value={numNotificaciones}
                                onChange={(e) => setNumNotificaciones(Math.max(0, e.target.value))}
                                min="0"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500 mr-2">Buscar:</label>
                            <input
                                type="text"
                                className="border rounded-md p-1"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                        </div>
                    </div>

                    <a className="text-black text-2xl font-bold text-center mb-4">Listado de notificaciones</a>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Mensaje
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Estado
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {registros.map(registro => (
                                    <tr key={registro.id}>
                                        <td>{registro.id}</td>
                                        <td>{registro.mensaje}</td>
                                        <td>{registro.estado}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
