import { CircularProgress, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getEleccionFormal,
  getVotantesbyJornada,
} from "../../../store/module-empadronamiento/no-formales/thunksNoFormales";

import { BreadCrumbsCustom } from "../../components/BreadCrumbsCustom";
import { RegisterVoters } from "../../components/RegisterVoters";

export const EmpadronamientoNF = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { votantes, isLoadingVotantes, eleccion, isLoadingEleccion } =
    useSelector((state) => state.noFormalesSlice);

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
          mt: 2,
        }}
      >
        <BreadCrumbsCustom
          routes={[
            {
              name: "INICIO",
              url: "/empadronamiento/",
            },
            {
              name: "JORANDAS NO FORMALES",
              url: "/empadronamiento/noformal",
            },
          ]}
          currentRoute={!isLoadingEleccion ? eleccion.nombreEleccion : "..."}
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
          <Box sx={{ pl: 2, pr: 2, mt: 0, width: "100%", height: "100%" }}>
            {votantes ? (
              <RegisterVoters
                status={eleccion.status}
                isLoading={isLoadingVotantes}
                datos={votantes}
              ></RegisterVoters>
            ) : (
              <Typography></Typography>
            )}
          </Box>
        )}
      </Box>
    </>
  );
};
