import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../router/PrivateRoute";
import { InicioPage } from "../pages/InicioPage";
import { HomePreparacion } from "../pages/HomePreparacion";
import { HomeJElectoral } from "../pages/HomeJElectoral";
import { PcrudBoleta } from "../pages/PcrudBoleta";

export const PreparacionRoutes = () => {
  return (
    <PrivateRoute>
      <Routes>
        <Route path="inicio" element={<InicioPage></InicioPage>} />
        <Route path="homePreparacion" element={<HomePreparacion></HomePreparacion>} />
        <Route path="homeJElectoral" element={<HomeJElectoral></HomeJElectoral>} />
        <Route path="pcrudBoleta" element={<PcrudBoleta></PcrudBoleta>} />


        <Route path="/*" element={<Navigate to="/preparacion/pcrudBoleta" />} />
        <Route path="/*" element={<Navigate to="/preparacion/homeJElectoral" />} />
        <Route path="/*" element={<Navigate to="/preparacion/homePreparacion" />} />
        <Route path="/*" element={<Navigate to="/preparacion/inicio" />} />
        
        
      </Routes>
    </PrivateRoute>
  );
};
