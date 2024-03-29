import React, { useState } from "react";
import axios from "axios";

export default function LogoutButton() {
  const [message, setMessage] = useState("");

  const handleLogout = async () => {
    try {
      // Enviar solicitud al servidor para cerrar sesión
      const response = await axios.post("http://localhost:3002/administrador/logout");
      if (response.data.message === "Sesión cerrada exitosamente") {
        // Limpiar el token almacenado en el cliente
        localStorage.removeItem("sessionToken"); // O cualquier otra forma de almacenamiento utilizada
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = "/"; // Cambia "/login" por la ruta de tu página de inicio de sesión
      }
    } catch (error) {
      setMessage("Error al cerrar sesión.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Cerrar Sesión</button>
      {message && <p>{message}</p>}
    </div>
  );
}
