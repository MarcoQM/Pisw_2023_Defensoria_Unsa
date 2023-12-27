import {Outlet} from "react-router-dom"

export function Layout() {    


    return (
        <div>
            <div className="bg-sky-200">SideBar</div>
            <div className="bg-teal-200">Header</div>
            <div> {<Outlet/> }</div>
            <div></div>
        </div>
    );
}