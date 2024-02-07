import { useNavigate } from "react-router-dom";
import { login } from "../api/registros.api";
import { useForm } from "react-hook-form";


export function LoginAdministrativos() {

    const userName = 'user_name';


    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        
    } = useForm();



    const onSubmit = handleSubmit(async (data) => {

        await login(data);
        console.log(data);


        localStorage.setItem(userName, JSON.stringify(data.username));
        navigate("/admin")
    });


    return (

        <div className="bg-[url('../portada2.1.jpg')] bg-cover bg-center h-screen bg-grayscale-50 relative flex justify-center items-center "  >
            <div className=" relative w-8/12 h-screen justify-center items-center">
                <div className="relative flex items-top justify-center min-h-screen sm:items-center bg-zinc-800 bg-blend-screen py-4 sm:pt-0 bg-cover bg-center">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                            <div className="p-6 md:space-y-6 sm:p-8">
                                <a href="../" className=" flex flex-col items-center justify-center  text-2xl font-semibold text-gray-900  ">
                                    <img className="w-1/2 h-1/2 " src="../defensoria.png" />
                                </a>
                                <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl  ">
                                    ¡Bienvenido!
                                </h1>
                                <h2 className="text-center text-xs leading-tight tracking-tight text-gray-900 md:text-sm  ">
                                    Iniciar sesión con tu correo electrónico y contraseña
                                </h2>

                                <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>

                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900  "
                                        >Correo Eletrónico</label>
                                        <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@unsa.edu.pe" required="" {...register("username", { required: true })} />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900  ">Contraseña</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••" className="border bg-white border-b-granate sm:text-sm rounded-lg block w-full p-2.5" {...register("password", {
                                            required: "Este campo es requerido",
                                        })} required="" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required="" />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="remember" className="text-gray-500">Permanecer registrado </label>
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <a href="#" className="text-sm font-medium text-granate-claro hover:underline"> ¿Has olvidado tu contraseña?</a>
                                            </div>
                                        </div>

                                    </div>
                                    <button type="submit" className="w-full text-white bg-granate-claro hover:bg-granate-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" >Ingresar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}