import React from "react";
import { Route, Routes } from "react-router-dom";
import { PublicRoute } from "../../router/PublicRoute";
// import { PrivateRoute } from "../../router/PrivateRoute";
import { JornadasFormales } from "../pages/JornadasFormales";

export const MenuRoutes = () => {
  return (
    <PublicRoute>
      <Routes>
        <Route path="formal" element={<JornadasFormales />} />
      </Routes>
    </PublicRoute>
  );
};
