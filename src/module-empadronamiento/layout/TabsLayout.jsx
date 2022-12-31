import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { PrivateRoute } from "../../router/PrivateRoute";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { JornadasFormales } from "../pages/JornadasFormales";
import { MenuRoutes } from "../routes/MenuRoutes";

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
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        <LinkTab label="Formales" href="/empadronamiento/inicio/formal" />
        <LinkTab label="No formales" href="/trash" />
        <LinkTab label="Consultas" href="/spam" />
      </Tabs>
      <PrivateRoute>
        <Routes>
          <Route
            path="/empadronamiento/inicio/*"
            element={<MenuRoutes />}
          ></Route>
        </Routes>
      </PrivateRoute>
    </Box>
  );
};
