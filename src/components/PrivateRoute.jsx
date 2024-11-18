import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token"); // Recupera o token armazenado

  if (!token) {
    return <Navigate to="/login" />; // Redireciona para login se não estiver autenticado
  }

  return element; // Retorna o componente protegido
};

export default PrivateRoute;
