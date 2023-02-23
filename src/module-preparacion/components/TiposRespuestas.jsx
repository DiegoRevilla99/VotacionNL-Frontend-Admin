import React from "react";
import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Modal,
	Radio,
	RadioGroup,
	TextareaAutosize,
	TextField,
	Typography,
} from "@mui/material";
export const TiposRespuestas = React.memo(
	({
		valuesTipo,
		valuesTipoCerrada,
		handleChange,
		isCerrada,
		setIsCerrada,
		errorsTipo,
		errorsTipoCerrada,
		valuesRespuesta1,
		valuesRespuesta2,
		valuesRespuesta3,
		valuesRespuesta4,
		valuesRespuesta5,
		errorsRespuesta1,
		errorsRespuesta2,
		errorsRespuesta3,
		errorsRespuesta4,
		errorsRespuesta5,
	}) => {
		console.log("ME RENDERIZO TIPOS");
		return (
			<>
				{/* <FormControl error={Boolean(errorsTipo)} variant="standard"></FormControl> */}

				<Box mb={"2rem"} mt={"2rem"} width="100%">
					<FormControl
						error={Boolean(errorsTipoCerrada)}
						variant="standard"
						sx={{ width: "100%" }}
					>
						<FormLabel id="tipoCerrada">
							<Typography variant="h6" textAlign={"left"}>
								SELECCIONE EL TIPO DE RESPUESTA CERRADA
								<span style={{ color: "red" }}>*</span>
							</Typography>
						</FormLabel>
						<RadioGroup
							name="tipoCerrada"
							onChange={handleChange}
							value={valuesTipoCerrada}
							aria-labelledby="demo-radio-buttons-group-label"
							sx={{ width: "100%" }}
						>
							<FormControlLabel
								value="2respuestas"
								control={
									<Radio
										sx={{
											"& .MuiSvgIcon-root": {
												fontSize: 38,
											},
										}}
									/>
								}
								label="2 Respuestas:"
							/>
							<Box pl={"3rem"}>
								<RadioGroup
									row
									aria-labelledby="demo-radio-buttons-group-label"
									defaultValue="ABIERTA"
									name="radio-buttons-group"
								>
									<FormControlLabel
										disabled
										value="si"
										control={
											<Radio
												sx={{
													"& .MuiSvgIcon-root": {
														fontSize: 20,
													},
												}}
											/>
										}
										label="Si"
									/>
									<FormControlLabel
										disabled
										value="no"
										control={
											<Radio
												sx={{
													"& .MuiSvgIcon-root": {
														fontSize: 20,
													},
												}}
											/>
										}
										label="No"
									/>
								</RadioGroup>
							</Box>

							<FormControlLabel
								value="personalizado1"
								control={
									<Radio
										sx={{
											"& .MuiSvgIcon-root": {
												fontSize: 38,
											},
										}}
									/>
								}
								label="Personalizado:"
							/>
							<Box pl={"3rem"} width="100%">
								<Grid container spacing={1} width="100%">
									<Grid item xs={6}>
										<TextField
											multiline
											name={
												valuesTipoCerrada === "personalizado1"
													? "respuesta1"
													: "nulo"
											}
											value={
												valuesTipoCerrada === "personalizado1"
													? valuesRespuesta1
													: ""
											}
											onChange={handleChange}
											error={
												valuesTipoCerrada === "personalizado1" &&
												Boolean(errorsRespuesta1)
											}
											size="small"
											fullWidth
											id="outlined-basic"
											label="Opción 1"
											variant="outlined"
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											multiline
											name={
												valuesTipoCerrada === "personalizado1"
													? "respuesta2"
													: "nulo"
											}
											value={
												valuesTipoCerrada === "personalizado1"
													? valuesRespuesta2
													: ""
											}
											onChange={handleChange}
											error={
												valuesTipoCerrada === "personalizado1" &&
												Boolean(errorsRespuesta2)
											}
											size="small"
											fullWidth
											id="outlined-basic"
											label="Opción 2"
											variant="outlined"
										/>
									</Grid>
								</Grid>
							</Box>
						</RadioGroup>
					</FormControl>
				</Box>
			</>
		);
	}
);
