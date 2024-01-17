import Details from "./Details";
import HistorialItem from "./HistorialItem";

function SoliDetails () {
    return (
      <div className="grid grid-cols-2 w-full gap-4 mx-20 p-4">
        <div className="card bg-white border border-transparent rounded-md p-2">
          <h3 className="font-bold">Informacion General</h3>
          <div className="grid grid-cols-2 gap-1 overflow-auto">
            <Details title="Fecha:" text="25 - 12 - 2023" />
            <Details title="Tipo de solicitud:" text="Reclamo" />
          </div>
        </div>
        <div className="card bg-white border border-transparent rounded-md p-2">
          <h3 className="font-bold">Solicita</h3>
          <div className="p-2 overflow-auto">
          <p>Dede aclararse si se persigue modoficar decisiones ya adoptadas o bien alertar de un supuesto mal funcionamiento con objeto de solventar el problema en el futuro</p>
          </div>
        </div>
        <div className="card bg-white border border-transparent rounded-md p-2">
          <h3 className="font-bold">Informacion General</h3>
          <div className="grid grid-cols-2 gap-1 overflow-auto">
            <Details title="Nombres:" text="Juan Perez" />
            <Details title="Apellidos:" text="Perez Perez" />
            <Details title="DNI:" text="12345678" />
            <Details title="CUI:" text="12341234" />
            <Details title="Rol:" text="Alumno" />
            <Details title="Area/Sede:" text="Biomedicas - Arequipa" />
            <Details title="Numero Telefonico:" text="987654321" />
            <Details title="Correo:" text="alumno@unsa.edu.pe"  />
            <Details title="Direccion:" text="Av. Mayta Capac 202 - Miraflores" />
          </div>
        </div>
        <div className="card bg-white border border-transparent rounded-md p-2 row-span-3">
          <h3 className="font-bold">Historial</h3>
          <div>
          <ol className="relative border-s border-gray-500 mx-12">                  
        <HistorialItem date="25 - 12 - 2023" estado="En Proceso" encargado="Juan Perez" remitido="No" recomendacion="No" />
        <HistorialItem date="25 - 12 - 2023" estado="En Proceso" encargado="Juan Perez" remitido="No" recomendacion="No" />
        <HistorialItem date="25 - 12 - 2023" estado="En Proceso" encargado="Juan Perez" remitido="No" recomendacion="No" />
        <HistorialItem date="25 - 12 - 2023" estado="En Proceso" encargado="Juan Perez" remitido="No" recomendacion="No" />

</ol>
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
      </div>
    );
  }

  export default SoliDetails;
