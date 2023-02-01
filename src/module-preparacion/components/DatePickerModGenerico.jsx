import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

export const DatePickerModGenerico = React.memo(
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
