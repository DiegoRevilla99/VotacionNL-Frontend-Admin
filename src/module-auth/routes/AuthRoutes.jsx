import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PublicRoute } from "../../router/PublicRoute";
import { Login } from "../pages/Login";
import { Registro } from "../pages/Registro";

export const AuthRoutes = () => {
  return (
    <PublicRoute>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />

        <Route path="/*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </PublicRoute>
  );
};
