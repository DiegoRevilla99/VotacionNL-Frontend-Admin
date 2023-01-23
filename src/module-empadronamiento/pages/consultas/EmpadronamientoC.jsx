import { CircularProgress, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getEleccionFormal } from "../../../store/module-empadronamiento/consultas/thunksConsultas";
import { getVotantesbyJornada } from "../../../store/module-empadronamiento/formales/thunksFormales";
import { BreadCrumbsCustom } from "../../components/BreadCrumbsCustom";
import { RegisterVoters } from "../../components/RegisterVoters";

export const EmpadronamientoC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { votantes, isLoadingVotantes } = useSelector(
    (state) => state.empFormales
  );
  const { eleccion, isLoadingEleccion } = useSelector(
    (state) => state.consultasSlice
  );

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
              name: "CONSULTAS CIUDADANAS",
              url: "/empadronamiento/consultas",
            },
          ]}
          currentRoute={"CONSULTA-OAX-2025"}
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
            ></RegisterVoters>
          </Box>
        )}
      </Box>
    </>
  );
};
