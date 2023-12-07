import { useNavigate } from "react-router-dom";

export function LoginAdministrativos() {    

    const navigate = useNavigate();
  
    return (
        
            <div className="bg-[url('../portada2.1.jpg')] bg-cover bg-center h-screen bg-grayscale-50 relative flex justify-center items-center "  >            
                <div className=" relative w-8/12 h-screen justify-center items-center">
                    <div className="relative flex items-top justify-center min-h-screen sm:items-center bg-zinc-800 bg-blend-screen py-4 sm:pt-0 bg-cover bg-center">
                        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                           
                            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div class="p-6 md:space-y-6 sm:p-8">
                                    <a href="../" class=" flex flex-col items-center justify-center  text-2xl font-semibold text-gray-900 dark:text-black">
                                        <img class="w-1/2 h-1/2 " src="../defensoria.png" />                                        
                                    </a>
                                    <h1 class="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                                        ¡Bienvenido!
                                    </h1>
                                    <h2 class="text-center text-xs leading-tight tracking-tight text-gray-900 md:text-sm dark:text-black">
                                        Iniciar sesión con tu correo electrónico y contraseña
                                    </h2>
                                    
                                    <form class="space-y-4 md:space-y-6" action="#">
                                        <div>
                                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black  ">Correo Eletrónico</label>
                                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@unsa.edu.pe" required="" />
                                        </div>
                                        <div>
                                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Contraseña</label>
                                            <input type="password" name="password" id="password" placeholder="••••••••" class="border bg-white border-b-granate sm:text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-start">
                                                <div class="flex items-center h-5">
                                                    <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                                </div>
                                                <div class="ml-3 text-sm">
                                                    <label for="remember" class="text-gray-500 dark:text-gray-300">Permanecer registrado </label>
                                                </div>
                                                <div class="ml-3 text-sm">
                                                <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"> ¿Has olvidado tu contraseña?</a>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-granate " >Ingresar</button>                                        
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                        
            </div>        

    );
}