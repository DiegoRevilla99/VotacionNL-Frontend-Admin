import { Box, Button, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { Tabla } from "../../ui/components/table/Tabla";
import { PlantillaCRUD } from "../layout/PlantillaCRUD";
import CircularProgress from "@mui/material/CircularProgress";
import { columns, data } from "../helpers/DataBoletas";
import { useGetBoletasComite } from "../hooks/useGetBoletasComite";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUiStore } from "../../hooks/useUiStore";
import { saveComite } from "../../store/module-preparacion/comite/thunksComite";

export const CrudComite = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { boletas, isLoadingBoletas } = useGetBoletasComite();

  const guardar = () => {
    dispatch(
      saveComite({}, () => {
        navigate("/preparacion/registroComite");
      })
    );
  };

  const cancelar = () => {
    navigate("/preparacion/registroComite");
  };

  const onEliminar = (event, rowData) => {
    alert("Eliminando a " + rowData.candidato);
  };

  const onEditar = (event, rowData) => {
    navigate("/preparacion/comite/boleta/" + rowData.candidato);
  };

  const actions = [
    {
      icon: "edit",
      title: "Editar",
      sx: {},
      onClick: (event, rowData) => onEditar(event, rowData),
    },
    {
      icon: "delete",
      title: "Eliminar",
      sx: { ml: 1, mr: 1, backgroundColor: "error.main" },
      onClick: (event, rowData) => onEliminar(event, rowData),
    },
  ];

  return (
    <>
      <PlantillaCRUD
        go="/preparacion/comite/boleta"
        guardar={guardar}
        cancelar={cancelar}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              height: "100%",
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {isLoadingBoletas ? (
              // <CircularProgress color="primary" />
              <Stack
                justifyContent="center"
                sx={{ color: "grey.500" }}
                spacing={2}
                direction="row"
              >
                <CircularProgress color="primary" />
              </Stack>
            ) : (
              <Tabla
                titulo={"BOLETAS"}
                data={boletas}
                actions={actions}
                columns={columns}
              ></Tabla>
            )}
          </Box>
        </Box>
      </PlantillaCRUD>
    </>
  );
};
