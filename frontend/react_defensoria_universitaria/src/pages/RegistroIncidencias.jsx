import { useForm } from "react-hook-form";
import { getAllSedes, createIncidencia } from "../api/registros.api";
//import { RegistrosList } from "../components/RegistrosList";
//import { RegistroCard } from "../components/RegistroCard";
import { useState, useEffect } from "react";
//import { useState } from "react";
import { toast } from 'react-hot-toast';


import { useNavigate } from "react-router-dom";


export function RegistroIncidencias() {


  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [autorizaNotificacion, setAutorizaNotificacion] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();

    formData.append("organo_universitario", "Defensoria Universitaria");
    formData.append("apellido", data.apellido);
    formData.append("correo", data.correo);
    formData.append("cui", data.cui);
    formData.append("expone", data.expone); // expone
    formData.append("direccion", data.direccion);
    formData.append("dni", data.dni);
    formData.append("nombre", data.nombre);
    formData.append("rol", data.rol);
    formData.append("sede", data.sede);
    formData.append("telefono", data.telefono);
    formData.append("tipo_solicitud", data.tipo_solicitud);
    formData.append("solicita", data.solicita);
    formData.append("encargado", 1);
    formData.append("estado_solicitud", 1);




    const adjuntosInput = document.getElementById("adjuntos");
    for (let i = 0; i < adjuntosInput.files.length; i++) {
      formData.append("archivos", adjuntosInput.files[i]);
    }





    for (const pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
    await createIncidencia(formData);
    console.log(formData);

    toast.success('El registro se ha completado con éxito.  Se le enviara un e-mail con los detalles de su solicitud', {
      duration: 5000, // Duración en milisegundos

    });

    navigate("/inicio")




  });

  //const rolesData = ["Estudiante", "Docente", "Administrativo", "Otros"];

  //para almacenar roles, sedes y tipo

  const [sedes, setSedes] = useState([]);
  //const [isOtroSelected, setIsOtroSelected] = useState(false); 
  const [selectedRol, setSelectedRol] = useState("Estudiante");
  // Nuevo estado para controlar la entrada de texto
  const [detalleEnabled, setDetalleEnabled] = useState(false);
  // Nuevo estado para controlar la entrada de correo
  const [correoPlaceholder, setCorreoPlaceholder] = useState("araozv@unsa.edu.pe");
  // Nuevo estado para controlar la entrada de CUI
  const [cuiDisabled, setCuiDisabled] = useState(false);

  useEffect(() => {



    // Obtener lista de sedes
    async function loadSedes() {

      try {
        const res = await getAllSedes();
        setSedes(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error al obtener datos de la API', error);
      }



    }
    loadSedes();




  }, []);


  return (

    <div className="Relative" >
      <div className="absolute top-50 right-40">
        <div className="hidden lg:block w-20 h-20 sm:w-40 sm:h-40 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 ">
          <img
            src="\defensoria.png"
            alt="Defensoria"
            className="w-full h-full object-cover max-w-full"
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


      <div className="max-w-2xl mx-auto bg-grisclaro  rounded-lg shadow-lg p-10 lg:ml-40 lg:mt-10 ">
        <h4 className="text-granate text-3xl font-bold text-center mb-4">FORMULARIO DE ATENCION PARA CONSULTAS O QUEJAS</h4>

        <form onSubmit={onSubmit} >
          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-5/6 px-3 mb-3">
              <label>Rol que desempeña:</label>
            </div>
            <div className="w-full md:w-1/6 px-3 mb-3">
              <div
                className="ml-2 w-8 h-8 bg-granate-claro text-white rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => {
                  // Mostrar mensaje de ayuda al hacer clic en el ícono
                  alert("El rol es la actividad que cumple dentro o fuera de la universidad, postulante universitario, madre o padre del estudiante, etc.");
                }}
              >
                <span className="text-lg font-bold">?</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            {["Estudiante", "Egresado", "Docente", "Administrativo", "Otros"].map((rol) => (
              <div key={rol} className=" mx-2">
                <label>
                  <input
                    type="radio"
                    name="rol"
                    value={rol}
                    {...register("rol", { required: true })}
                    onChange={() => {
                      console.log("Rol seleccionado:", rol);
                      setSelectedRol(rol);
                      setDetalleEnabled(rol === "Otros");
                      // Cambiar el valor del placeholder cuando el rol es "Otros"
                      setCorreoPlaceholder(rol === "Otros" ? "usuario@gmail.com" : "alumno@unsa.edu.pe");
                      setCuiDisabled(rol === "Otros");
                    }}
                    className=" mx-2"
                  />
                  {rol}
                </label>
              </div>
            ))}
          </div>

          <div className="relative mb-6">
            <label>Si usted tiene otro Rol, detalle</label>
            <input
              type="text"
              placeholder="Detalle"
              className={`${selectedRol === "Otros" ? "bg-white" : "bg-grisclaro"
                } border border-white p-3 rounded-lg block w-full mb-3`}
              {...register("detalle")}
              disabled={!detalleEnabled}
            />
          </div>


          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-3">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                placeholder="Juan Carlos"
                {...register("nombre", { required: true })}
                className="bg-zinc-300 p-3 rounded-lg block w-full"
              />
              {errors.nombre && <span className="font-bold">Este campo es requerido</span>}
            </div>
            <div className="w-full md:w-1/2 px-3 mb-3">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                type="text"
                placeholder="Lopez Mendoza"
                {...register("apellido", { required: true })}
                className="bg-zinc-300 p-3 rounded-lg block w-full"
              />
              {errors.apellido && <span className="font-bold">Este campo es requerido</span>}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-3">
              <label htmlFor="dni">DNI</label>
              <input
                type="text"
                placeholder="87654321"
                {...register("dni", {
                  required: "Este campo es requerido",
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Este campo solo acepta números",
                  },
                })}
                className="bg-zinc-300 p-3 rounded-lg block w-full"
                maxLength="8"
              />
              {errors.dni && <span className="font-bold">{errors.dni.message}</span>}
            </div>

            <div className="w-full md:w-1/2 px-3 mb-3">
              <label htmlFor="cui">CUI</label>
              <input
                type="text"
                placeholder="20231234"
                {...register("cui", {
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Este campo solo acepta números",
                  },
                })}
                className="bg-zinc-300 p-3 rounded-lg block w-full"
                disabled={cuiDisabled}
              />
              {errors.cui && <span className="font-bold">{errors.cui.message}</span>}
            </div>
          </div>

          <div className="w-64 relative  mb-6">
            <label htmlFor="sede">Dependencia</label>
            <select
              className="block w-full bg-white border border-gray-300 hover:bordera-gray-500 p-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              name="sede"
              {...register("sede", { required: true })}
            >
              <option value="">Selecciona una dependencia</option>

              {sedes.map((sede) => (
                <option key={sede.id} value={parseInt(sede.id, 10)}>
                  {sede.nombre}
                </option>
              ))}
            </select>
            {errors.sede && <span className="font-bold">Este campo es requerido</span>}
          </div>

          <div className=" relative  mb-6">
            <label>Dirección</label>
            <input
              type="text"
              placeholder="Direccion"
              {...register("direccion", { required: true })}
              className="bg-zinc-300 p-3 rounded-lg block w-full mb-3"
            />
            {errors.direccion && <span className="font-bold text-center">Este campo es requerido</span>}
          </div>

          <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-3 mb-3">
              <label htmlFor="telefono">Número Telefónico</label>
              <input
                type="text"
                placeholder="Numero Telefonico"
                {...register("telefono", {
                  required: "Este campo es requerido",
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Este campo solo acepta numeros",
                  },
                })}
                className="bg-zinc-300 p-3 rounded-lg block w-full"
              />
              {errors.telefono && <span className="font-bold">{errors.telefono.message}</span>}
            </div>

            <div className="w-full md:w-1/2 px-3 mb-3">
              <label htmlFor="correo">Correo Electrónico</label>
              <input
                type="text"
                placeholder={correoPlaceholder}
                {...register("correo", {
                  required: "Este campo es requerido",
                  pattern: {
                    value: selectedRol === "Otros"
                      ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                      : /^[A-Za-z0-9._%+-]+@unsa\.edu\.pe$/,
                    message: selectedRol === "Otros"
                      ? "No es un correo válido"
                      : "No es un correo institucional válido",
                  },
                })}

                className="bg-zinc-300 p-3 rounded-lg block w-full"
              />
              {errors.correo && <span className="font-bold">{errors.correo.message}</span>}
            </div>
          </div>

          <div className=" relative mb-6">
            <label className="font-bold">Tipo de Solicitud</label>

            <p>Seleccione el tipo de solicitud que quiere presentar:</p>
            <div style={{ display: "flex" }}>
              {['Queja', 'Reclamo', 'Sugerencia', 'Consulta'].map((option, index) => (
                <div key={option} style={{ marginRight: "20px" }}>
                  <label>
                    <input
                      type="radio"
                      name="tipo"
                      value={index + 1}
                      {...register("tipo_solicitud", { required: true })}
                      className="mr-2 mx-2"
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {errors.tipo && <span className="font-bold text-center">Este campo es requerido</span>}

          </div>

          <div className=" relative  ">
            <label className=" font-bold">Solicita</label>
            <p>(Debe aclararse si se persigue modificar decisiones ya adoptadas o bien alertar de un supuesto mal funcionamiento con objeto de solventar el problema en el futuro)</p>
          </div>

          <div className="relative  mb-6">
            <textarea
              type="text"
              className="appearance-none block w-full bg-white border border-gris hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline h-18 "
              placeholder="Motivo de la solicitud..." {...register("solicita", { required: true })}
            />
            {errors.solicita && <span className="font-bold text-center">Este campo es requerido</span>}
          </div>

          <div className=" relative  ">
            <label className=" font-bold">Expone</label>
            <p>(Debe concretarse con suficiente claridad el hecho o hechos que originan la solicitud, así como el motivo y alcance de la pretensión que se plantea.) </p>
          </div>

          <div className="relative  mb-6">
            <textarea
              type="text"
              className="appearance-none block w-full bg-white border border-gris hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline h-24 "
              placeholder="Exponga su solicitud..." {...register("expone", { required: true })}
            />
            {errors.descripcion && <span className="font-bold text-center">Este campo es requerido</span>}
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
            <input type="checkbox" id="miCheckbox" className="form-checkbox h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-400"
              checked={autorizaNotificacion}
              onChange={() => setAutorizaNotificacion(!autorizaNotificacion)}
            />
            <label htmlFor="miCheckbox" className="ml-2">
              Autoriza Ud. ser notificado a través de su correo Electronico
              <span className="text-sm text-red-500 font-bold ml-1">*necesario*</span>
            </label>
          </div>

          <div className="relative  mb-6">
            <p>Apenas se pueda estaremos en contacto contigo. Lamentamos el incidente y te agradecemos tu confianza.</p>

          </div>

          <div className="text-center">
            <button
              type="submit"
              className="  bg-granate-900 p-3 rounded-lg block w-72 mt-3 mx-auto  text-white"
              disabled={!autorizaNotificacion}
            >
              Registrar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}