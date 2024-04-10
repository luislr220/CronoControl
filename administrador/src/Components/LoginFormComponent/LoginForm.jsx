/**
 * Nombre del Autor: Luis Armando Largo Ramirez
 *
 * Funcionalidad:
 * Componente para login, este componte es el login y usa la ruta del servidor /administrador/login
 * para validar si el correo del usuario esta dado de alta y si esta dado de alta valida si le pertenece
 * a un usuario con rol administrador y asi pueda ingresar con la contraseña que tiene 
 */

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
  const [loading, setLoading] = useState(false); //hook para el spinner
  const { login, isAuthenticated } = useAuth(); // Hook para acceder a la función de login y al estado de autenticación del contexto de autenticación

  //useEffect para verificar si el usuario se autentica correctamente y mandarlo
  //a la página principal
  useEffect(() => {
    if (isAuthenticated) {
      navigate(location.state?.from || "/agregarUsuario");
    }
  }, [isAuthenticated, navigate, location.state?.from]);

  //Estado para mandar la información de los datos del form a el servidor
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
        //console.log(response.data.user);
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
