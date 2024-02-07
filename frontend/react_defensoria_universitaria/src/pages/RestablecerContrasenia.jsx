import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import DjangoCSRFToken from 'django-react-csrftoken';
import { useNavigate, useParams } from "react-router-dom";
import { restablecerContrasenia } from "../api/registros.api";

export function RestablecerContrasenia() {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [confirmationMessage, setConfirmationMessage] = useState(null);
    const [confirmationMessageError, setConfirmationMessageError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar si se está enviando el formulario

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true); // Se establece a true al enviar el formulario
            const message = await restablecerContrasenia(uid, token, data.password);
            setConfirmationMessage(message);
        } catch (error) {
            setConfirmationMessageError('Error al restablecer la contraseña');
            setConfirmationMessage('');
        } finally {
            setIsSubmitting(false); // Se restablece a false después de enviar el formulario
        }
    });

    const password = watch("password", "");
    const confirmPassword = watch("confirmPassword", "");

    return (
        <div className="bg-[url('../../portada2.1.jpg')] bg-cover bg-center h-screen bg-grayscale-50 relative flex justify-center items-center">
            <div className="relative w-8/12 h-screen justify-center items-center">
                <div className="relative flex items-top justify-center min-h-screen sm:items-center bg-zinc-800 bg-blend-screen py-4 sm:pt-0 bg-cover bg-center">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                            <div className="p-6 md:space-y-6 sm:p-8">
                                <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    Recuperación de Contraseña
                                </h1>
                                {confirmationMessage && (
                                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                                        <span className="block sm:inline">{confirmationMessage}</span>
                                    </div>
                                )}
                                {confirmationMessageError && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                        <span className="block sm:inline">{confirmationMessageError}</span>
                                    </div>
                                )}
                                <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                                    <DjangoCSRFToken />
                                    <div className="relative">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Nueva Contraseña</label>
                                        <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" {...register("password", { required: true })} />
                                        {errors.password && <span className="absolute top-full left-0 text-red-500 text-sm">Por favor ingresa una nueva contraseña</span>}
                                    </div>
                                    <div className="relative">
                                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirmar Contraseña</label>
                                        <input type="password" name="confirmPassword" id="confirmPassword" className={`bg-gray-50 border ${password !== confirmPassword ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`} {...register("confirmPassword", { required: true })} />
                                        {password !== confirmPassword && <span className="absolute top-full left-0 text-red-500 text-sm">Las contraseñas no coinciden</span>}
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className="w-full text-white bg-granate-claro hover:bg-granate-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                        {isSubmitting ? 'Cargando...' : 'Restablecer Contraseña'}
                                    </button>
                                </form>
                                {confirmationMessage && (
                                    <button onClick={() => navigate('/login')} className="text-sm text-granate-claro hover:underline mt-2">
                                        Ir a Iniciar Sesión
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
