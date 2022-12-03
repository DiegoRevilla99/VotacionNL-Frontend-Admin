import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Typography } from "@mui/material";

export const Action = ({
  title = "boton",
  info = "info dentro de action",
  sx = {},
  icon,
  click = () => {},
}) => {
  const iconoIs = () => {
    if (icon === "edit") return <EditIcon></EditIcon>;
    if (icon === "delete") return <DeleteIcon></DeleteIcon>;
    if (icon === "add") return <AddCircleOutlineIcon></AddCircleOutlineIcon>;
  };

  const icono = iconoIs();
  const informacion = info;

  const handleClick = (event) => {
    click(event, info);
  };

  return (
    <>
      <Button
        style={{ borderRadius: 15 }}
        variant="contained"
        sx={sx}
        startIcon={icono}
        onClick={handleClick}
      >
        <Typography sx={{ fontSize: { sm: "15px", xs: "0px" } }}>
          {title}
        </Typography>
      </Button>
    </>
  );
};
