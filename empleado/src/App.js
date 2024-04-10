import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./routes/AuthContext";
import HomeComponent from './Components/Homecomponent/HomeComponent';
import Login from "./Components/LoginFormComponent/LoginForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import Permiso from "./Components/SolicitudPermisosComponent/Permiso"
import SolicitarHorario from './Components/agregarHorario/SolicitarHorario';
import Gantt from './Components/gantt/gantt'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/gantt" element={<Gantt />} />
            
            <Route
              path="/Inicio"
              element={<ProtectedRoute element={HomeComponent} />}
            />
            <Route
              path="/permiso"
              element={<ProtectedRoute element={Permiso} />}
            />
            <Route
              path="/agregarHorario"
              element={<ProtectedRoute element={SolicitarHorario} />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
