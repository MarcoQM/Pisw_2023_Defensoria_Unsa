import {BrowserRouter , Routes, Route, Navigate} from "react-router-dom";
import {  BarraPosteriorSolicitud, BarraPosteriorExpediente, BarraPosteriorLogeado } from "./components/BarraPosterior";
import { RegistroIncidencias } from "./pages/RegistroIncidencias";
import { RegistrosPage } from "./pages/RegistrosPage";
import { ConsultaExpediente } from "./pages/ConsultaExpediente";
import {Toaster} from "react-hot-toast";
import { Inicio} from "./pages/Inicio";
import { AdminPanel} from "./pages/AdminPanel";
import { AdminReportes} from "./pages/AdminReportes";
import { AdminReportesG} from "./pages/AdminReportesG";
import { AdminUsuarios} from "./pages/AdminUsuarios";
import { AdminNotificaciones} from "./pages/AdminNotificaciones";
import { Login } from "./pages/Login";
import { LoginAdministrativos } from "./pages/LoginAdministrativos"; 
import ProtectedRoute from "./components/ProtectedRoute";
import  SoliDetails  from "./components/SoliDetails";



function App() {
  return (
    <BrowserRouter>   
        <div className="">
          <Routes>
            {/* Rutas con BarraPosteriorSolicitud */}
            <Route path="/" element={<BarraPosteriorSolicitud />} />
            <Route path="/registro-incidencias" element={<BarraPosteriorSolicitud />} />
            <Route path="/registros-page" element={<BarraPosteriorSolicitud />} />
            <Route path="/inicio" element={<BarraPosteriorSolicitud />} />
            <Route path="/login" element={<BarraPosteriorSolicitud />} />
            <Route path="/login2" element={<BarraPosteriorSolicitud />} />
            

            {/* Ruta con BarraPosteriorPendiente */}
            <Route path="/consulta" element={<> <BarraPosteriorExpediente />
            
            </>}/>
 
            <Route path="/admin" element={<> <BarraPosteriorLogeado />
          
            </>}/>
            <Route path="/reportes" element={<> <BarraPosteriorLogeado />
            </>}/>
            <Route path="/reportesg" element={<> <BarraPosteriorLogeado />
            </>}/>
            <Route path="/notificaciones" element={<> <BarraPosteriorLogeado />
            </>}/>
            <Route path="/usuarios" element={<> <BarraPosteriorLogeado />
            </>}/>
            <Route path="/solicitudes/:solicitudId" element={ <BarraPosteriorLogeado />} />

          </Routes>

          <div className=" mt-10">
          <div className="bg-cover bg-center h-screen bg-grayscale-50 w-/12 py-9">
          <Routes>
            <Route path="/" element={<Navigate to="/inicio" />} />
            <Route path="/registro-incidencias" element={<RegistroIncidencias />} />
            <Route path="/registros-page" element={<RegistrosPage />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/login" element={<LoginAdministrativos />} />
            <Route path="/admin" element={<ProtectedRoute element={<AdminPanel />} />} />
            <Route path="/reportes" element={<ProtectedRoute element={<AdminReportes />} />} />
            <Route path="/reportesg" element={<ProtectedRoute element={<AdminReportesG />} />} />
            <Route path="/notificaciones" element={<ProtectedRoute element={<AdminNotificaciones />} />} />
            <Route path="/usuarios" element={<ProtectedRoute element={<AdminUsuarios />} />} />
            <Route path="/consulta" element={<ConsultaExpediente />} />

            <Route path="/solicitudes/:solicitudId" element={<SoliDetails/>} />
          </Routes>
          </div>
          </div>

       
        </div>
        <Toaster/>
        
      </BrowserRouter>
  );
}

export default App
