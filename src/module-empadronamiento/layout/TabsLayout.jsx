import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { PrivateRoute } from "../../router/PrivateRoute";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { JornadasFormales } from "../pages/JornadasFormales";
import { JornadasNoFormales } from "../pages/JornadasNoFormales";
import { Consultas } from "../pages/Consultas";
import { Empadronamiento } from "../pages/Empadronamiento";
import { Paper } from "@mui/material";
import { EmpadronamientoNF } from "../pages/EmpadronamientoNF";
import { EmpadronamientoC } from "../pages/EmpadronamientoC";

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

export const TabsLayout = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        alignItems: "center",
        mt: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <Tabs
        sx={{}}
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        textColor="primary"
        indicatorColor="primary"
        centered
      >
        <LinkTab label="Formales" href="/empadronamiento/inicio/formal" />
        <LinkTab label="No formales" href="/empadronamiento/inicio/noformal" />
        <LinkTab label="Consultas" href="/empadronamiento/inicio/consultas" />
      </Tabs>

      <Paper
        elevation={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "95%",
          height: "calc(100% - 80px)",

          // boxShadow: 1,
          borderRadius: "20px",
          mt: 0,
          p: 2,
        }}
      >
        <PrivateRoute>
          <Routes>
            <Route path="formal" element={<JornadasFormales />} />
            <Route path="formal/:id" element={<Empadronamiento />} />
            <Route path="noformal" element={<JornadasNoFormales />} />
            <Route path="noformal/:id" element={<EmpadronamientoNF />} />
            <Route path="consultas" element={<Consultas />} />
            <Route path="consultas/:id" element={<EmpadronamientoC />} />

            {/* <Route path="/*" element={<Navigate to="/empadronamiento/inicio" />} /> */}
          </Routes>
        </PrivateRoute>
      </Paper>
    </Box>
  );
};
