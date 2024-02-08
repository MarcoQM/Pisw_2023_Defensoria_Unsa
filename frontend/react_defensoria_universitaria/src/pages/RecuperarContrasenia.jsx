import { useState } from 'react';
import { useForm } from "react-hook-form";
import { enviarEmailConfirmacion } from "../api/registros.api";

export function RecuperarContrasenia() {
    const { register, handleSubmit } = useForm();
    const [emailError, setEmailError] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState(null);
    const [confirmationMessageError, setConfirmationMessageError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // Nuevo estado para indicar si se está enviando el correo
    
    const onSubmit = handleSubmit(async (data) => {
        try {
            setConfirmationMessage('');
            if (!data.email) {
                setEmailError(true);
                return;
            }
            setIsSubmitting(true); // Marcar que se está enviando el correo
            const message = await enviarEmailConfirmacion(data.email);
            setConfirmationMessage(message);
            setConfirmationMessageError("");
        } catch (error) {
            setConfirmationMessageError(error);
            //console.error('Error al enviar correo de recuperación de contraseña:', error);
        } finally {
            setIsSubmitting(false); // Asegurarse de que se restablezca el estado, incluso si hay un error
        }
    });

    return (
        <div className="bg-[url('../portada2.1.jpg')] bg-cover bg-center h-screen bg-grayscale-50 relative flex justify-center items-center">
            <div className="relative w-8/12 h-screen justify-center items-center">
                <div className="relative flex items-top justify-center min-h-screen sm:items-center bg-zinc-800 bg-blend-screen py-4 sm:pt-0 bg-cover bg-center">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                            <div className="p-6 md:space-y-6 sm:p-8">
                                <a href="../" className="flex flex-col items-center justify-center text-2xl font-semibold text-gray-900">
                                    <img className="w-1/2 h-1/2" src="../defensoria.png" alt="Logo Defensoría" />
                                </a>
                                <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    Recuperación de Contraseña
                                </h1>
                                <h2 className="text-center text-xs leading-tight tracking-tight text-gray-900 md:text-sm">
                                    Ingresa tu correo electrónico para recuperar tu contraseña
                                </h2>
                                {confirmationMessage && (
                                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                        <span className="block sm:inline">{confirmationMessage}</span>
                                    </div>
                                )}
                                {confirmationMessageError && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                        <span className="block sm:inline">{confirmationMessageError}</span>
                                    </div>
                                )}
                                <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                                    
                                    <div className="relative">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Correo Electrónico</label>
                                        <input type="text" name="email" id="email" className={`bg-gray-50 border ${emailError ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`} placeholder="name@unsa.edu.pe" {...register("email", { required: true })} />
                                        {emailError && <span className="absolute top-full left-0 text-red-500 text-sm">Por favor ingresa tu correo electrónico</span>}
                                    </div>
                                    <button type="submit" className={`w-full text-white bg-granate-claro hover:bg-granate-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}> {/* Deshabilitar el botón mientras se envía el correo */}
                                        {isSubmitting ? 'Enviando...' : 'Enviar Correo'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
