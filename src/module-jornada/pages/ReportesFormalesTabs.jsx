import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useJornadaStore } from "../../module-preparacion/hooks/useJornadaStore";
import { PrivateRoute } from "../../router/PrivateRoute";
import { onGetBoletas } from "../../store/module-preparacion/jornada/ThunksJornada";
import { ReporteFinalFormalHTML } from "../components/ReporteFinalFormalHTML";
import { ReporteInicialHTML } from "../components/ReporteInicialHTML";
import { ReporteFinal } from "./ReporteFinal";
import { ReporteInicial } from "./ReporteInicial";
import { VerSesiones } from "./VerSesiones";
import { BreadCrumbsCustom } from "../../module-empadronamiento/components/BreadCrumbsCustom";

function LinkTab(props) {
  const navigate = useNavigate();
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
        navigate(props.href);
      }}
      {...props}
    />
  );
}

export const ReportesFormalesTabs = () => {
  const [value, setValue] = React.useState(0);
  const { status, jornadaVotosData, jornadaSelected } = useJornadaStore();
  const params = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // navigate("/jornada/reportes/" + params.idJornada + "/reporteFinal/" + event.target.value);
  };

  // if (status === "checking")
  // 	return (
  // 		<Box sx={{ width: "100%" }}>
  // 			<LinearProgress />
  // 		</Box>
  // 	);
  // else
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          // mb: "2rem",
          // ml: "2rem",
          // mr: "2rem",
          // height: "100%",
          overflowY: "auto",
        }}
      >
        <BreadCrumbsCustom
          routes={[
            {
              name: "JORNADA",
              url: "/jornada/inicio",
            },
            {
              name: "REPORTES DE JORNADAS ELECTORALES",
              url: "/jornada/reportesJornadasFormales",
            },
          ]}
          currentRoute={jornadaSelected.title}
        ></BreadCrumbsCustom>
        <Tabs
          sx={{ mt: 1 }}
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
          textColor="primary"
          indicatorColor="primary"
          centered
        >
          <LinkTab
            sx={{ fontSize: "16px" }}
            label="Reporte inicial"
            href={`/jornada/reportes/${params.idJornada}/reporteInicio/`}
          />
          <LinkTab
            sx={{ fontSize: "16px" }}
            label="Reporte final"
            href={`/jornada/reportes/${params.idJornada}/reporteFinal/`}
          />
          <LinkTab
            sx={{ fontSize: "16px" }}
            label="Sesiones"
            href={`/jornada/reportes/${params.idJornada}/sesiones`}
          />
        </Tabs>

        <Box
        // ml={"2rem"}
        // mr={"2rem"}
        // mb={"2rem"}
        // sx={{
        // 	boxShadow: 1,
        // 	height: "auto",
        // 	display: "flex",
        // 	flexDirection: "column",
        // 	backgroundColor: "white",
        // 	borderRadius: "2rem",
        // 	p: "2rem",
        // }}
        >
          <PrivateRoute>
            <Routes>
              <Route path="reporteInicio/*" element={<ReporteInicial />} />
              <Route path="reporteFinal/*" element={<ReporteFinal />} />
              <Route path="sesiones/*" element={<VerSesiones />} />
              {/* <Route path="sesiones" element={<JornadasNoFormales />} /> */}
            </Routes>
          </PrivateRoute>
        </Box>
      </Box>
      <Box sx={{ overflowY: "hidden" }}>
        {/* <ReporteInicialHTML jornadaVotosData={jornadaVotosData} /> */}
        {jornadaVotosData.length !== 0 && status !== "checking" && (
          <>
            <ReporteFinalFormalHTML jornadaVotosData={jornadaVotosData} />
            <ReporteInicialHTML jornadaVotosData={jornadaVotosData} />
          </>
        )}
      </Box>
    </Box>
  );
};
