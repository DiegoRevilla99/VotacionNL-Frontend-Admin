import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const DatePickerModSuplente = React.memo(
	({ label, name, value, handleChange, touched, error, setFieldValue, minDate, isDisabled }) => {
			return (

				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						// disabled={isDisabled}
						value={value}
						onChange={(valueNew) => setFieldValue(name, valueNew, true)}
						label={label}
						maxDate={new Date()}
						renderInput={(params) => (
							<TextField
								{...params}
								name={name}
								helperText={touched && error}
								error={Boolean(touched && error)}
								variant="outlined"
								size="small"
								// fullWidth
							/>
						)}
					/>
				</LocalizationProvider>
		);
	}
);
