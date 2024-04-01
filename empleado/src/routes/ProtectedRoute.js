import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Spinner from 'react-bootstrap/Spinner';

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const { isAuthenticated, isLoading } = useAuth();
  
    if (isLoading) {
      return <Spinner animation="border" />; // aqui podemos poner un componente de carga
    }
  
    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/" replace />;
  };
  
export default ProtectedRoute;
