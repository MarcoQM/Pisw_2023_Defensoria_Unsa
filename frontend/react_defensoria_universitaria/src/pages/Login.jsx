import { useForm } from "react-hook-form";
//import { useState, useEffect  } from 'react';
import { login } from "../api/registros.api";
import { useNavigate } from "react-router-dom";
import DjangoCSRFToken from 'django-react-csrftoken'


export function Login() {  
    

  const userName = 'user_name';


    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

   

    const onSubmit=handleSubmit(async (data) =>{
 
      await login(data);
      console.log(data);
     
  
      localStorage.setItem(userName, JSON.stringify(data.username));
      navigate("/admin")
    }); 

  
    return (


        <div className="Relative" >
        <div className="absolute top-50 right-40">
          <div className="hidden lg:block w-20 h-20 sm:w-40 sm:h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 ">
            <img
              src="\defensoria.png" 
              alt="Defensoria"
              className="w-full h-full object-contain" 
            />
          </div>
          <div className="bg-white rounded-lg p-4 w-80 h-90 mx-auto top-80 mt-8 hidden lg:block  sm:w-40 sm:h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
              {/* Aumentamos el margen superior a "mt-8" para un espacio más ancho */}
              <h5 className="text-black text-xl font-bold mb-2">Estamos para escucharte</h5>
              <p className="mb-2">Llena el formulario de atención para que podamos ver tu caso. Si tienes alguna duda, puedes revisar nuestra sección sobre</p>
              <h5 className="text-granate text-xl font-bold mb-2">¿Cómo funciona la Defensoria Universitaria?</h5>
              <img
                src="\Alumnos.jpg"
                alt="Imagen"
                className="w-60 h-48 mx-auto object-contain"
              />
          </div>
        </div>
  
  
        <div className="max-w-2xl mx-auto bg-grisclaro rounded-lg shadow-lg p-10 lg:ml-40 lg:mt-10  ">
          <h4 className="text-granate text-3xl font-bold text-center mb-4">LOGIN</h4>
  
          <form onSubmit={onSubmit} >
            <DjangoCSRFToken/>
          
  
            <div className="flex flex-wrap -mx-3 mb-3 items-center">
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label htmlFor="usuario">Usuario</label>
                <input
                  type="text"
                  placeholder="Usuario"
                  {...register("username", { required: true })}
                  className="bg-zinc-300 p-3 rounded-lg block w-full"
                />
                {errors.usuario && <span className="font-bold">Este campo es requerido</span>}
              </div>
              
            </div>
  
            <div className="flex flex-wrap -mx-3 mb-3">
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", { 
                    required: "Este campo es requerido",            
                  })}
                  className="bg-zinc-300 p-3 rounded-lg block w-full"
                  maxLength="8"
                />
                {errors.password && <span className="font-bold">Este campo es requerido</span>}
              </div>
            </div>
  
           
            <div className="text-center">
              <button
                type="submit"
                className="bg-granate p-3 rounded-lg block w-72 mt-3 mx-auto  text-white"
                  >
                Ingresar
              </button>
            </div>
            
          </form>
        </div>
      </div>  

    );
}