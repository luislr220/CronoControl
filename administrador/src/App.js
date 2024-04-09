import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./routes/AuthContext";
import ValidarSolis from "./Components/ValidarSolisComponent/ValidarSolis";
import AgregarUsuario from "./Components/AgregarUsuarioComponent/AgregarUsuario";
import TurnoCrud from "./Components/TurnoCrudComponent/TurnoCrud";
import AgregarSede from "./Components/agregarsede/agregarsede";
import AgregarArea from "./Components/agregararea/agregararea";
import AgregarContrato from "./Components/contratos/agregarContrato";
import AgregarHorario from "./Components/agregarHorario/agregarHorario"; // Importa AgregarHorario aquí
import AsignarActividades from "./Components/asiganacionActividades/actividades"; // Corregí la importación
import ValidarVacaciones from "./Components/ValidarVacacionesComponent/ValidarVacaciones";
import Login from "./Components/LoginFormComponent/LoginForm";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
          <Route path="/" element={<Login />} />
            <Route path="/validarSolis" element={<ValidarSolis />} />
            <Route path="/agregarUsuario" element={<AgregarUsuario />} />
            <Route path="/turnoCrud" element={<TurnoCrud />} />
            <Route path="/agregarSede" element={<AgregarSede />} />
            <Route path="/agregarArea" element={<AgregarArea />} />
            <Route path="/ValidarSolis" element={<ValidarSolis />} />
            <Route path="/agregarContrato" element={<AgregarContrato />} />
            <Route path="/agregarHorario" element={<AgregarHorario />} />
            <Route path="validarVaca" element={<ValidarVacaciones />} />
            <Route
              key="asignar-actividades"
              path="/AsignarActividades"
              element={<AsignarActividades />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
