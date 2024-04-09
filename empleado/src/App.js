import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./routes/AuthContext";
import Permisos from "./Components/SolicitudPermisosComponent/Permisos";
import AgregarHorario from "./Components/agregarHorario/agregarHorario";
import Login from "./Components/LoginFormComponent/LoginForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import Gantt from './Components/gantt/gantt';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/gantt" element={<Gantt />} />
            
            <Route
              path="/Permisos"
              element={<ProtectedRoute element={Permisos} />}
            />
            <Route
              path="/agregarHorario"
              element={<ProtectedRoute element={AgregarHorario} />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
