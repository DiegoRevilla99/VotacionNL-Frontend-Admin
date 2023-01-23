import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVotantesbyJornada } from "../../../store/module-empadronamiento/formales/thunksFormales";
import { BreadCrumbsCustom } from "../../components/BreadCrumbsCustom";
import { RegisterVoters } from "../../components/RegisterVoters";

export const EmpadronamientoC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { votantes, isLoadingVotantes } = useSelector(
    (state) => state.empFormales
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
              name: "CONSULTAS CIUDADANAS",
              url: "/empadronamiento/consultas",
            },
          ]}
          currentRoute={"CONSULTA-OAX-2025"}
        ></BreadCrumbsCustom>
        <Box sx={{ pl: 2, pr: 2, mt: 0, width: "100%", height: "100%" }}>
          <RegisterVoters
            isLoading={isLoadingVotantes}
            datos={votantes}
          ></RegisterVoters>
        </Box>
      </Box>
    </>
  );
};
