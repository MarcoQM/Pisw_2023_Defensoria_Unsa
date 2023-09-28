//import React from 'react';



export function BarraPosterior(){

    return(
        <div className="fixed top-0 w-full z-10">
            <div className=" bg-granate text-white p-4 flex justify-between items-center  ">
                <div className="flex items-center">
                    <img
                    src="\unsa-oficinas.png"
                    alt="Logo UNSA"
                    className=" pl-20 w-50 h-10 mr-2"
                    />
                    <span className=" text-xl font-semibold">Defensoria Universitaria</span>
                </div>
                <button className=" text-white hover:text-gris  py-2 px-4 rounded  text-xl">
                    Consulta por expediente
                </button>
            </div>
        </div>
        
    )
}