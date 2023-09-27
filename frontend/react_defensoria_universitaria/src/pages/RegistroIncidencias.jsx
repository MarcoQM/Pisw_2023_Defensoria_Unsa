
import { useForm } from "react-hook-form";



export function RegistroIncidencias() {
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <div className="absolute top-15 right-4">
        <img
          src="\defensoria.png" 
          alt="Defensoria"
          className="h-40 w-40" // Ajusta el tamaño según tus preferencias
        />
      </div>

      <div className=" max-w-xl mx-auto bg-white rounded-lg shadow-lg p-4 ml-40">
        <h4 className="text-red-900 text-3xl font-bold text-center mb-4">FORMULARIO DE ATENCION PARA CONSULTAS O QUEJAS</h4>

        <form >

          <div>
            <label>Rol que desempeña</label>
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
            {errors.genero && <span>Este campo es requerido</span>}
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
              <label htmlFor="nombre">DNI</label>
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

          <div>
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
              <label htmlFor="">Numero Telefonico</label>
              <input
                type="text"
                placeholder="Numero Telefonico"
                {...register("dni", { required: true })}
                className="bg-zinc-300 p-3 rounded-lg block w-full"
              />
              {errors.dni && <span>This field is required</span>}
            </div>
            <div className="w-full md:w-1/2 px-3 mb-3">
              <label htmlFor="cui">Correo Electronico</label>
              <input
                type="text"
                placeholder="Correo Electronico"
                {...register("cui", { required: true })}
                className="bg-zinc-300 p-3 rounded-lg block w-full"
              />
              {errors.cui && <span>This field is required</span>}
            </div>
          </div>

          <div>
            <label>Tipo de Tramite</label>
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
            {errors.genero && <span>Este campo es requerido</span>}
          </div>




          <div>


            
            <label>Fecha de nacimiento</label>
            <input
              type="date" // Campo de fecha de nacimiento
              placeholder="Fecha de Nacimiento"
              {...register("fecha_nacimiento", { required: true })}
              className="bg-zinc-300 p-3 rounded-lg block w-full mb-3"
            />
            {errors.fecha_nacimiento && <span>This field is required</span>}
          </div>
          <div>
            <label>Género</label>
            <div className="my-3">
              <input type="radio" id="masculino" {...register("genero", { required: true })} value="masculino" style={{ marginRight: "10px" }} />
              <label htmlFor="masculino" style={{ marginRight: "50px" }}>Masculino</label>

              <input type="radio" id="femenino" {...register("genero", { required: true })} value="femenino" style={{ marginRight: "10px" }} />
              <label htmlFor="femenino">Femenino</label>
            </div>
            {errors.genero && <span>Este campo es requerido</span>}
          </div>
          <div>
            <label>Rol (personal de quisco, postulante, etc) detalle</label>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Rol"
                {...register("rol", { required: true })}
                className="bg-zinc-300 p-3 rounded-lg block w-full mb-3"
              />
              <div
                className="ml-2 text-gray-500 cursor-pointer"
                onClick={() => {
                  // Mostrar mensaje de ayuda al hacer clic en el ícono
                  alert("El rol es la actividad que cumple dentro o fuera de la universidad, postulante universitario, madre o padre del estudiante, etc.");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 6v-2"
                  />
                </svg>
              </div>
            </div>
            {errors.rol && <span>Este campo es requerido</span>}
          </div>
          <div>
            <label>Correo electrónico</label>
            <input
              type="text"
              placeholder="Email"
              {...register("email_usuario", { required: true })}
              className="bg-zinc-300 p-3 rounded-lg block w-full mb-3"
            />
            {errors.email_usuario && <span>This field is required</span>}
          </div>
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-3">
              <label htmlFor="telefono">Número telefónico</label>
              <input
                type="text"
                placeholder="Numero Telefónico"
                {...register("telefono", { required: true })}
                className="bg-zinc-300 p-3 rounded-lg block w-full"
              />
              {errors.telefono && <span>This field is required</span>}
            </div>
            <div className="w-full md:w-1/2 px-3 mb-3">
              <label htmlFor="dni:">DNI</label>
              <input
                type="text"
                placeholder="DNI"
                {...register("dni", { required: true })}
                className="bg-zinc-300 p-3 rounded-lg block w-full"
              />
              {errors.dni && <span>This field is required</span>}
            </div>
          </div>
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              {...register("contrasena_usuario", { required: true })}
              className="bg-zinc-300 p-3 rounded-lg block w-full mb-3"
            />
            {errors.contraseña_usuario && <span>This field is required</span>}
          </div>
          <div>
            <label>Reescriba la contraseña:</label>
            <input
              type="password"
              placeholder="Reescriba la contraseña"
              {...register("contrasena_usuario2", { required: true })}
              className="bg-zinc-300 p-3 rounded-lg block w-full mb-3"
            />
            {errors.contraseña_usuario2 && <span>This field is required</span>}
          </div>
          <div>
            <button
              type="submit"
              className="bg-green-500 p-3 rounded-lg block w-full mt-3"
            >
              Guardar
            </button>
          </div>

          <div>
            
              <button
                className="bg-red-500 p-3 rounded-lg w-48 mt-3"
            
              >
                Borrar
              </button>
            
          </div>
        </form>
      </div>
    </div>
  );
}