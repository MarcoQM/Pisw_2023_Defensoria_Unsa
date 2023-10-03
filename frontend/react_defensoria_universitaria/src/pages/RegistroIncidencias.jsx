
import { useForm } from "react-hook-form";
import { RegistrosList } from "../components/RegistrosList";
import { RegistroCard } from "../components/RegistroCard";


export function RegistroIncidencias() {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className="Relative" >
      <div className="absolute top-50 right-40">
        <div className="w-20 h-20 sm:w-40 sm:h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
          <img
            src="\defensoria.png" 
            alt="Defensoria"
            className="w-full h-full object-contain" 
          />
        </div>
        <div className="bg-white rounded-lg p-4 w-80 h-90 mx-auto top-80 mt-8">
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


      <div className="max-w-2xl mx-auto bg-grisclaro rounded-lg shadow-lg p-10 ml-40 mt-10">
        <h4 className="text-granate text-3xl font-bold text-center mb-4">FORMULARIO DE ATENCION PARA CONSULTAS O QUEJAS</h4>

        <form >

          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-5/6 px-3 mb-3">
                <label>Rol que desempeña</label>
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
            
              

          <div>
            <div className="my-3">
              <input type="radio" id="estudiante" {...register("rol", { required: true })} value="estudiante" style={{ marginRight: "10px" }} />
              <label htmlFor="estudiante" style={{ marginRight: "50px" }}>Estudiante</label>

              <input type="radio" id="docente" {...register("rol", { required: true })} value="docente" style={{ marginRight: "10px" }} />
              <label htmlFor="docente" style={{ marginRight: "50px" }}>Docente</label>

              <input type="radio" id="administrativo" {...register("rol", { required: true })} value="administrativo" style={{ marginRight: "10px" }} />
              <label htmlFor="administrativo" style={{ marginRight: "50px" }}>Administrativo</label>

              <input type="radio" id="otro" {...register("rol", { required: true })} value="otro" style={{ marginRight: "10px" }} />
              <label htmlFor="otro">Otro</label>
            </div>             
            {errors.rol && <span>Este campo es requerido</span>}
          </div>

          <div className=" relative  mb-6">
            <label>Si usted tiene otro Rol, detalle</label>
            <input
              type="text"
              placeholder="Detalle"
              {...register("direccion", { required: true })}
              className="bg-grisclaro border border-white p-3 rounded-lg block w-full mb-3 "
            />
            {errors.direccion && <span>This field is required</span>}
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
              {errors.nombre && <span>This field is required</span>}
            </div>
            <div className="w-full md:w-1/2 px-3 mb-3">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                type="text"
                placeholder="Apellidos"
                {...register("apellido", { required: true })}
                className="bg-zinc-300 p-3 rounded-lg block w-full"
              />
              {errors.apellido && <span>This field is required</span>}
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
              {errors.dni && <span>This field is required</span>}
            </div>
            <div className="w-full md:w-1/2 px-3 mb-3">
              <label htmlFor="cui">CUI</label>
              <input
                type="text"
                placeholder="CUI"
                {...register("cui", { required: true })}
                className="bg-zinc-300 p-3 rounded-lg block w-full"
              />
              {errors.cui && <span>This field is required</span>}
            </div>
          </div>

          <div className="w-64 relative  mb-6">
            <label htmlFor="sede">Area/Sede</label>
            <select
              className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Selecciona una opción...</option>
              <option value="opcion1">Area Ingenierias</option>
              <option value="opcion2">Area Biomedicas</option>
              <option value="opcion3">Area Sociales</option>
            </select>
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
            {errors.direccion && <span>This field is required</span>}
          </div>

          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-3">
              <label htmlFor="celphone">Numero Telefonico</label>
              <input
                type="text"
                placeholder="Numero Telefonico"
                {...register("celphone", { required: true })}
                className="bg-zinc-300 p-3 rounded-lg block w-full"
              />
              {errors.celphone && <span>This field is required</span>}
            </div>

            <div className="w-full md:w-1/2 px-3 mb-3">
              <label htmlFor="email">Correo Electronico</label>
              <input
                type="text"
                placeholder="Correo Electronico"
                {...register("email", { required: true })}
                className="bg-zinc-300 p-3 rounded-lg block w-full"
              />
              {errors.email && <span>This field is required</span>}
            </div>
          </div>

          <div>
            <label className="relative  mb-6">Tipo de Tramite</label>
            <div className="my-3">
              <input type="radio" id="queja" {...register("tiposolicitud", { required: true })} value="queja" style={{ marginRight: "10px" }} />
              <label htmlFor="queja" style={{ marginRight: "50px" }}>Queja</label>

              <input type="radio" id="reclamo" {...register("tiposolicitud", { required: true })} value="reclamo" style={{ marginRight: "10px" }} />
              <label htmlFor="reclamo" style={{ marginRight: "50px" }}>Reclamo</label>

              <input type="radio" id="sugerencia" {...register("tiposolicitud", { required: true })} value="sugerencia" style={{ marginRight: "10px" }} />
              <label htmlFor="sugerencia" style={{ marginRight: "50px" }}>Sugerencia</label>

              <input type="radio" id="consulta" {...register("tiposolicitud", { required: true })} value="consulta" style={{ marginRight: "10px" }} />
              <label htmlFor="consulta">Consulta</label>
            </div>  
            {errors.genero && <span>Este campo es requerido</span>}
          </div>

          <div className=" relative  ">
            <label className=" font-bold">Sustentación de la Solicitud</label>
            <p>(Dede aclararse si se persigue modoficar decisiones ya adoptadas o bien alertar de un supuesto mal funcionamiento con objeto de solventar el problema en el futuro) </p>
          </div>

          <div className="relative  mb-6">
            <textarea
              type="text"
              className="appearance-none block w-full bg-white border border-gris hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline h-24 "
              placeholder="Escribe algo..."
            />
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