import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup
} from "@mui/material";
import React from "react";
export const RadioButtModSuplente = React.memo(
	({
		valuesTipo,
		handleChange,
        errorsgeneroSuplente,
        // isOther,
	}) => {
		console.log("ME RENDERIZO TIPOS", valuesTipo);
		return (
			<>
				<FormControl  error={Boolean(errorsgeneroSuplente)}>
					<RadioGroup
                    row
						name="generoSuplente"
						onChange={handleChange}
						value={valuesTipo}
						aria-labelledby="demo-radio-buttons-group-label"
					>
						<FormControlLabel
							// onClick={() => setIsOther(false)}
                            
							value="FEMENINO"
							control={
								<Radio
									sx={{
										"& .MuiSvgIcon-root": {
											fontSize: 25,
										},
									}}
								/>
							}
							label="FEMENINO"
						/>
						<FormControlLabel
							value="MASCULINO"
							// onClick={() => setIsOther(false)}
							control={
								<Radio
									sx={{
										"& .MuiSvgIcon-root": {
											fontSize: 25,
										},
									}}
								/>
							}
							label="MASCULINO"
						/>
                    <FormControlLabel
							value="OTRO"
							// onClick={() => setIsOther(true)}
							control={
								<Radio
									sx={{
										"& .MuiSvgIcon-root": {
											fontSize: 25,
										},
									}}
								/>
							}
							label="OTRO"
						/>
					</RadioGroup>
				</FormControl>
			</>
		);
	}
);
