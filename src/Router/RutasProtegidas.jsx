import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../stores/Auth-Store";
/**
 * Componente de protección de rutas.
 *
 * Este componente se encarga de proteger rutas de la aplicación verificando si
 * el usuario está autenticado. Si el usuario no está autenticado, redirige a la
 * página de inicio de sesión.
 *
 */
const RutasProtegidas = ({ children }) => {
  const { user, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth(); // Verifica la autenticación al montar el componente
  }, [checkAuth]);

  if (user === null) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RutasProtegidas;
