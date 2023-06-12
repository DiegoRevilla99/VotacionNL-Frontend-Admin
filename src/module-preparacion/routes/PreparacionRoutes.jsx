import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../../router/PrivateRoute";
import { AddBoletaComite } from "../pages/AddBoletaComite";
import { AddBoletaJornada } from "../pages/AddBoletaJornada";
import { AddBoletaJornadaGenerica } from "../pages/AddBoletaJornadaGenerica";
import { AddPapeleta } from "../pages/AddPapeleta";
import { ConfiguracionConsulta } from "../pages/ConfiguracionConsulta";
import { ConfiguracionJornadaNF } from "../pages/ConfiguracionJornadaNF";
import { ConfiguracionJornadaP } from "../pages/ConfiguracionJornadaP";
import { CrudComite } from "../pages/CrudComite";
import { CrudConsulta } from "../pages/CrudConsulta";
import { CrudJornada } from "../pages/CrudJornada";
import { CrudJornadaGenerica } from "../pages/CrudJornadaGenerica";
import { CrudPapeletas } from "../pages/CrudPapeletas";
import { ConfigBoleta } from "../pages/formales/ConfigBoleta";
import { HomePreparacion } from "../pages/HomePreparacion";
import { ConfigBoletaMultiple } from "../pages/no-formales/ConfigBoletaMultiple";
import { RegistroComite } from "../pages/RegistroComite";
import { RegistroConsultaCiudadana } from "../pages/RegistroConsultaCiudadana";
import { RegistroJornadaFormal } from "../pages/RegistroJornadaFormal";
import { RegistroJornadaNoFormal } from "../pages/RegistroJornadaNoFormal";

export const PreparacionRoutes = () => {
  return (
    <PrivateRoute>
      <Routes>
        <Route path="inicio" element={<HomePreparacion></HomePreparacion>} />

        <Route path="jornada" element={<CrudJornada />} />
        {/* Formales */}
        <Route path="jornada/:id" element={<CrudJornada></CrudJornada>} />
        <Route
          path="registroJornadaFormal"
          element={<RegistroJornadaFormal />}
        />
        <Route
          path="jornada/:id/boleta/:idBoleta"
          element={<AddBoletaJornada />}
        />
        {/* No formales */}
        <Route
          path="registroJornadaNoFormal"
          element={<RegistroJornadaNoFormal />}
        />
        <Route path="jornada/noFormal/:id" element={<CrudJornadaGenerica />} />
        <Route
          path="jornada/noFormal/:id/boletanf/:idBoleta"
          element={<AddBoletaJornadaGenerica />}
        />
        {/*  */}
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

        {/* CONFIGURACION NO FORMAL */}
        <Route
          path="jornadaNoFormal/config/:id"
          element={<ConfiguracionJornadaNF />}
        />
        {/* <Route
          path="jornadaNoFormal/configboleta/:id"
          element={<ConfigBoletaMultiple />}
        /> */}

        <Route
          path="jornadaNoFormal/configboleta/:jornada/:id"
          element={<ConfigBoletaMultiple />}
        />

        {/* <Route 	path="registroJornadaGenerica" element={<RegistroJornadaElectoralGenerica />}/>
				<Route path="JornadaGenerica" element={<CrudJornadaGenerica />} />
				<Route path="JornadaGenerica/boleta" element={<AddBoletaJornadaGenerica />} /> */}

        <Route path="jornada/configboleta" element={<ConfigBoletaMultiple />} />
        <Route
          path="consulta/config/:idConsulta"
          element={<ConfiguracionConsulta />}
        />

        {/* CONFIGURACION FORMAL */}
        <Route path="jornada/config/:id" element={<ConfiguracionJornadaP />} />
        {/* <Route path="jornada/configboleta/:id" element={<ConfigBoleta />} /> */}
        <Route
          path="jornada/configboleta/:jornada/:id"
          element={<ConfigBoleta />}
        />

        {/* CONFIGURACION  NO FORMAL */}
        {/* <Route path="jornadaNoFormal/config" element={<ConfiguracionJornada />} /> */}
        {/* <Route path="jornadaNoFormal/configboleta/:id" element={<ConfigBoletaMultiple />} /> */}

        <Route path="jornada/configboleta" element={<ConfigBoletaMultiple />} />
        <Route
          path="consulta/config/:idConsulta"
          element={<ConfiguracionConsulta />}
        />

        <Route path="/*" element={<Navigate to="/preparacion/inicio" />} />
      </Routes>
    </PrivateRoute>
  );
};
