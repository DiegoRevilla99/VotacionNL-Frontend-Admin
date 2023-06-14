import { CircularProgress, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEleccionFormal } from "../../../store/module-empadronamiento/consultas/thunksConsultas";
import { setType } from "../../../store/module-empadronamiento/votantes/empVotantesSlice";
import { getVotantesbyJornada } from "../../../store/module-empadronamiento/votantes/thunksVotantes";

import { BreadCrumbsCustom } from "../../components/BreadCrumbsCustom";
import { RegisterVoters } from "../../components/RegisterVoters";

export const EmpadronamientoC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { votantes, isLoadingVotantes } = useSelector(
    (state) => state.empVotantesSlice
  );

  const { eleccion, isLoadingEleccion } = useSelector(
    (state) => state.consultasSlice
  );

  useEffect(() => {
    dispatch(getEleccionFormal(id));
    dispatch(getVotantesbyJornada(id));
    dispatch(setType({ type: "consultas" }));
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "99%",
          overflowY: "scroll",
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
              name: "CONSULTAS CIUDADANAS",
              url: "/empadronamiento/consultas",
            },
          ]}
          currentRoute={!isLoadingEleccion ? eleccion.nombreJornada : "..."}
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
            <RegisterVoters
              status={eleccion.status}
              isLoading={isLoadingVotantes}
              datos={votantes}
              tipo="consultas"
            ></RegisterVoters>
          </Box>
        )}
      </Box>
    </>
  );
};
