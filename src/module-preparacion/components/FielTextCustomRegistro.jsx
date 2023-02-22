import { TextField } from "@mui/material";
import React from "react";

export const FielTextCustomRegistro = React.memo(
	({ name, label, value, handleChange, touched, error, type, placeholder }) => {
		// console.log("ME RENDERIZO HIJO");
		
		const handleInputChange = (event) => {
			const newValue = event.target.value.toUpperCase();
			handleChange({
				target: {
					name,
					value: newValue,
				},
			});
		};

		return (
			<TextField
				fullWidth
				size="small"
				id={name}
				variant="outlined"
				label={label}
				name={name}
				placeholder={placeholder}
				type={type}
				value={value}
				onChange={handleInputChange}
				error={touched && Boolean(error)}
				helperText={touched && error}
			/>
		);
	}
);
