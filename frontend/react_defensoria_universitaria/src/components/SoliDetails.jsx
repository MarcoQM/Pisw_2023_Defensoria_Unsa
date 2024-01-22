import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Details from "./Details";
import HistorialItem from "./HistorialItem";
import { getExpediente } from "../api/registros.api";
import ModalActuacion from "./ModalActuacion";


function SoliDetails() {
  const { solicitudId } = useParams();
  const [solicitudData, setSolicitudData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const res = await getExpediente(solicitudId);
      setSolicitudData(res.data);
    };

    fetchData();
  }, [solicitudId]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="mx-20">
      <h2 className="text-granate text-3xl font-bold text-center text-granate-900 my-4">DETALLES DE EXPEDIENTE {solicitudData.codigo_expediente}</h2>
      <div className="flex justify-end">
        <button 
          onClick={() => setIsOpen(true)} 
          className="px-4 py-1 mb-4 bg-blue hover:bg-granate-claro text-white text-lg rounded " >
          Agregar actuación
        </button>
      </div>
      <ModalActuacion open={isOpen} onClose={() => setIsOpen(false)} />
      <div className="grid grid-cols-2 w-full gap-4">
      <div className="card bg-white border border-transparent rounded-md p-2">
        <h3 className="font-bold">Informacion General</h3>
        <div className="grid grid-cols-2 gap-1 overflow-auto">
          <Details title="Fecha:" text={solicitudData.fecha_creacion} />
          <Details title="Tipo de solicitud:" text={solicitudData.tipo_solicitud} />
        </div>
      </div>
      <div className="card bg-white border border-transparent rounded-md p-2">
        <h3 className="font-bold">Expone</h3>
        <div className="p-2 overflow-auto">
          <p>
            {solicitudData.descripcion}
          </p>
        </div>
      </div>
      <div className="card bg-white border border-transparent rounded-md p-2">
        <h3 className="font-bold">Informacion General</h3>
        <div className="grid grid-cols-2 gap-1 overflow-auto">
          <Details title="Nombres:" text={solicitudData.nombre} />
          <Details title="Apellidos:" text={solicitudData.apellido} />
          <Details title="DNI:" text={solicitudData.dni} />
          <Details title="CUI:" text={solicitudData.cui} />
          <Details title="Rol:" text={solicitudData.rol} />
          <Details title="Area/Sede:" text={solicitudData.sede_nombre} />
          <Details title="Numero Telefonico:" text={solicitudData.telefono} />
          <Details title="Correo:" text={solicitudData.correo} />
          <Details
            title="Direccion:"
            text={solicitudData.direccion}
          />
        </div>
      </div>
      <div className="card bg-white border border-transparent rounded-md p-2">
        <h3 className="font-bold">Solicita</h3>
        <div className="p-2 overflow-auto">
          <p>
            {solicitudData.descripcion}
          </p>
        </div>
      </div>
      
      <div className="card bg-white border border-transparent rounded-md p-2">
        <h3 className="font-bold">Documentos Adjuntos </h3>
        <ul className="space-y-2">
          <li className="flex items-center">
            <img src="/path/to/pdf-icon.svg" alt="" className="mr-2" />
            <a href="#" className="text-blue-500">
              Prueba1.pdf
            </a>
          </li>
          <li className="flex items-center">
            <img src="/path/to/pdf-icon.svg" alt="" className="mr-2" />
            <a href="#" className="text-blue-500">
              Prueba2.pdf
            </a>
          </li>
          <li className="flex items-center">
            <img src="/path/to/pdf-icon.svg" alt="" className="mr-2" />
            <a href="#" className="text-blue-500">
              Prueba3.pdf
            </a>
          </li>
        </ul>
      </div>
      <div className="card bg-white border border-transparent rounded-md p-2 row-span-3">
        <h3 className="font-bold">Historial</h3>
        <div>
          <ol className="relative border-s border-gray-500 mx-12">
            <HistorialItem
              date={solicitudData.fecha_modificacion}
              estado="En Proceso"
              encargado="Juan Perez"
              remitido="No"
              recomendacion="No"
            />
            <HistorialItem
              date="25 - 12 - 2023"
              estado="En Proceso"
              encargado="Juan Perez"
              remitido="No"
              recomendacion="No"
            />
            <HistorialItem
              date="25 - 12 - 2023"
              estado="En Proceso"
              encargado="Juan Perez"
              remitido="No"
              recomendacion="No"
            />
            <HistorialItem
              date="25 - 12 - 2023"
              estado="En Proceso"
              encargado="Juan Perez"
              remitido="No"
              recomendacion="No"
            />
          </ol>
        </div>
      </div>
    </div>
    </section>
    
  );
}
export default SoliDetails;
