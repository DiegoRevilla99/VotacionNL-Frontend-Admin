import { CircularProgress, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEleccionFormal } from "../../../store/module-empadronamiento/no-formales/thunksNoFormales";
import { setType } from "../../../store/module-empadronamiento/votantes/empVotantesSlice";
import { getVotantesbyJornada } from "../../../store/module-empadronamiento/votantes/thunksVotantes";

import { BreadCrumbsCustom } from "../../components/BreadCrumbsCustom";
import { RegisterVoters } from "../../components/RegisterVoters";

export const EmpadronamientoNF = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { eleccion, isLoadingEleccion } = useSelector(
    (state) => state.noFormalesSlice
  );

  const { votantes, isLoadingVotantes } = useSelector(
    (state) => state.empVotantesSlice
  );

  useEffect(() => {
    dispatch(getEleccionFormal(id));
    dispatch(getVotantesbyJornada(id));
    dispatch(setType({ type: "noformales" }));
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
          overflowY: "scroll",
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
              name: "ELECCIONES POPULARES",
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
                tipo="noformales"
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
