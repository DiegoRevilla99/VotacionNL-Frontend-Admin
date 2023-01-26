import { TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import es from "date-fns/locale/es";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useState } from "react";
dayjs.locale("es");

export const DateField = ({
  name = "",
  value = new Date(),
  onChange = () => {
    console.log("fechaaa..");
  },
  disabled = false,
}) => {
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
        />
      </LocalizationProvider>
    </>
  );
};
