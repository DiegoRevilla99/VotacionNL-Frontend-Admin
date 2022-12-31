import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../router/PrivateRoute";
import { InicioPage } from "../pages/InicioPage";
import { JornadasFormales } from "../pages/JornadasFormales";

export const MenuRoutes = () => {
  return (
    <PrivateRoute>
      <Routes>
        <Route path="formal" element={<JornadasFormales />} />
      </Routes>
    </PrivateRoute>
  );
};
