import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ValidarSolis from "./Components/ValidarSolisComponent/ValidarSolis";
import AgregarUsuario from './Components/AgregarUsuarioComponent/AgregarUsuario';
import TurnoCrud from './Components/TurnoCrudComponent/TurnoCrud';
import AgregarSede from './Components/agregarsede/agregarsede';
import AgregarArea from './Components/agregararea/agregararea';
import AgregarContrato from './Components/contratos/agregarContrato';
import AgregarHorario from './Components/agregarHorario/agregarHorario';
import AsignarActividades from './Components/asiganacionActividades/actividades'; // Corregí la importación

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route key="validar-solis" path='/' element={<ValidarSolis />} />
          <Route key="agregar-usuario" path='/agregarUsuario' element={<AgregarUsuario />} />
          <Route key="turno-crud" path='/turnoCrud' element={<TurnoCrud />} />
          <Route key="agregar-sede" path='/agregarSede' element={<AgregarSede />} />
          <Route key="agregar-area" path='/agregarArea' element={<AgregarArea />} />
          <Route key="validar-solis" path='/ValidarSolis' element={<ValidarSolis />} />
          <Route key="agregar-contrato" path='/agregarContrato' element={<AgregarContrato />} />
          <Route key="agregar-horario" path='/agregarHorario' element={<AgregarHorario />} />
          <Route key="asignar-actividades" path='/AsignarActividades' element={<AsignarActividades />} /> {/* Corregí el nombre del componente y añadí una clave única */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
