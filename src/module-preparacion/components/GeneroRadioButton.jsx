import {
    FormControl,
    FormControlLabel,
    Radio, RadioGroup
} from "@mui/material";
import React from "react";
export const GeneroRadioButton = React.memo(
	({
		valuesTipo,
		handleChange,
        errorsgeneroCandidato,
        // isOther,
	}) => {
		console.log("ME RENDERIZO TIPOS");
		return (
			<>
				<FormControl  error={Boolean(errorsgeneroCandidato)}>
					<RadioGroup
                    row
						name="generoCandidato"
						onChange={handleChange}
						value={valuesTipo}
						aria-labelledby="demo-radio-buttons-group-label"
					>
						<FormControlLabel
							// onClick={() => setIsOther(false)}
                            
							value="femenino"
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
							value="masculino"
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
							value="otro"
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