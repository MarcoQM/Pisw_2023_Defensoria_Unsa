


//import { RegistrosList } from "../components/RegistrosList";
//import { useState } from 'react';
import Sidebar from "../components/SideBar";

import TablaExpediente from '../components/TablaExpediente';
// import SoliDetails from "../components/SoliDetails";


export function AdminPanel() {

    

    return (
        <div className="flex flex-col">
            {/* Panel de Administración */}        

  
       // <div className="flex flex-wrap">
        //    {/* Panel de Administración */}
            <div className="w-full">
                <Sidebar/>
                
            </div>


            {/* Contenido Principal */}
            

            <TablaExpediente />
        </div>
    );
}
