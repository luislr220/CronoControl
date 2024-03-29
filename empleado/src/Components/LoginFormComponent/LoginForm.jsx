import React, { useState } from "react";
import axios from "axios";
import "./css/LoginForm.css";

export default function LoginForm() {
  const [email, setEmail] = useState(""); // Estado el email
  const [token, setToken] = useState(""); // Estado para el token
  const [message, setMessage] = useState(""); // Estado para mostrar el mensaje
  const [tokenSent, setTokenSent] = useState(false); // Estado para controlar si se envió el token

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar solicitud al servidor para enviar el token al correo electrónico ingresado
      const response = await axios.post(
        "http://localhost:3002/administrador/login/token",
        { Correo: email }
      );
      setMessage(response.data.message);
      setTokenSent(true); // Marcar que se envió el token
    } catch (error) {
      setMessage("Error al enviar la solicitud de inicio de sesión. El correo es incorrecto o el usuario no esta dado de alta");
      console.error("Error:", error);
    }
  };

  const handleTokenSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar solicitud al servidor para validar el inicio de sesión con el correo electrónico y el token ingresados
      const response = await axios.post(
        "http://localhost:3002/administrador/login",
        { correo: email, token: token }
      );
      setMessage(response.data.message);
      // Si el inicio de sesión es exitoso, redirige al usuario a la página principal
      if (response.data.message === "Inicio de sesión exitoso") {
        window.location.href = "/Turnos";
      }
    } catch (error) {
      setMessage(
        "Error al enviar la solicitud de inicio de sesión."
      );
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
              Obtener Token
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
