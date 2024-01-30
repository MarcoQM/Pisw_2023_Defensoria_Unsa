import React from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./SideBar";
import { BarraPosteriorLogeado } from "./BarraPosterior";

export function Layout() {

    return (
        <div className="flex flex-row bg-gray-200">
            <Sidebar />
            <div className="w-full flex-1">

                <BarraPosteriorLogeado />
                <div> {<Outlet />}</div>
            </div>
        </div>
    );
}