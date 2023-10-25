import { useNavigate } from "react-router-dom";

export function Login() {    

    const navigate = useNavigate();
  
    return (
        
            <div className="bg-[url('../portada2.1.jpg')] bg-cover bg-center h-screen bg-grayscale-50 relative flex justify-center items-center "  >            
                <div className=" relative w-8/12 h-screen justify-center items-center">
                    <div className="relative flex items-top justify-center min-h-screen sm:items-center bg-zinc-800 bg-blend-screen py-4 sm:pt-0 bg-cover bg-center">
                        <div className="text-center flex flex-col justify-center">
                            <a href="">
                                <img src ="../unsa-escudo.png" className="mx-auto " />
                            </a>                        
                            <div className="my-2 font-semibold text-2xl lg:text-7xl text-grisclaro">
                                Bienvenidos a Defensoria Universitaria
                            </div>
                            <div className="text-grisclaro font-semibold text-xl uppercase">
                                Sistema Electrónico de Defensoria Universitaria
                            </div>
                            <a className="align-middle mt-3" href="">
                                <button  type="button" className="inline-flex items-center py-2 border border-none rounded-md font-semibold text-xs uppercase tracking-widest focus:outline-none focus:shadow-none transition ease-in-out duration-150 bg-granate hover:bg-granateclaro active:bg-granate focus:border-unsa text-white px-12 lg:text-lg"
                                onClick={() => navigate("/registro-incidencias")}>Realizar una Denuncia</button>
                            </a>
                            <a className="align-middle mt-3">
                                <button type="button" className="inline-flex items-center py-2 border border-none rounded-md font-semibold uppercase tracking-widest focus:outline-none focus:shadow-none transition ease-in-out duration-150 bg-gris hover:bg-grisclaro active:bg-gris focus:border-grisclaro text-white px-4 md:px-12 text-sm lg:text-lg w-fit self-center mt-2"
                                >                                    
                                INGRESO DOCENTE/ADMINISTRATIVO 
                                </button>
                            </a>
                            <a className="align-middle mt-3" href="">
                                <button  type="button" className="inline-flex items-center py-2 border border-none rounded-md font-semibold text-xs uppercase tracking-widest focus:outline-none focus:shadow-none transition ease-in-out duration-150 bg-granate hover:bg-granateclaro active:bg-granate focus:border-unsa text-white px-12 lg:text-lg"
                                onClick={() => navigate("/admin")}>Ingreso Administrador</button>
                            </a>
                        </div>
                    </div>
                </div>                        
            </div>        

    );
}