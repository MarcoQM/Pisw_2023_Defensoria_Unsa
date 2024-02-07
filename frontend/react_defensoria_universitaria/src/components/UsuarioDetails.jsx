import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Details from "./Details";
import HistorialItem from "./HistorialItem";
import { getExpediente, getProcesosById } from "../api/registros.api";
import ModalActuacion from "./ModalActuacion";

function UsuarioDetails() {

    
    
  const [isOpen, setIsOpen] = useState(false);

  const { solicitudId } = useParams();
  console.log("SOLICITUD ID" + solicitudId);
  const [solicitudData, setSolicitudData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDetalleUsuario(solicitudId);
      setSolicitudData(res.data);
    };

    fetchData();
  }, [solicitudId]);

  return (
    <section className="mx-20 overflow-auto">
      <h2 className="text-granate text-3xl font-bold text-center text-granate-900 my-4">DETALLES DE USUARIO {solicitudData.codigo_expediente}</h2>
      
      <ModalActuacion open={isOpen} onClose={() => setIsOpen(false)} solicitudId={solicitudId} />
      <div className="grid grid-cols-1 w-full gap-4">     
        <div className="card bg-white border border-transparent rounded-md p-2">
          <h3 className="font-bold">Informacion General</h3>
          <div className="grid grid-cols-2 gap-1 overflow-auto">
            <Details title="Nombres:" text={solicitudData.nombre} />
            <Details title="Apellidos:" text={solicitudData.apellido} />
            <Details title="DNI:" text={solicitudData.dni} />
            <Details title="CUI:" text={solicitudData.cui} />
            <Details title="Rol:" text={solicitudData.rol} />
            <Details title="Dependencia:" text={solicitudData.sede_nombre} />
            <Details title="Numero de celular:" text={solicitudData.telefono} />
            <Details title="Correo:" text={solicitudData.correo} />
            <Details
              title="Direccion:"
              text={solicitudData.direccion}
            />
          </div>
        </div>      
      </div>
    </section>

  );

}

export default UsuarioDetails;