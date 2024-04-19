/**
 * Nombre del Autor: Luis Armando Largo Ramirez
 *
 * Funcionalidad:
 * Componente para manejar la protección de rutas
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Spinner from 'react-bootstrap/Spinner';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const { isAuthenticated, isLoading } = useAuth();
  
    if (isLoading) {
      return <Spinner animation="border" />; // muestra el spinner si tarda en renderizar
    }
  
    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/" replace />;
  };
  
export default ProtectedRoute;
