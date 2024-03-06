import './App.css';
import SolicitudHorario from './Components/SolicitudHorarioComponent/SolicitudHorario';
import ValidarSolis from "./Components/ValidarSolisComponent/ValidarSolis";
import AgregarUsuario from './Components/AgregarUsuarioComponent/AgregarUsuario';
import AgregarEmpleado from './Components/AgregarEmpleadoComponent/AgregarEmpleado';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SolicitudHorario/>}/>
          <Route path='/validar' element={<ValidarSolis/>}/>
          <Route path='/agregarUsuario' element={<AgregarUsuario/>}/>
          <Route path='/agregarEmpleado' element={<AgregarEmpleado/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
