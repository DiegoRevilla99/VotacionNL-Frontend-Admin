import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
    // console.log("MIN DATE: ", minDate);

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
                  helperText={touched && error}
                  error={Boolean(touched && error)}
                  variant="standard"
                  fullWidth
                />
              )}

              // value={values}
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
                  name={name}
                  helperText={touched && error}
                  error={Boolean(touched && error)}
                  variant="standard"
                  fullWidth
                />
              )}

              // value={values}
            />
          </LocalizationProvider>
        </Box>
      );
  }
);
