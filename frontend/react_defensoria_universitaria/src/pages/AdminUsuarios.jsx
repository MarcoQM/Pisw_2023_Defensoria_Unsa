//import { getAllUsuarios } from "../api/registros.api";
//import { FaFile } from "react-icons/fa";
//import { RegistroCard } from "../components/RegistroCard";
//import { RegistrosList } from "../components/RegistrosList";

export function AdminUsuarios() {
  //const sugerenciasPendientes = 10;
  //const consultasPendientes = 5;
  //const quejasEnProceso = 3;
  //const reclamosEnProceso = 7;

 

  
  return (
    <div className="flex">    
      <div className="ml-14 p-4 w-full">
        <div className="max-w-7xl mx-auto bg-gray-400 rounded-lg shadow-lg p-10 my-10 gap-4">
          {/* cuadro gris*/}
          <h2 className="text-granate-900 text-3xl font-bold text-center mb-4">USUARIOS</h2>

          <a className="text-gray-800 text-2xl font-bold text-center mb-4">Listado de usuarios</a>
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
