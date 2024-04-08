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
  const [userData, setUserData] = useState(null);

  // Al cargar el componente, intentamos recuperar el estado de autenticación de localStorage
  useEffect(() => {
    const storedAuthState = localStorage.getItem("isAuthenticated");
    const storedUserData = localStorage.getItem("userData");

    if (storedAuthState === "true" && storedUserData) {
      setIsAuthenticated(true);
      setUserData(JSON.parse(storedUserData));
    }

    setIsLoading(false);
  }, []);

  // Función para realizar el inicio de sesión
  const login = (userData) => {
    setIsAuthenticated(true);
    setUserData(userData);
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  // Función para realizar el cierre de sesión
  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userData");
  };

  // Proporcionamos el contexto de autenticación y las funciones de inicio y cierre de sesión a los componentes hijos
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, userData, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
