import React, { useState, useEffect } from "react";
import Navigation from "../NavigationConponent/Navigation";
import { useAuth } from "../../routes/AuthContext";
import "./css/HomeComponent.css";

export default function HomeComponent() {
  //Estado para verificar si el usuario esta autenticado
  const { isAuthenticated, isLoading, user } = useAuth();
  //Estado para guardar y usar los datos del usuario
  const [userData, setUserData] = useState(null);

  //Efecto para cargar los datos del usuario autenticado
  useEffect(() => {
    // Si está cargando, se muestra un mensaje de autenticación en progreso
    if (isLoading) {
      console.log("Autenticación en progreso...");
    }
    // Si está autenticado
    else if (isAuthenticated) {
      // Si el usuario existe
      if (user) {
        console.log("Usuario autenticado:", user);
        // Si userData no existe, se establece con el usuario
        if (!userData) {
          setUserData(user);
        }
      }
      // Si el usuario no existe pero está autenticado, se muestra un error
      else {
        console.error(
          'Error: El usuario está autenticado, pero el objeto "user" es undefined.'
        );
      }
    }
    // Si no está autenticado, se muestra un mensaje de que el usuario no está autenticado
    else {
      console.log("El usuario no está autenticado.");
    }
  }, [isLoading, isAuthenticated, user, userData]);

  //vista alterna si no cargan los datos
  if (isLoading || !userData) {
    return <div>Cargando...</div>;
  }

  //Estadi para anidar el nombre del usuario autenticado
  const nombreCompleto = userData
    ? `${userData.Nombre} ${userData.AppE} ${userData.ApmE}`
    : "";

  return (
    <div>
      <Navigation />
      <div className="InicioBanner">
        <h2>Bienvenido</h2>
        <div className="UserDataContainer">
          <div className="UserDataField">
            <span className="UserDataContent">{nombreCompleto}</span>
          </div>
          <div className="UserDataField">
            <span className="UserDataTitle">Tu correo:</span>
            <span className="UserDataContent">{userData.Correo}</span>
          </div>
          <div className="UserDataField">
            <span className="UserDataTitle">Tu sede:</span>
            <span className="UserDataContent">{userData.Region}</span>
          </div>
          <div className="UserDataField">
            <span className="UserDataTitle">Tu área:</span>
            <span className="UserDataContent">{userData.AreaTrabajo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
