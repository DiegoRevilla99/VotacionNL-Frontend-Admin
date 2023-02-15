import { Box } from "@mui/material";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../router/PrivateRoute";
import { Consultas } from "../pages/consultas/Consultas";
import { EmpadronamientoC } from "../pages/consultas/EmpadronamientoC";
import { Empadronamiento } from "../pages/formales/Empadronamiento";
import { JornadasFormales } from "../pages/formales/JornadasFormales";

import { InicioPage } from "../pages/InicioPage";
import { EmpadronamientoNF } from "../pages/no-formales/EmpadronamientoNF";
import { JornadasNoFormales } from "../pages/no-formales/JornadasNoFormales";

export const EmpadronamientoRoutes = () => {
  return (
    
  <PrivateRoute>
      <Routes>
        <Route path="/" element={<InicioPage></InicioPage>} />
        <Route path="formal" element={<JornadasFormales />} />
        <Route path="formal/:id" element={<Empadronamiento />} />
        <Route path="noformal" element={<JornadasNoFormales />} />
        <Route path="noformal/:id" element={<EmpadronamientoNF />} />
        <Route path="consultas" element={<Consultas />} />
        <Route path="consultas/:id" element={<EmpadronamientoC />} />

        <Route path="/*" element={<Navigate to="/empadronamiento/" />} />
      </Routes>
    </PrivateRoute>
    
    
  );
};
