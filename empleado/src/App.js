import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Turnos from "./Components/TurnosComponent/Turnos";
import Permisos from "./Components/SolicitudPermisosComponent/Permisos";
import Login from "./Components/LoginFormComponent/LoginForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Turnos" element={<Turnos/>}/>
          <Route path="/Permisos" element={<Permisos/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
