import React from "react";
import {
	FormControl,
	FormControlLabel,
	Radio,
    FormLabel,
	RadioGroup,
    Typography,
} from "@mui/material";
export const RadioButtMod = React.memo(
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
                {/* {isOther && (
                    <FormControl variant="standard">
					<FormLabel id="generoOther">
						<Typography variant="h7" mt={"1rem"}>
							INGRESE EL GÉNERO <span style={{ color: "red" }}>*</span>
						</Typography>
					</FormLabel>
                        <TextField
                            name={name}
                            fullWidth
                            size="small"
                            id={name}
                            label={label}
                            variant="filled"
                            onChange={handleChange}
                            value={value}
                            error={touched && Boolean(error)}
                            helperText={touched && error}
                        />
                    </FormControl>
                )} */}
			</>
		);
	}
);
