import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { RegistrosList } from "../components/RegistrosList";
import { RegistroCard } from "../components/RegistroCard";


export function RegistrosPage() {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className="Relative" >
      

          <div className="relative  mb-6">
            <p>Registros</p>
            <RegistrosList />,

          </div>

          <div className="text-center">
            <button
              type="regresar"
              className="bg-granate p-3 rounded-lg block w-72 mt-3 mx-auto  text-white"
              onClick={() => window.location.href = 'http://localhost:5173/'}>
              Regresar
            </button>
          </div>
          







          
          
          
    </div>
  );
}