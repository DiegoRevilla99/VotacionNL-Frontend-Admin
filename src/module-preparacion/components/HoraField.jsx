import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export const HoraField = ({
  titulo = "Titulo",
  handleChange = () => {},
  tiempo = "00:15:20",
  name = "",
}) => {
  const horaI = tiempo.split(":")[0];
  const minI = tiempo.split(":")[1];
  const seg = "00";

  const [hora, setHora] = React.useState(parseInt(horaI, 10));
  const [min, setMin] = React.useState(parseInt(minI, 10));

  const handleChangeHora = (event) => {
    setHora(event.target.value);
    let minn = min > 9 ? min : "0" + min;
    let horan =
      event.target.value > 9 ? event.target.value : "0" + event.target.value;
    const nh = horan + ":" + minn + ":00";

    let nevent = { target: { name: name, value: nh } };
    handleChange(nevent);
  };

  const handleChangeMin = (event) => {
    setMin(event.target.value);
    let horan = hora > 9 ? hora : "0" + hora;
    let minn =
      event.target.value > 9 ? event.target.value : "0" + event.target.value;
    const nm = horan + ":" + minn + ":00";
    let nevent = { target: { name: name, value: nm } };
    handleChange(nevent);
  };

  return (
    <>
      <fieldset
        style={{
          display: "flex",
          maxWidth: "250px",
          borderRadius: 5,
          borderWidth: "1px",
          borderColor: "#D7D6D6",
          mr: 2,
        }}
      >
        <legend>{titulo}</legend>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: { sm: "250px", xs: "210px" },
            flexDirection: "column",
            p: 1,
          }}
        >
          <Box sx={{ width: "100%", display: "flex" }}>
            <TextField
              id="outlined-number"
              name="tiempoDuracionVoto"
              label="Horas"
              value={hora}
              onChange={handleChangeHora}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Typography sx={{ m: 1 }}>:</Typography>
            <TextField
              id="outlined-number"
              label="Minutos"
              name="tiempoDuracionVoto"
              value={min}
              onChange={handleChangeMin}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </Box>
      </fieldset>
    </>
  );
};
