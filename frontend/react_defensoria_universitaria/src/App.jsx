import {BrowserRouter , Routes, Route, Navigate} from "react-router-dom";
import {  BarraPosterior} from "./components/BarraPosterior";
import { RegistroIncidencias } from "./pages/RegistroIncidencias";
import {Toaster} from "react-hot-toast";

function App() {
 

  return (

    <BrowserRouter>   
        <div className="">
          

          <BarraPosterior />

          <div className=" mt-10">

              <div className="bg-gray-200 h-screen w-/12 py-9 px-4">
                <Routes>
                  <Route path="/" element={<Navigate to="/registro-incidencias" />} />
                  <Route path="/registro-incidencias" element={<RegistroIncidencias/>}/>
                 
                </Routes>
              </div>
          </div>
        </div>
        <Toaster/>
        
      </BrowserRouter>

    
  );
}

export default App
