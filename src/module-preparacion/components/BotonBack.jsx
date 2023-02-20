import { Button } from "@mui/material";
import React from "react";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  hr: {
    height: "3px",
    color: "rgb(210, 210, 210)",
    background: "rgb(210, 210, 210)",
    width: "100%",
    boxShadow: 3,
  },
  boton: {
    boxShadow: 1,
    color: "white",
    height: 42,
  },
});
const styleButton = {
  borderRadius: 50,
};

export const BotonBack = ({ url = "" }) => {
  const styles = useStyles();
  const navigate = useNavigate();

  const onClick = () => {
    navigate(url);
  };

  return (
    <Button
      type="submit"
      className={styles.boton}
      variant="contained"
      color="primary"
      style={styleButton}
      onClick={onClick}
      sx={{
        mt: 2,
        width: { sm: `150px`, xs: "150px" },
      }}
    >
      <ReplyAllIcon />
      Regresar
    </Button>
  );
};
