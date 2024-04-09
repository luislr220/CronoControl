import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./css/LoginForm.css";
import { useAuth } from "../../routes/AuthContext";
import { Spinner } from "react-bootstrap";

export default function LoginForm() {
  const [email, setEmail] = useState(""); // Estado para el email
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [message, setMessage] = useState(""); // Estado para mostrar el mensaje
  const navigate = useNavigate(); // Hook de navegación
  const location = useLocation(); // Hook de ubicación
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth(); // Hook para acceder a la función de login y al estado de autenticación del contexto de autenticación

  useEffect(() => {
    if (isAuthenticated) {
      navigate(location.state?.from || "/agregarUsuario"); // Navega a la ruta anterior o a '/Turnos' por defecto
    }
  }, [isAuthenticated, navigate, location.state?.from]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Mostrar el spinner de carga
    try {
      // Enviar solicitud al servidor para iniciar sesión con correo y contraseña
      const response = await axios.post(
        "http://localhost:3002/administrador/login",
        { correo: email, contraseña: password }
      );
      setMessage(response.data.message);
      if (response.data.message === "Inicio de sesión exitoso") {
        login(response.data.user);
        console.log(response.data.user); // Agrega esta línea para verificar los datos del usuario
        navigate("/agregarUsuario");
      }
    } catch (error) {
      setMessage("Error al enviar la solicitud de inicio de sesión.");
      console.error("Error:", error);
    } finally {
      setLoading(false); // Ocultar el spinner de carga
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Bienvenido</h1>
        <form onSubmit={handleLoginSubmit} className="login-form">
          <div className="input-container">
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <button type="submit" className="login-btn">
            {loading ? (
              <Spinner animation="border" variant="light" size="sm" />
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>
        <p className="login-message">{message}</p>
      </div>
    </div>
  );
}
