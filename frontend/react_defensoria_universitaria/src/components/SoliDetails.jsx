import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Details from "./Details";
import HistorialItem from "./HistorialItem";
import { getExpediente } from "../api/registros.api";
import ModalActuacion from "./ModalActuacion";
import { getTipoById } from "../api/registros.api";

function SoliDetails() {
  const { solicitudId } = useParams();
  console.log("SOLICITUD ID" + solicitudId);
  const [solicitudData, setSolicitudData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getExpediente(solicitudId);
      setSolicitudData(res.data);
    };

    fetchData();
  }, [solicitudId]);




  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  }

  const [isOpen, setIsOpen] = useState(false);

  function getIconForFileType(file) {
    const extension = file.split('.').pop();
    switch (extension) {
      case 'pdf':
        return '/archivos/pdf.png';
      case 'doc':
      case 'docx':
        return '/archivos/doc.png';
      case 'png':
      case 'jpg':
      case 'jpeg':
        return '/archivos/image.png';
      case 'mp4':
      case 'avi':
        return '/archivos/video.png';
      default:
        return '/archivos/file.png';
    }
  }

  return (
    <section className="mx-20 overflow-auto">
      <h2 className="text-granate text-3xl font-bold text-center text-granate-900 my-4">DETALLES DE EXPEDIENTE {solicitudData.codigo_expediente}</h2>
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-1 mb-4 bg-blue-500 hover:bg-granate-claro text-white text-lg rounded " >
          Agregar actuación
        </button>
      </div>
      <ModalActuacion open={isOpen} onClose={() => setIsOpen(false)} />
      <div className="grid grid-cols-2 w-full gap-4">
        <div className="card bg-white border border-transparent rounded-md p-2">
          <h3 className="font-bold">Informacion General</h3>
          <div className="grid grid-cols-2 gap-1 overflow-auto">
            <Details title="Fecha:" text={formatDate(solicitudData.fecha_creacion)} />
            <Details title="Tipo de solicitud:" text={solicitudData.tipo_solicitud} />
          </div>
        </div>
        <div className="card bg-white border border-transparent rounded-md p-2">
          <h3 className="font-bold">Solicita</h3>
          <div className="p-2 overflow-auto">
            <p>
              {solicitudData.solicita}
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
          <h3 className="font-bold">Expone</h3>
          <div className="p-2 overflow-auto">
            <p>
              {solicitudData.expone}
            </p>
          </div>
        </div>

        <div className="card bg-white border border-transparent rounded-md p-2">
          <h3 className="font-bold">Documentos Adjuntos </h3>
          <ul className="space-y-2">
            {solicitudData && solicitudData.archivos && solicitudData.archivos.map((archivo, index) => (
              <li key={index} className="flex items-center">
                <img src={getIconForFileType(archivo.archivo)} alt="Archivo" className="w-8 h-8 m-2" />
                <a href={archivo.archivo} className="text-sm font-medium text-blue-800 hover:underline">
                  Prueba{index + 1}.{archivo.archivo.split('.').pop()}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="card bg-white border border-transparent rounded-md p-2 row-span-3">
          <h3 className="font-bold">Historial</h3>
          <div>
            <ol className="relative border-s border-gray-500 mx-12">
              <HistorialItem
                date={formatDate(solicitudData.fecha_creacion)}
                estado={solicitudData.estado_solicitud_nombre}
                encargado="Juan Perez"
                remitido="No"
                recomendacion="No"
              />
              <HistorialItem
                date="25 - 12 - 2023"
                estado="En proceso"
                encargado="Juan Perez"
                remitido="No"
                recomendacion="No"
              />
              <HistorialItem
                date="25 - 12 - 2023"
                estado="Inadmisible"
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
