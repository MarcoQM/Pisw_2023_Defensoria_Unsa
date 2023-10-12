import {BrowserRouter , Routes, Route, Navigate} from "react-router-dom";
import {  BarraPosteriorSolicitud} from "./components/BarraPosterior";
import { RegistroIncidencias } from "./pages/RegistroIncidencias";
import { RegistrosPage } from "./pages/RegistrosPage";
import { ConsultaExpediente } from "./pages/ConsultaExpediente";
import {Toaster} from "react-hot-toast";
import { Login} from "./pages/Login";

function App() {
  return (
    <BrowserRouter>   
        <div className="">
          <BarraPosteriorSolicitud />
          <div className=" mt-10">
              <div className="bg-[url('../portada2.1.jpg')]   bg-cover bg-center h-screen bg-grayscale-50  w-/12 py-9 " >
                <Routes>
                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route path="/registro-incidencias" element={<RegistroIncidencias/>}/>
                  <Route path="/registros-page" element={<RegistrosPage/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/consulta" element={<ConsultaExpediente/>}/>
                </Routes>
              </div>
          </div>
        </div>
        <Toaster/>
        
      </BrowserRouter>
  );
}

export default App
