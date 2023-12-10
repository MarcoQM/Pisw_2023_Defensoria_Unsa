import { RegistrosList } from "../components/RegistrosList";

// eslint-disable-next-line react/prop-types
const TablaExpediente = () => {
  return (
    <table className="w-full my-4 border-collapse border border-gray-400">
      <thead className="bg-gray-200">
        <tr>
          <th className="py-2 px-4 border">Nro</th>
          <th className="py-2 px-4 border">Nro de Expediente</th>
          <th className="py-2 px-4 border">Solicitante</th>
          <th className="py-2 px-4 border">Tipo de Solicitud</th>
          <th className="py-2 px-4 border">Estado</th>
          <th className="py-2 px-4 border">Encargado</th>
          <th className="py-2 px-4 border">Fecha de Recepción</th>
          <th className="py-2 px-4 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <RegistrosList/>
      </tbody>
    </table>
  );
};

export default TablaExpediente;