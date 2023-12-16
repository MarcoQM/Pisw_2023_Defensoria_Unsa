//import { getAllUsuarios } from "../api/registros.api";
//import { FaFile } from "react-icons/fa";
//import { RegistroCard } from "../components/RegistroCard";
//import { RegistrosList } from "../components/RegistrosList";
import Sidebar from "../components/SideBar";

export function AdminUsuarios() {
  //const sugerenciasPendientes = 10;
  //const consultasPendientes = 5;
  //const quejasEnProceso = 3;
  //const reclamosEnProceso = 7;

 

  
  return (
    <div className="flex">
      {/* Panel de Administración */}
      <Sidebar />

      {/* Contenido Principal */}
      <div className="ml-14 p-4 w-full">
        <div className="max-w-7xl mx-auto bg-grisclaro rounded-lg shadow-lg p-10 my-10">
          {/* cuadro gris*/}
          <h2 className="text-granate text-3xl font-bold text-center mb-4">USUARIOS</h2>

          <a className="text-black text-2xl font-bold text-center mb-4">Listado de usuarios</a>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Apellido
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Correo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha Registro
                  </th>
                </tr>
              </thead>
              <tbody>
              
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
