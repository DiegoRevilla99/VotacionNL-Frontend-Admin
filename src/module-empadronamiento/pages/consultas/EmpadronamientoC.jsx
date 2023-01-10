import { Box } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";
import { BreadCrumbsCustom } from "../../components/BreadCrumbsCustom";
import { RegisterVoters } from "../../components/RegisterVoters";

export const EmpadronamientoC = () => {
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
          mt: 2,
        }}
      >
        <BreadCrumbsCustom
          routes={[
            {
              name: "CONSULTAS",
              url: "/empadronamiento/consultas",
            },
          ]}
          currentRoute={id}
        ></BreadCrumbsCustom>
        <Box sx={{ pl: 2, pr: 2, mt: 0, width: "100%", height: "100%" }}>
          <RegisterVoters></RegisterVoters>
        </Box>
      </Box>
    </>
  );
};
