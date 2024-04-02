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

  // Al cargar el componente, intentamos recuperar el estado de autenticación de localStorage
  useEffect(() => {
    const storedAuthState = localStorage.getItem("isAuthenticated");
    if (storedAuthState === null) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(JSON.parse(storedAuthState));
    }
    setIsLoading(false); // Establece isLoading en false una vez que se ha recuperado el estado de autenticación
  }, []);

  // Efecto para registrar en consola cuando el estado de autenticación cambia
  /*useEffect(() => {
    console.log("Usuario autenticado:", isAuthenticated);
  }, [isAuthenticated]); */

  // Función para realizar el inicio de sesión
  const login = () => {
    setIsAuthenticated(true); // Establece isAuthenticated en true al iniciar sesión
    localStorage.setItem("isAuthenticated", true); // Guarda el estado de autenticación en localStorage
  };

  // Función para realizar el cierre de sesión
  const logout = () => {
    setIsAuthenticated(false); // Establece isAuthenticated en false al cerrar sesión
    localStorage.setItem("isAuthenticated", false); // Actualiza el estado de autenticación en localStorage
  };

  // Proporcionamos el contexto de autenticación y las funciones de inicio y cierre de sesión a los componentes hijos
  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
