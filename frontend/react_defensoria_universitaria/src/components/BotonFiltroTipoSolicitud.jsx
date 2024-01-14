import {FaExclamation } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const BotonFiltroTipoSolicitud = ({ icon: Icon, label, type, pending, inProcess, onClick }) => {
  return (
    <button
      className="w-full bg-granate hover:bg-granate-claro p-4 rounded-lg shadow-md text-center"
      onClick={() => onClick(type)}
    >

      <div className="flex flex-wrap -mx-3 mb-0">
        <div className="w-full md:w-4/5 px-3 mb-3"> {Icon && <Icon className="text-2xl text-white mb-2" />}</div> 
        <div className="w-full md:w-1/5 px-3 mb-3">{pending > 0 && <FaExclamation className=" text-red-500 " />}</div>
        </div>  
     
      
      <div className="text-2xl text-white">{label}</div>
      <div className="text-green-500 text-white">{`${pending} Pendientes`}</div>
      <div className="text-green-500 text-white">{`${inProcess} En Proceso`}</div>
      
    </button>
  );
};

export default BotonFiltroTipoSolicitud;