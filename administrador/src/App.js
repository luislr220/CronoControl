import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import SolicitudHorario from './Components/SolicitudHorarioComponent/SolicitudHorario';
import ValidarSolis from "./Components/ValidarSolisComponent/ValidarSolis";
import AgregarUsuario from './Components/AgregarUsuarioComponent/AgregarUsuario';
import AgregarEmpleado from './Components/AgregarEmpleadoComponent/AgregarEmpleado';
import TurnoCrud from './Components/TurnoCrudComponent/TurnoCrud';
import MenuLateral from './Components/MenuLateral/MenuLateral';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SolicitudHorario/>}/>
          <Route path='/validar' element={<ValidarSolis/>}/>
          <Route path='/agregarUsuario' element={<AgregarUsuario/>}/>
          <Route path='/agregarEmpleado' element={<AgregarEmpleado/>}/>
          <Route path='/turnoCrud' element={<TurnoCrud/>}/>
          <Route path='/menu' element={<MenuLateral/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
