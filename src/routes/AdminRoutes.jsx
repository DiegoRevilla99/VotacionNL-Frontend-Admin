import { Alert, Slide, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useUiStore } from "../hooks/useUiStore";
import { EmpadronamientoRoutes } from "../module-empadronamiento/routes/EmpadronamientoRoutes";
// import { VisualizadorDePDF } from "../module-jornada/pages/VisualizadorDePDF";
import { JornadaRoutes } from "../module-jornada/routes/JornadaRoutes";
import { PreparacionRoutes } from "../module-preparacion/routes/PreparacionRoutes";
import { SidebarCustom } from "../ui/components/SidebarCustom";
import { Topbar } from "../ui/components/Topbar";
import { InicioInfo } from "../InicioInfo";

export const AdminRoutes = () => {
  const {
    status,
    toastCheckingMessage,
    toastErrorMessage,
    toastSuccessMessage,
    toastOffOperation,
  } = useUiStore();
  const [selected, setSelected] = useState("Inicio");

  console.log("MENSAJE: ", toastSuccessMessage);
  console.log("STATUS: ", status);

  useEffect(() => {
    if (status === "success" || status === "error") {
      setTimeout(() => toastOffOperation(), 2000);
    }
  }, [status]);

  const [messageInfo, setMessageInfo] = useState(undefined);

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <>
      <Snackbar
        open={status === "success"}
        autoHideDuration={4000}
        TransitionProps={{ onExited: handleExited }}
        TransitionComponent={Slide}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {toastSuccessMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={status === "error"}
        autoHideDuration={4000}
        TransitionProps={{ onExited: handleExited }}
        TransitionComponent={Slide}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {toastErrorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={status === "checking"}
        autoHideDuration={1000}
        TransitionProps={{ onExited: handleExited }}
        TransitionComponent={Slide}
      >
        <Alert severity="info">{toastCheckingMessage}</Alert>
      </Snackbar>
      <div className="app">
        <SidebarCustom selected={selected} setSelected={setSelected} />

        <main
          className="content"
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f8f7f3",
          }}
        >
          <Topbar selected={selected} />

          <Routes>
            {/* EMPADRONAMIENTO*/}
            <Route
              path="/empadronamiento/*"
              element={<EmpadronamientoRoutes />}
            ></Route>

            {/*JORNADA */}
            <Route path="/jornada/*" element={<JornadaRoutes />}></Route>

            {/* PREPARACION */}
            <Route
              path="/preparacion/*"
              element={<PreparacionRoutes />}
            ></Route>
            <Route path="/home" element={<InicioInfo />}></Route>
            {/* <Route path="/*" element={<Navigate to="/home" />} /> */}
            {/* CONFIGURACION */}
            {/* <Route path="/configuracion/*" element={< CONFIG />}></Route> */}

            {/* RUTA POR DEFAULT */}
            {/* <Route path="/" element={<Navigate to="/preparacion/"></Navigate>}></Route> */}
          </Routes>
        </main>
        {/* <div className="generalContainer">HOLA MUNDO</div> */}
      </div>
    </>
  );
};
