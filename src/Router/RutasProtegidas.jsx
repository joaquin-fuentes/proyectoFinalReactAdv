import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../stores/Auth-Store";

const RutasProtegidas = ({ children }) => {
  const { user, checkAuth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth(); // Verifica la autenticación
      setLoading(false); // Cambia el estado de carga a falso una vez que se completa la verificación
    };

    verifyAuth();
  }, [checkAuth]);

  if (loading) {
    return <div>Loading...</div>; // Puedes mostrar un spinner o mensaje de carga mientras se verifica la autenticación
  }

  if (user === null) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RutasProtegidas;
