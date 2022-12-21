import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

export const TimeFieldWithTitle = React.memo(
	({ label, name, value, handleChange, touched, error, setFieldValue }) => {
		return (
			<Box
				sx={{
					"& .MuiFormControl-root": {
						minWidth: "100%",
					},
				}}
			>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<TimePicker
						views={["minutes", "seconds"]}
						inputFormat="mm:ss"
						value={value}
						onChange={(value) => setFieldValue(name, value, true)}
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
					/>
				</LocalizationProvider>
			</Box>
		);
	}
);
