import { Breadcrumbs, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export const BreadCrumbsCustom = ({ routes = [], currentRoute = "" }) => {
  const breadcrumbs = routes.map((route) => (
    <Link underline="hover" key="1" color="inherit" to={route.url}>
      {route.name}
    </Link>
  ));

  return (
    <Stack
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        ml: 4,
        mt: 2,
      }}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
        <Typography
          sx={{ fontFamily: "Segoe UI Emoji" }}
          key="3"
          color="text.primary"
        >
          {currentRoute}
        </Typography>
      </Breadcrumbs>
      {/* <hr /> */}
    </Stack>
  );
};
