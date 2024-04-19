/**
 * Nombre del Autor: Luis Armando Largo Ramirez
 *
 * Funcionalidad:
 * Contexto para manejar la autenticación del usuario y sus datos
 */


import React, { createContext, useContext, useState, useEffect } from "react";

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);

// Componente proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  // Estado para almacenar si el usuario está autenticado o no
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Estado para almacenar si se está cargando el estado de autenticación
  const [isLoading, setIsLoading] = useState(true);

  // Estado para almacenar el objeto user
  const [user, setUser] = useState(null);

  // Al cargar el componente, intentamos recuperar el estado de autenticación de localStorage
  useEffect(() => {

    const storedAuthState = localStorage.getItem("isAuthenticated");
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "null" && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser)); // Recupera los datos del usuario de localStorage
    }
    
    if (storedAuthState === null) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(JSON.parse(storedAuthState));
      if (storedUser && storedUser !== "null" && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    }
    setIsLoading(false);
  }, []);

  // Efecto para registrar en consola cuando el estado de autenticación cambia
  /*useEffect(() => {
    console.log("Usuario autenticado:", isAuthenticated);
  }, [isAuthenticated]); */

  // Función para realizar el inicio de sesión
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("user", JSON.stringify(userData));
    //console.log(localStorage.getItem("user"));
  };

  // Función para realizar el cierre de sesión
  const logout = () => {
    setIsAuthenticated(false); // Establece isAuthenticated en false al cerrar sesión
    setUser(null); // Limpia el objeto user
    localStorage.setItem("isAuthenticated", false); // Actualiza el estado de autenticación en localStorage
    localStorage.removeItem("user"); // Elimina los datos del usuario de localStorage
  };

  // Proporcionamos el contexto de autenticación y las funciones de inicio y cierre de sesión a los componentes hijos
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
