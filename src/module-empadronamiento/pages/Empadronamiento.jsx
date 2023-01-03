import { Box } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";
import { BreadCrumbsCustom } from "../components/BreadCrumbsCustom";
import { RegisterVoters } from "../components/RegisterVoters";

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
        }}
      >
        <BreadCrumbsCustom
          routes={[
            {
              name: "JORANDAS ELECTORALES",
              url: "/empadronamiento/inicio/formal",
            },
          ]}
          currentRoute={id}
        ></BreadCrumbsCustom>
        <Box sx={{ mt: 2, width: "100%", height: "100%" }}>
          <RegisterVoters></RegisterVoters>
        </Box>
      </Box>
    </>
  );
};
