
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { getAllUsers, getAllEstados, createProceso } from '../api/registros.api';

const ModalActuacion = ({ open, onClose, solicitudId, solicitud_encargado, solicitud_estado }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllUsers();
            setUsers(res.data);
        };

        fetchData();
    }, []);

    const [estados, setEstados] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllEstados();
            setEstados(res.data);
        };
        fetchData();
    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = handleSubmit(async (data) => {

        const formData = new FormData();
        formData.append('solicitud', solicitudId);
        formData.append('estado_solicitud', data.estado_solicitud);
        formData.append('estado_proceso', 1); //Siempre 1
        formData.append('user', data.users);
        formData.append('observaciones', data.observaciones);
        formData.append('organo_universitario_encargado', data.organo_universitario_encargado);
        formData.append('estado_situacional', data.estado_situacional);
        formData.append('remitido', data.remitido);
        formData.append('recomendacion', data.recomendacion);

        await createProceso(formData);
        onClose();
    });

    if (!open) return null;
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                    <div className="flex justify-end items-center border-b p-2 font-semibold text-xs space-x-4">
                        <div className="text-gray-600">
                            {new Date().toLocaleString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <button className="bg-red-500 hover:bg-red-700 text-white px-1 rounded text-sm" onClick={onClose}>
                            X
                        </button>
                    </div>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h2 className="text-granate text-3xl font-bold text-center text-granate-900 mb-4">ACTUALIZAR EXPEDIENTE </h2>
                        <form onSubmit={onSubmit} >
                            <div className="mb-6">
                                <label htmlFor="estado_solicitud" className="block mb-2 text-sm font-medium text-gray-90">Proceso</label>
                                <select name="estado_solicitud" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    defaultValue={solicitud_estado}
                                    {...register("estado_solicitud")}>
                                    <option value=""></option>
                                    {estados.map((estado) => (
                                        <option key={estado.id} value={parseInt(estado.id, 10)}>
                                            {estado.nombre}
                                        </option>
                                    ))}

                                </select>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="users" className="block mb-2 text-sm font-medium text-gray-90">Encargado</label>
                                <select name="users" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    defaultValue={solicitud_encargado}
                                    {...register("users")}>
                                    <option value=""></option>
                                    {users.map((user) => (
                                        <option key={user.id} value={parseInt(user.id, 10)}>
                                            {user.username}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-6">

                                <label htmlFor="observaciones" className="block mb-2 text-sm font-medium text-gray-90">Descripcion de proceso</label>
                                <textarea id="observaciones" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    {...register("observaciones")}></textarea>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="organo-universitario" className="block mb-2 text-sm font-medium text-gray-90">Organo Universitario</label>
                                <input type="text" id="organo-universitario" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    {...register("organo_universitario_encargado")} />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="estado-situacional" className="block mb-2 text-sm font-medium text-gray-90">Estado</label>
                                <input type="text" id="estado-situacional" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    {...register("estado_situacional")} />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="remitido" className="block mb-2 text-sm font-medium text-gray-90">Remitido</label>
                                <input type="text" id="remitido" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    {...register("remitido")} />
                            </div>
                            <div className="mb-6">

                                <label htmlFor="recomendacion" className="block mb-2 text-sm font-medium text-gray-90">Recomendacion</label>
                                <textarea id="recomendacion" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    {...register("recomendacion")}></textarea>

                            </div>

                            <div className="flex justify-center space-x-4">
                                <button
                                    type="submit"
                                    className="bg-blue-500 p-3 rounded-lg w-72 text-white hover:bg-granate-claro"
                                    disabled={false} >
                                    Actualizar
                                </button>
                                <button
                                    type="button"
                                    className="bg-red-500 p-3 rounded-lg w-72 text-white hover:bg-red-700"
                                    disabled={false}
                                    onClick={onClose} >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

ModalActuacion.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    solicitudId: PropTypes.string.isRequired,
    solicitud_encargado: PropTypes.string.isRequired,
    solicitud_estado: PropTypes.string.isRequired
};

export default ModalActuacion;