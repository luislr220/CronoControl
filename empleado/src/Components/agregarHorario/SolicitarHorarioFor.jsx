import React, { useState, useEffect } from "react";
import { useAuth } from "../../routes/AuthContext"; // Asegúrate de importar el contexto de autenticación

export default function SolicitarHorarioFor() {
    const { isAuthenticated, isLoading, user } = useAuth();
    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      if (isLoading) {
        console.log("Autenticación en progreso...");
      } else if (isAuthenticated) {
        if (user) {
          console.log("Usuario autenticado:", user);
          if (!userData) { // Verificar si userData ya está establecido antes de actualizarlo
            setUserData(user);
          }
        } else {
          console.error(
            'Error: El usuario está autenticado, pero el objeto "user" es undefined.'
          );
        }
      } else {
        console.log("El usuario no está autenticado.");
      }
    }, [isLoading, isAuthenticated, user, userData]); // Agregar userData como dependencia
  
    if (isLoading || !userData) {
      return <div>Cargando...</div>;
    }
  
    const nombreCompleto = userData
      ? `${userData.Nombre} ${userData.AppE} ${userData.ApmE}`
      : "";
  
    return (
      <div>
        <h2>Solicitar Horario</h2>
        <form>
          <div>
            <label>Nombre Completo:</label>
            <input type="text" value={nombreCompleto} readOnly />
          </div>
          <div>
            <label>Correo:</label>
            <input type="email" value={userData.Correo} readOnly />
          </div>
          <div>
            <label>Sede:</label>
            <input type="text" value={userData.Region} readOnly />
          </div>
          <div>
            <label>Área:</label>
            <input type="text" value={userData.AreaTrabajo} readOnly />
          </div>
          <button type="submit">Solicitar Horario</button>
        </form>
      </div>
    );
  }
  
