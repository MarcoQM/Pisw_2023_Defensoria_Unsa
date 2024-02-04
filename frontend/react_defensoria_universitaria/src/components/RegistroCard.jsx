/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

export function RegistroCard({registro, index}){
    return(
        
            <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                    <a>{index+1}</a> {/* Nro */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <a>{registro.codigo_expediente}</a> {/* Nro Expediente */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                     {registro.nombre} {/* Solicitante */}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                     {registro.tipo_solicitud_nombre} {/* Tipo Solicitud */}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                    {registro.estado_solicitud_nombre}{/* Estado */}
                </td> 
                <td className="px-6 py-4 whitespace-nowrap">
                    {registro.encargado_nombre}{/* Estado */}
                </td> 

                <td className="px-6 py-4 whitespace-nowrap">
                    {registro.fecha_creacion}{/* Estado */}
                </td> 

                <td className="px-6 py-4 whitespace-nowrap">
                     <Link to={`/solicitudes/${registro.id}`} className="bg-granate px-5 py-1 text-white rounded-md ">
                        Detalles
                     </Link>
                </td> 

            </tr>
            
       
    );
}