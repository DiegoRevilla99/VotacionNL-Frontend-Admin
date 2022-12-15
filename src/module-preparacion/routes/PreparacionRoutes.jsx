import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../router/PrivateRoute";
import { AddBoletaComite } from "../pages/AddBoletaComite";
import { AddBoletaJornada } from "../pages/AddBoletaJornada";
import { AddPapeleta } from "../pages/AddPapeleta";
import { CrudComite } from "../pages/CrudComite";
import { CrudConsulta } from "../pages/CrudConsulta";
import { CrudJornada } from "../pages/CrudJornada";
import { HomePreparacion } from "../pages/HomePreparacion";
import { RegistroJornadaElectoral } from "../pages/RegistroJornadaElectoral";
import { RegistroComite } from "../pages/RegistroComite";
import { RegistroConsultaCiudadana } from "../pages/RegistroConsultaCiudadana";
import { ConfiguracionJornada } from "../pages/ConfiguracionJornada";
import { ConfiguracionBoleta } from "../pages/ConfiguracionBoleta";
import { ConfigBoleta } from "../pages/formales/ConfigBoleta";
import { ConfigBoletaMultiple } from "../pages/no-formales/ConfigBoletaMultiple";
import { CrudPapeletas } from "../pages/CrudPapeletas";

export const PreparacionRoutes = () => {
  return (
    <PrivateRoute>
      <Routes>
        <Route path="inicio" element={<HomePreparacion></HomePreparacion>} />

        <Route path="registroJornada" element={<RegistroJornadaElectoral />} />
        <Route path="jornada" element={<CrudJornada />} />
        <Route
          path="jornada/boleta"
          element={<AddBoletaJornada></AddBoletaJornada>}
        />

        <Route path="comite" element={<CrudComite />} />
        <Route
          path="comite/boleta"
          element={<AddBoletaComite></AddBoletaComite>}
        />
        <Route
          path="comite/boleta/:nombre"
          element={<AddBoletaComite></AddBoletaComite>}
        />
        <Route path="registroComite" element={<RegistroComite />} />

        <Route path="consulta" element={<CrudConsulta />} />
        <Route
          path="registroConsultaCiudadana"
          element={<RegistroConsultaCiudadana />}
        />
        {/* <Route path="consulta/papeleta" element={<AddPapeleta />} /> */}
        <Route path="consulta/:id" element={<CrudPapeletas />} />
        {/* <Route path="registroConsultaCiudadana" element={<RegistroConsultaCiudadana />} /> */}
        <Route
          path="consulta/:id/papeleta/:idPapeleta"
          element={<AddPapeleta />}
        />

        {/* CONFIGURACION */}
        <Route path="jornada/config" element={<ConfiguracionJornada />} />
        <Route path="jornada/configboleta" element={<ConfigBoleta />} />
        {/* <Route path="jornada/configboleta" element={<ConfigBoletaMultiple />} /> */}

        <Route path="/*" element={<Navigate to="/preparacion/inicio" />} />
      </Routes>
    </PrivateRoute>
  );
};
