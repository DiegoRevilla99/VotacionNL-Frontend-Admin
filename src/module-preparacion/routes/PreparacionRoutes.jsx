import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../router/PrivateRoute";
import { HomePreparacion } from "../pages/HomePreparacion";


export const PreparacionRoutes = () => {
  return (
    <PrivateRoute>
      <Routes>
        <Route path="inicio" element={<HomePreparacion></HomePreparacion>} />

        <Route path="/*" element={<Navigate to="/preparacion/inicio" />} />
        
        
      </Routes>
    </PrivateRoute>
  );
};
