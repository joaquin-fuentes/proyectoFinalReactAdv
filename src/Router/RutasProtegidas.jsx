import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../stores/Auth-Store";

const RutasProtegidas = ({ children }) => {
  const { user, checkAuth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setLoading(false);
    };

    verifyAuth();
  }, [checkAuth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user === null) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RutasProtegidas;
