import { useNavigate } from "react-router-dom";
import { logOut } from "../api/registros.api";


export function BarraPosteriorSolicitud(){

    const navigate = useNavigate();

    return(
        <div className="fixed top-0 w-full z-50">
            <div className=" bg-granate text-white p-4 flex justify-between items-center  ">
                <div className="flex items-center cursor-pointer" onClick={() => navigate("/inicio")}>
                    <img
                    src="\unsa-oficinas.png"
                    alt="Logo UNSA"
                    className=" pl-50 sm:pl-20 w-50 h-10 mr-2"
                    />
                    <span className=" text-sm  sm:text-xl font-semibold">Defensoria Universitaria</span>
                </div>
                <button className=" text-white hover:text-gris  py-2 px-4 rounded text-sm sm:text-base border-2"
                onClick={() => navigate("/consulta")}>
                    Consulta por expediente
                </button>
            </div>
        </div>    
    )
}

export function BarraPosteriorExpediente(){

    const navigate = useNavigate();

    return(
        <div className="fixed top-0 w-full z-10">
            <div className=" bg-granate text-white p-4 flex justify-between items-center  ">
                <div className="flex items-center cursor-pointer" onClick={() => navigate("/inicio")}>
                    <img
                    src="\unsa-oficinas.png"
                    alt="Logo UNSA"
                    className=" pl-50 sm:pl-20 w-50 h-10 mr-2"
                    />
                    <span className=" text-sm  sm:text-xl font-semibold">Defensoria Universitaria</span>
                </div>
                <button className=" text-white hover:text-gris  py-2 px-4 rounded text-sm-base border-2  sm:text-base"
                >
                    Presentar solicitud
                </button>
            </div>
        </div>    
    )
}
//Barra posterior que aparece en dashboard admin despues de logearse
export function BarraPosteriorLogeado(){

    const UserName = 'user_name';
    const getLocalUserName = () => {  
        return JSON.parse(localStorage.getItem(UserName));  
    };  
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await logOut();
          // Redirige a la página de inicio u otra página después de hacer logout
          navigate("/inicio");
        } catch (error) {
          console.error("Error during logout:", error);
          
        }
      };

    return(
        <div className="fixed top-0 w-full z-10">
            <div className=" bg-granate text-white p-4 flex justify-between items-center  ">
                <div className="flex items-center cursor-pointer" onClick={() => navigate("/inicio")}>
                    <img
                    src="\unsa-oficinas.png"
                    alt="Logo UNSA"
                    className=" pl-50 sm:pl-20 w-50 h-10 mr-2"
                    />
                    <span className=" text-sm  sm:text-xl font-semibold">Defensoria Universitaria</span>
                </div>
                <div className=" text-white  py-2 px-4 rounded text-sm  sm:text-xl">
                    <span className=" text-sm  sm:text-xl font-semibold">Hola {getLocalUserName()}      </span>
                    <button  className=" hover:text-gris bg-indigo-700"
                    onClick={handleLogout}>
                        Logout
                    </button>

                </div>
                
            </div>
        </div>    
    )
}