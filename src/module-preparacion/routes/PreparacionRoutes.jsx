import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../router/PrivateRoute";
import { InicioPage } from "../pages/InicioPage";
import { HomePreparacion } from "../pages/HomePreparacion";

export const PreparacionRoutes = () => {
  return (
    <PrivateRoute>
      <Routes>
        <Route path="inicio" element={<InicioPage></InicioPage>} />
        <Route path="homePreparacion" element={<HomePreparacion></HomePreparacion>} />

        
        <Route path="/*" element={<Navigate to="/preparacion/homePreparacion" />} />
        <Route path="/*" element={<Navigate to="/preparacion/inicio" />} />
        
        
      </Routes>
    </PrivateRoute>
  );
};
