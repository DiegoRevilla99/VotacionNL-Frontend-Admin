import { Box } from "@mui/system";
import React from "react";

import { useParams } from "react-router-dom";
import { BreadCrumbsCustom } from "../../components/BreadCrumbsCustom";
import { RegisterVoters } from "../../components/RegisterVoters";

export const Empadronamiento = () => {
  const { id } = useParams();
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

        <Box
          sx={{
            pl: 2,
            pr: 2,
            mt: { lg: 0, md: 0, xs: 0 },
            width: "100%",
            height: "100%",
          }}
        >
          <RegisterVoters></RegisterVoters>
        </Box>
      </Box>
    </>
  );
};
