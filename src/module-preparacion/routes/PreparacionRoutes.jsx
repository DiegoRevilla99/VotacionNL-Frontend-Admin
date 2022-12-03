import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../router/PrivateRoute";
import { AddBoletaComite } from "../pages/AddBoletaComite";
import { CrudComite } from "../pages/CrudComite";
import { CrudConsulta } from "../pages/CrudConsulta";
import { CrudJornada } from "../pages/CrudJornada";

import { InicioPage } from "../pages/InicioPage";

export const PreparacionRoutes = () => {
  return (
    <PrivateRoute>
      <Routes>
        <Route path="inicio" element={<InicioPage></InicioPage>} />
        <Route path="comite" element={<CrudComite />} />
        <Route
          path="comite/boleta"
          element={<AddBoletaComite></AddBoletaComite>}
        />
        <Route path="jornada" element={<CrudJornada />} />
        <Route path="consulta" element={<CrudConsulta />} />

        <Route path="/*" element={<Navigate to="/preparacion/inicio" />} />
      </Routes>
    </PrivateRoute>
  );
};
