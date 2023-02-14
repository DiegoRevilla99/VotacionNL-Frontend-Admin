import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import es from "date-fns/locale/es";
import dayjs from "dayjs";
import React from "react";
dayjs.locale("es");

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  datePicker: {
    '& .MuiFormControl-root': {
      width: '100%',
      '& .MuiInputBase-input': {
        fontSize: '0.875rem', // ajuste el tamaño de fuente según sus necesidades
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'gray', // ajuste el color del borde según sus necesidades
      },
      '& .MuiInputBase-root': {
        '&::before': {
          borderBottom: 'none', // elimina la línea inferior
        },
        '&.Mui-focused::before': {
          borderBottom: 'none', // elimina la línea inferior en estado enfocado
        },
      },
    },
    '& .MuiPickersToolbar-toolbar': {
      backgroundColor: 'lightgray', // ajuste el color de fondo de la barra de herramientas según sus necesidades
    },
    '& .MuiPickersDay-daySelected': {
      backgroundColor: 'gray', // ajuste el color de fondo del día seleccionado según sus necesidades
    },
  },
  small: {
    width: '40%',
    '& .MuiInputBase-root': {
      fontSize: '1rem', // ajuste el tamaño de fuente según sus necesidades
      '&::before': {
        borderBottom: '10px solid #a0a0a0', // ajuste el grosor y el color de la línea inferior según sus necesidades
      },
    
    },
  },
}));

export const DateFieldFechaNacimiento = ({
  name = "",
  value = new Date(),
  onChange = () => {
    console.log("fechaaa..");
  },
  disabled = false,
}) => {
  const classes = useStyles(); // agregar la clase de estilo personalizada
  const handleChangeDate = (e) => {
    onChange({ target: { name: name, value: e } });
  };
  return (
    <>
      <LocalizationProvider adapterLocale={es} dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          disabled={disabled}
          name={name}
          label=""
          inputFormat="dd-MM-yyyy"
          value={value}
          onChange={handleChangeDate}
          renderInput={(params) => <TextField {...params} />}
          className={`${classes.datePicker} ${classes.small}`}
        />
      </LocalizationProvider>
    </>
  );
};

