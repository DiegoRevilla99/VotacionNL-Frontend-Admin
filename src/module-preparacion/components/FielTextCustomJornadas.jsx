import { TextField } from "@mui/material";
import React from "react";

export const FielTextCustomJornadas = React.memo(
	({ name, label, value, handleChange, touched, error, type }) => {
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
				type={type}
				name={name}
				fullWidth
				size="small"
				id={name}
				label={label}
				variant="filled"
				onChange={handleInputChange}
				value={value}
				error={touched && Boolean(error)}
				helperText={touched && error}
			/>
		);
	}
);
