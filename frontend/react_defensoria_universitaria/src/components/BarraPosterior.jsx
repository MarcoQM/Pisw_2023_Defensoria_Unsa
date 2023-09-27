//import React from 'react';



export function BarraPosterior(){

    return(
        <div className="fixed top-0 w-full z-10">
            <div className="bg-red-900 text-white p-4 flex justify-between items-center  ">
                <div className="flex items-center">
                    <img
                    src="\unsa-oficinas.png"
                    alt="Logo UNSA"
                    className="w-50 h-10 mr-2"
                    />
                    <span className="text-xl font-semibold">Defensoria Universitaria</span>
                </div>
                <button className="bg-yellow-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    Consulta por expediente
                </button>
            </div>
        </div>
        
    )
}