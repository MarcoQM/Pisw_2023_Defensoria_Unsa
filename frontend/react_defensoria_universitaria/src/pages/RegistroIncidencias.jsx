
import { useForm } from "react-hook-form";
import { getAllSedes, getAllRoles, getAllTipo, createRegistro } from "../api/registros.api";
//import { RegistrosList } from "../components/RegistrosList";
//import { RegistroCard } from "../components/RegistroCard";
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

import { useNavigate } from "react-router-dom";
//import axios from "axios";


export function RegistroIncidencias() {


  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit=handleSubmit(async data=>{

  
      const res3 = await createRegistro(data);
      console.log(res3);

      toast.success('El registro se ha completado con éxito.  Se le enviara un e-mail con los detalles de su solicitud', {
        duration: 5000, // Duración en milisegundos
       
      });
      
      navigate("/login") 

      
      
      
  });
  //para almacenar roles, sedes y tipo
  const [roles, setRoles] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    // Obtener lista de roles
    async function loadRoles(){
      const res1 = await getAllRoles();
      setRoles(res1.data);
      //console.log(res1);
    } 
    loadRoles();

    // Obtener lista de sedes
    async function loadSedes(){
      const res = await getAllSedes();
      setSedes(res.data);
      //console.log(res);
    } 
    loadSedes();

    // Obtener lista de tipos
    async function loadTipos(){
      const res2 = await getAllTipo();
      setTipos(res2.data);
      //console.log(res2);
    } 
    loadTipos();
    
  }, []);

  
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


      <div className="max-w-2xl mx-auto bg-grisclaro rounded-lg shadow-lg p-10 lg:ml-40 lg:mt-10 ">
        <h4 className="text-granate text-3xl font-bold text-center mb-4">FORMULARIO DE ATENCION PARA CONSULTAS O QUEJAS</h4>

        <form onSubmit={onSubmit} >
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-5/6 px-3 mb-3">
                <label>Rol que desempeña:</label>
            </div>
            <div className="w-full md:w-1/6 px-3 mb-3">
              <div
                className="ml-2 w-8 h-8 bg-granate text-white rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => {
                      // Mostrar mensaje de ayuda al hacer clic en el ícono
                      
                      alert("El rol es la actividad que cumple dentro o fuera de la universidad, postulante universitario, madre o padre del estudiante, etc.");
                    }}
                  >
                <span className="text-lg font-bold">?</span>
                
              </div>
            </div>


          </div>
                                                    
          <div className="my-3">
            
              {roles.map((rol) => (
                <label key={rol.id}  style={{ marginRight: "30px" }} >
                  <input
                    type="radio"
                    name="rol"
                    value={rol.id}
                    {...register("rol", { required: true })}
                    className="mr-2"
                    style={{ marginRight: "10px" }}
                  />
                  {rol.nombre}
                </label>
              ))}
          </div>

          <div className=" relative  mb-6">
            <label>Si usted tiene otro Rol, detalle</label>
            <input
              type="text"
              placeholder="Detalle"
              {...register("direccion", )}
              className="bg-grisclaro border border-white p-3 rounded-lg block w-full mb-3 "
            />

          </div>


          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-3">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                placeholder="Nombres"
                {...register("nombre", { required: true })}
                className="bg-zinc-300 p-3 rounded-lg block w-full"
              />
              {errors.nombre && <span>Este campo es requerido</span>}
            </div>
            <div className="w-full md:w-1/2 px-3 mb-3">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                type="text"
                placeholder="Apellidos"
                {...register("apellido", { required: true })}
                className="bg-zinc-300 p-3 rounded-lg block w-full"
              />
              {errors.apellido && <span>Este campo es requerido</span>}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-3">
              <label htmlFor="dni">DNI</label>
              <input
                type="text"
                placeholder="DNI"
                {...register("dni", { required: true })}
                className="bg-zinc-300 p-3 rounded-lg block w-full"
              />
              {errors.dni && <span>Este campo es requerido</span>}
            </div>
            <div className="w-full md:w-1/2 px-3 mb-3">
              <label htmlFor="cui">CUI</label>
              <input
                type="text"
                placeholder="CUI"
                {...register("cui", { required: true })}
                className="bg-zinc-300 p-3 rounded-lg block w-full"
              />
              {errors.cui && <span>Este campo es requerido</span>}
            </div>
          </div>

          <div className="w-64 relative  mb-6">
            <div className="w-64 relative mb-6">
              <label htmlFor="sede">Área/Sede</label>
                <select
                  className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  name="sede"
                  {...register("sede", { required: true })}
                >
                  <option value="">Selecciona una sede...</option>
                  {sedes.map((sede) => (
                    <option key={sede.id} value={sede.id}>
                      {sede.nombre}
                    </option>
                  ))}
                </select>
              {errors.sede && <span>Este campo es requerido</span>}
            </div>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M7.293 8.293a1 1 0 011.414 0L10 9.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                  ></path>
                </svg>
            </div>
          </div>

          <div className=" relative  mb-6">
            <label>Dirección</label>
            <input
              type="text"
              placeholder="Direccion"
              {...register("direccion", { required: true })}
              className="bg-zinc-300 p-3 rounded-lg block w-full mb-3"
            />
            {errors.direccion && <span>Este campo es requerido</span>}
          </div>

          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-3">
              <label htmlFor="telefono">Numero Telefonico</label>
              <input
                type="text"
                placeholder="Numero Telefonico"
                {...register("telefono", { required: true })}
                className="bg-zinc-300 p-3 rounded-lg block w-full"
              />
              {errors.telefono && <span>Este campo es requerido</span>}
            </div>

            <div className="w-full md:w-1/2 px-3 mb-3">
              <label htmlFor="correo">Correo Electronico</label>
              <input
                type="text"
                placeholder="Correo Electronico"
                {...register("correo", { required: true })}
                className="bg-zinc-300 p-3 rounded-lg block w-full"
              />
              {errors.correo && <span>Este campo es requerido</span>}
            </div>
          </div>

        

          <div className="my-3">
            
              {tipos.map((tipo) => (
                <label key={tipo.id}  style={{ marginRight: "50px" }}>
                  <input
                    type="radio"
                    name="tipo"
                    value={tipo.id}
                    {...register("tipo", { required: true })}
                    className="mr-2"
                    style={{ marginRight: "10px" }}
                  />
                  {tipo.nombre}
                </label>
              ))}
          </div>

          <div className=" relative  ">
            <label className=" font-bold">Sustentación de la Solicitud</label>
            <p>(Dede aclararse si se persigue modoficar decisiones ya adoptadas o bien alertar de un supuesto mal funcionamiento con objeto de solventar el problema en el futuro) </p>
          </div>

          <div className="relative  mb-6">
            <textarea
              type="text"
              className="appearance-none block w-full bg-white border border-gris hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline h-24 "
              placeholder="Escribe algo..." {...register("descripcion" , { required: true})}
            />
            {errors.descripcion && <span>Este campo es requerido</span>}
          </div>

          <div className="relative  mb-6">
            <label className="block font-bold mb-2" htmlFor="adjuntos">Archivos Adjuntos</label>
            <p>Adjunta hasta un máximo de 5 archivos. Cada archivo deberá pesar como máximo 2MB.</p>

            <input
              type="file"
              id="adjuntos"
              name="adjuntos"
              className="appearance-none block w-full bg-white border border-gris hover:border-gray-500 px-4 py-5 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline h-15"
              multiple
              accept=".pdf, .doc, .docx, .jpg, .png" 
              max="3"
            />
            
          </div>

          <div className="relative  mb-6">
            <input type="checkbox" id="miCheckbox" className="form-checkbox h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-400" />
            <label htmlFor="miCheckbox" className="ml-2">Autoriza Ud. ser notificado a través de su correo Electronico</label>
          </div>

          <div className="relative  mb-6">
            <p>Apenas se pueda estaremos en contacto contigo. Lamentamos el incidente y te agradecemos tu confianza.</p>

          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-granate p-3 rounded-lg block w-72 mt-3 mx-auto  text-white">
              Registrar
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}