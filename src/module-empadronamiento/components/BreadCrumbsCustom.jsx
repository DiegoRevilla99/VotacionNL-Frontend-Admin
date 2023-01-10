import { Box, Breadcrumbs, MenuItem, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
const useStyles = makeStyles({
  hr: {
    backgroundColor: "#F7F6F6",

    width: "50%",
  },
});

export const BreadCrumbsCustom = ({ routes = [], currentRoute = "" }) => {
  const classes = useStyles();
  const breadcrumbs = routes.map((route) => (
    <Link key={route.name} underline="hover" to={route.url}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {route.name === "INICIO" && <HomeIcon sx={{ mr: 0.5 }} />}
        {route.name}
      </Box>
    </Link>
  ));

  return (
    <Stack
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        mb: 2,
        mt: { xl: 2, md: 0, xs: 0 },
      }}
    >
      <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb">
        {breadcrumbs}
        <Typography
          sx={{
            fontWeight: "",
            color: "#511079",
            fontSize: { md: "20px", xs: "12px" },
            fontFamily: "'Kanit', sans-serif",
          }}
          key="3"
          color="text.primary"
        >
          {currentRoute}
        </Typography>
      </Breadcrumbs>
    </Stack>
  );
};
