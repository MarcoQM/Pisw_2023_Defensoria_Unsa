
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllUsers } from '../api/registros.api';
import { getAllEstados } from '../api/registros.api';




const ModalActuacion = ({ open, onClose }) => {


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
            console.log("ESTADOS >>>> ", res.data);
        };
        fetchData();
    }, []);


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
                        <form onSubmit={""} >
                            <div className="mb-6">
                                <label htmlFor="sedes" className="block mb-2 text-sm font-medium text-gray-90">Proceso</label>
                                <select name="sedes" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option selected>Selecciona un estado</option>
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
                                >
                                    <option value="">Selecciona un usuario</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={parseInt(user.id, 10)}>
                                            {user.username}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-6">

                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-90">Descripcion de proceso</label>
                                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"></textarea>

                            </div>
                            <div className="mb-6">
                                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-90">Organo Universitario</label>
                                <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-90">Estado</label>
                                <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-90">Remitido</label>
                                <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " />
                            </div>
                            <div className="mb-6">

                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-90">Recomendacion</label>
                                <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"></textarea>

                            </div>

                            <div className="flex justify-center space-x-4">
                                <button
                                    type="submit"
                                    className="bg-blue p-3 rounded-lg w-72 text-white hover:bg-granate-claro"
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
};

export default ModalActuacion;