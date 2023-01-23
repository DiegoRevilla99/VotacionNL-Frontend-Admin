import { CircularProgress, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import {
  getEleccionFormal,
  getVotantesbyJornada,
} from "../../../store/module-empadronamiento/formales/thunksFormales";
import { BreadCrumbsCustom } from "../../components/BreadCrumbsCustom";
import { RegisterVoters } from "../../components/RegisterVoters";

export const Empadronamiento = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { votantes, isLoadingVotantes, eleccion, isLoadingEleccion } =
    useSelector((state) => state.empFormales);

  useEffect(() => {
    dispatch(getEleccionFormal(id));
    dispatch(getVotantesbyJornada(id));
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          pt: 2,
        }}
      >
        <BreadCrumbsCustom
          routes={[
            {
              name: "INICIO",
              url: "/empadronamiento/",
            },
            {
              name: "JORANDAS FORMALES",
              url: "/empadronamiento/formal",
            },
          ]}
          currentRoute={"JORNADA ELECTORAL GOBERNADOR ORDINARIA 2022"}
        ></BreadCrumbsCustom>
        {isLoadingEleccion ? (
          <Stack
            justifyContent="center"
            sx={{ color: "grey.500" }}
            spacing={2}
            direction="row"
          >
            <CircularProgress color="primary" />
          </Stack>
        ) : (
          <Box
            sx={{
              pl: 2,
              pr: 2,
              mt: { lg: 0, md: 0, xs: 0 },
              width: "100%",
              height: "100%",
            }}
          >
            <RegisterVoters
              status={eleccion.status}
              isLoading={isLoadingVotantes}
              datos={votantes}
            ></RegisterVoters>
          </Box>
        )}
      </Box>
    </>
  );
};
