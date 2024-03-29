import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./routes/AuthContext";
import Turnos from "./Components/TurnosComponent/Turnos";
import Permisos from "./Components/SolicitudPermisosComponent/Permisos";
import Login from "./Components/LoginFormComponent/LoginForm";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/Turnos"
              element={<ProtectedRoute element={Turnos} />}
            />
            <Route
              path="/Permisos"
              element={<ProtectedRoute element={Permisos} />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
