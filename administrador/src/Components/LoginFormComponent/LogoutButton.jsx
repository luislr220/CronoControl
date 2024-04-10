/**
 * Nombre del Autor: Luis Armando Largo Ramirez
 *
 * Funcionalidad:
 * Componente para el boton de cierre de sesión
 */

import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../routes/AuthContext";

export default function LogoutButton() {
  const [message, setMessage] = useState("");//estado para mostrar un mensaje
  const { logout } = useAuth(); // Importa la función logout del contexto

  //Estado para cerrar sesión
  const handleLogout = async () => {
    try {
      // Enviar solicitud al servidor para cerrar sesión
      const response = await axios.post("http://localhost:3002/administrador/logout");
      if (response.data.message === "Sesión cerrada exitosamente") {
        // Limpiar el token almacenado en el cliente
        localStorage.removeItem("sessionToken"); // O cualquier otra forma de almacenamiento utilizada
        logout(); // Actualiza el estado de autenticación en el contexto
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = "/";
      }
    } catch (error) {
      setMessage("Error al cerrar sesión.");
      console.error("Error:", error);
    }
  };


  return (
    <div>
      <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
      {message && <p>{message}</p>}
    </div>
  );
}
