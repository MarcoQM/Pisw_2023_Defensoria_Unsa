import {BrowserRouter , Routes, Route, Navigate} from "react-router-dom";
import {  BarraPosteriorSolicitud, BarraPosteriorExpediente, BarraPosteriorLogeado } from "./components/BarraPosterior";
import { RegistroIncidencias } from "./pages/RegistroIncidencias";
import { RegistrosPage } from "./pages/RegistrosPage";
import { ConsultaExpediente } from "./pages/ConsultaExpediente";
import {Toaster} from "react-hot-toast";
import { Inicio} from "./pages/Inicio";
import { AdminPanel} from "./pages/AdminPanel";
import { Login } from "./pages/Login";
import { LoginAdministrativos } from "./pages/LoginAdministrativos"; 
import ProtectedRoute from "./components/ProtectedRoute";



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
            <Route path="/consulta" element={<ConsultaExpediente />} />
          </Routes>
          </div>
          </div>

       
        </div>
        <Toaster/>
        
      </BrowserRouter>
  );
}

export default App
