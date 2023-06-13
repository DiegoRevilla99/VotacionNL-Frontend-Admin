import React from "react";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../router/PrivateRoute";
// import { PrivateRoute } from "../../router/PrivateRoute";
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
