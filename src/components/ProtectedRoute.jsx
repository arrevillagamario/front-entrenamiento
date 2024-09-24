import { Navigate } from "react-router-dom";

// Componente para proteger las rutas
const ProtectedRoute = ({ children }) => {
  // Verifica si existe el userData en localStorage
  const userData = localStorage.getItem("userData");

  // Si no existe, redirige a la página de login
  if (!userData) {
    return <Navigate to="/" />;
  }

  // Si existe, permite el acceso a la ruta
  return children;
};

export default ProtectedRoute;
