import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVotantesbyJornada } from "../../../store/module-empadronamiento/no-formales/thunksNoFormales";

import { BreadCrumbsCustom } from "../../components/BreadCrumbsCustom";
import { RegisterVoters } from "../../components/RegisterVoters";

export const EmpadronamientoNF = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { votantes, isLoadingVotantes } = useSelector(
    (state) => state.noFormalesSlice
  );

  useEffect(() => {
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
          currentRoute={"JORNADA ELECTORAL GOBERNADOR ORDINARIA 2022"}
        ></BreadCrumbsCustom>
        <Box sx={{ mt: 0, width: "100%", height: "100%" }}>
          <RegisterVoters
            isLoading={isLoadingVotantes}
            datos={votantes}
          ></RegisterVoters>
        </Box>
      </Box>
    </>
  );
};
