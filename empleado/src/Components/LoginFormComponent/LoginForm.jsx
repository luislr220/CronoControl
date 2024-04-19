/**
 * Nombre del Autor: Luis Armando Largo Ramirez
 *
 * Funcionalidad:
 * Componente que funciona como login, verifica el correo, si el correo es de un usuario
 * que esta en la base de datos y tiene el rol empleado, le manda un correo a su correo
 * con el token de inicio de sesión
 */

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./css/LoginForm.css";
import { useAuth } from "../../routes/AuthContext";
import { Spinner } from "react-bootstrap";

export default function LoginForm() {
  const [email, setEmail] = useState(""); // Estado para el email
  const [token, setToken] = useState(""); // Estado para el token
  const [message, setMessage] = useState(""); // Estado para mostrar el mensaje
  const [tokenSent, setTokenSent] = useState(false); // Estado para controlar si se envió el token
  const navigate = useNavigate(); // Hook de navegación
  const location = useLocation(); // Hook de ubicación
  const [loading, setLoading] = useState() //Estado para el Spinner
  const { login, isAuthenticated } = useAuth(); // Hook para acceder a la función de login y al estado de autenticación del contexto de autenticación

  //useEffect para verifivar si el usuario esta autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate(location.state?.from || "/Inicio");
    }
  }, [isAuthenticated, navigate, location.state?.from]);

  // Efecto para registrar en consola cuando el estado de autenticación cambia
  /*useEffect(() => {
    console.log("Usuario autenticado:", isAuthenticated);
  }, [isAuthenticated]); */

  //Estado para mandar la información del form a el servidor
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Mostrar el spinner de carga
    try {
      // Enviar solicitud al servidor para enviar el token al correo electrónico ingresado
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/administrador/login/token`,
        { Correo: email }
      );
      setMessage(response.data.message);
      setTokenSent(true); // Marcar que se envió el token
    } catch (error) {
      setMessage(
        "Error al enviar la solicitud de inicio de sesión. El correo es incorrecto o el usuario no está dado de alta"
      );
      console.error("Error:", error);
    } finally {
      setLoading(false); // Ocultar el spinner de carga
    }
  };

  //Estado para validar el token e ingresar a la aplicación
  const handleTokenSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/administrador/login/empleado`,
        { correo: email, token: token }
      );
      setMessage(response.data.message);
      if (response.data.message === "Inicio de sesión exitoso") {
        login(response.data.user);
        //console.log(response.data.user);
        navigate("/Inicio");
      }
    } catch (error) {
      setMessage("Error al enviar la solicitud de inicio de sesión.");
      console.error("Error:", error);
    }
  };
  
  
  

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Bienvenido</h1>
        {!tokenSent ? (
          <form onSubmit={handleEmailSubmit} className="email-form">
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
            <button type="submit" className="login-btn">
              {loading ? (
                <Spinner animation="border" variant="light" size="sm" />
              ) : (
                "Obtener Token"
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleTokenSubmit} className="token-form">
            <div className="input-container">
              <input
                type="text"
                placeholder="Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="login-input"
                required
              />
            </div>
            <button type="submit" className="login-btn">
              Iniciar Sesión
            </button>
          </form>
        )}
        <p className="login-message">{message}</p>
      </div>
    </div>
  );
}
