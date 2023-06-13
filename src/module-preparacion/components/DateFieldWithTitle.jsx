import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  disabledInput: {
    "& .MuiInputBase-root": {
      color: "inherit", // Conserva el color de texto heredado
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none", // Elimina la línea de debajo del TextField
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none", // Elimina la línea de debajo del TextField al enfocarlo
    },
    "& .MuiInput-underline:hover:before": {
      borderBottom: "none", // Elimina la línea de debajo del TextField al pasar el cursor sobre él
    },
  },
});

export const DateFieldWithTitle = React.memo(
  ({
    label,
    name,
    value,
    handleChange,
    touched,
    error,
    setFieldValue,
    minDate,
    isDisabled,
    maxDate,
  }) => {
    const onKeyDown = (e) => {
      e.preventDefault();
    };
    if (minDate === undefined) {
      return (
        <Box
          sx={{
            "& .MuiFormControl-root": {
              minWidth: "100%",
            },
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              disabled={isDisabled}
              value={value}
              onChange={(valueNew) => setFieldValue(name, valueNew, true)}
              label={label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name={name}
                  // onKeyDown={onKeyDown}
                  helperText={touched && error}
                  error={Boolean(touched && error)}
                  variant="standard"
                  fullWidth
                />
              )}
            />
          </LocalizationProvider>
        </Box>
      );
    } else
      return (
        <Box
          sx={{
            "& .MuiFormControl-root": {
              minWidth: "100%",
            },
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              disabled={isDisabled}
              value={value}
              onChange={(valueNew) => setFieldValue(name, valueNew, true)}
              label={label}
              minDateTime={minDate}
              maxDateTime={maxDate}
              renderInput={(params) => (
                <TextField
                  {...params}
                  // onKeyDown={onKeyDown}
                  name={name}
                  helperText={touched && error}
                  error={Boolean(touched && error)}
                  variant="standard"
                  fullWidth
                />
              )}
            />
          </LocalizationProvider>
        </Box>
      );
  }
);
