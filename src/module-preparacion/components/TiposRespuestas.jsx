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
				<FormControl error={Boolean(errorsTipo)} variant="standard">
					<FormLabel id="tipo">
						<Typography variant="h6" mt={"1rem"}>
							TIPO DE RESPUESTA <span style={{ color: "red" }}>*</span>
						</Typography>
					</FormLabel>
					<RadioGroup
						name="tipo"
						onChange={handleChange}
						value={valuesTipo}
						// error={touchedTipo && Boolean(errorsTipo)}
						aria-labelledby="demo-radio-buttons-group-label"
					>
						<FormControlLabel
							onClick={() => setIsCerrada(false)}
							value="abierta"
							control={
								<Radio
									sx={{
										"& .MuiSvgIcon-root": {
											fontSize: 38,
										},
									}}
								/>
							}
							label="ABIERTA"
						/>
						<FormControlLabel
							value="cerrada"
							onClick={() => setIsCerrada(true)}
							control={
								<Radio
									sx={{
										"& .MuiSvgIcon-root": {
											fontSize: 38,
										},
									}}
								/>
							}
							label="CERRADA"
						/>
					</RadioGroup>
				</FormControl>
				{isCerrada && (
					<Box mb={"2rem"} mt={"2rem"}>
						<FormControl error={Boolean(errorsTipoCerrada)} variant="standard">
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
									value="3respuestas"
									control={
										<Radio
											sx={{
												"& .MuiSvgIcon-root": {
													fontSize: 38,
												},
											}}
										/>
									}
									label="3 Respuestas:"
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
											value="Estoydeacuerdo"
											control={
												<Radio
													sx={{
														"& .MuiSvgIcon-root": {
															fontSize: 20,
														},
													}}
												/>
											}
											label="En desacuerdo"
										/>
										<FormControlLabel
											disabled
											value="neutral"
											control={
												<Radio
													sx={{
														"& .MuiSvgIcon-root": {
															fontSize: 20,
														},
													}}
												/>
											}
											label="Neutral"
										/>
										<FormControlLabel
											disabled
											value="estoydeacuerdo"
											control={
												<Radio
													sx={{
														"& .MuiSvgIcon-root": {
															fontSize: 20,
														},
													}}
												/>
											}
											label="De acuerdo"
										/>
									</RadioGroup>
								</Box>
								<FormControlLabel
									value="escaladelikert"
									control={
										<Radio
											sx={{
												"& .MuiSvgIcon-root": {
													fontSize: 38,
												},
											}}
										/>
									}
									label="Escala de Likert:"
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
											value="Totalmenteendesacuerdo"
											control={
												<Radio
													sx={{
														"& .MuiSvgIcon-root": {
															fontSize: 20,
														},
													}}
												/>
											}
											label="Totalmente en desacuerdo"
										/>
										<FormControlLabel
											disabled
											value="Endesacuerdo"
											control={
												<Radio
													sx={{
														"& .MuiSvgIcon-root": {
															fontSize: 20,
														},
													}}
												/>
											}
											label="En desacuerdo"
										/>
										<FormControlLabel
											disabled
											value="neutral"
											control={
												<Radio
													sx={{
														"& .MuiSvgIcon-root": {
															fontSize: 20,
														},
													}}
												/>
											}
											label="Neutral"
										/>
										<FormControlLabel
											disabled
											value="estoydeacuerdo"
											control={
												<Radio
													sx={{
														"& .MuiSvgIcon-root": {
															fontSize: 20,
														},
													}}
												/>
											}
											label="De acuerdo"
										/>
										<FormControlLabel
											disabled
											value="estoydeacuerdo"
											control={
												<Radio
													sx={{
														"& .MuiSvgIcon-root": {
															fontSize: 20,
														},
													}}
												/>
											}
											label="Totalmente de acuerdo"
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
									label="Personalizado 1:"
								/>
								<Box pl={"3rem"}>
									<Grid container spacing={1} columns={10}>
										<Grid item xs={5}>
											<TextField
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
										<Grid item xs={5}>
											<TextField
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
								<FormControlLabel
									value="personalizado2"
									control={
										<Radio
											sx={{
												"& .MuiSvgIcon-root": {
													fontSize: 38,
												},
											}}
										/>
									}
									label="Personalizado 2:"
								/>
								<Box pl={"3rem"}>
									<Grid container spacing={1}>
										<Grid item xs={4}>
											<TextField
												name={
													valuesTipoCerrada === "personalizado2"
														? "respuesta1"
														: "nulo"
												}
												value={
													valuesTipoCerrada === "personalizado2"
														? valuesRespuesta1
														: ""
												}
												onChange={handleChange}
												error={
													valuesTipoCerrada === "personalizado2" &&
													Boolean(errorsRespuesta1)
												}
												size="small"
												fullWidth
												id="outlined-basic"
												label="Opción 1"
												variant="outlined"
											/>
										</Grid>
										<Grid item xs={4}>
											<TextField
												name={
													valuesTipoCerrada === "personalizado2"
														? "respuesta2"
														: "nulo"
												}
												value={
													valuesTipoCerrada === "personalizado2"
														? valuesRespuesta2
														: ""
												}
												onChange={handleChange}
												error={
													valuesTipoCerrada === "personalizado2" &&
													Boolean(errorsRespuesta2)
												}
												size="small"
												fullWidth
												id="outlined-basic"
												label="Opción 2"
												variant="outlined"
											/>
										</Grid>
										<Grid item xs={4}>
											<TextField
												name={
													valuesTipoCerrada === "personalizado2"
														? "respuesta3"
														: "nulo"
												}
												value={
													valuesTipoCerrada === "personalizado2"
														? valuesRespuesta3
														: ""
												}
												onChange={handleChange}
												error={
													valuesTipoCerrada === "personalizado2" &&
													Boolean(errorsRespuesta3)
												}
												size="small"
												fullWidth
												id="outlined-basic"
												label="Opción 3"
												variant="outlined"
											/>
										</Grid>
									</Grid>
								</Box>
								<FormControlLabel
									value="personalizado3"
									control={
										<Radio
											sx={{
												"& .MuiSvgIcon-root": {
													fontSize: 38,
												},
											}}
										/>
									}
									label="Personalizado 3:"
								/>
								<Box pl={"3rem"}>
									<Grid container spacing={1} columns={10}>
										<Grid item xs={2}>
											<TextField
												name={
													valuesTipoCerrada === "personalizado3"
														? "respuesta1"
														: "nulo"
												}
												value={
													valuesTipoCerrada === "personalizado3"
														? valuesRespuesta1
														: ""
												}
												onChange={handleChange}
												error={
													valuesTipoCerrada === "personalizado3" &&
													Boolean(errorsRespuesta1)
												}
												size="small"
												fullWidth
												id="outlined-basic"
												label="Opción 1"
												variant="outlined"
											/>
										</Grid>
										<Grid item xs={2}>
											<TextField
												name={
													valuesTipoCerrada === "personalizado3"
														? "respuesta2"
														: "nulo"
												}
												value={
													valuesTipoCerrada === "personalizado3"
														? valuesRespuesta2
														: ""
												}
												onChange={handleChange}
												error={
													valuesTipoCerrada === "personalizado3" &&
													Boolean(errorsRespuesta2)
												}
												size="small"
												fullWidth
												id="outlined-basic"
												label="Opción 2"
												variant="outlined"
											/>
										</Grid>
										<Grid item xs={2}>
											<TextField
												name={
													valuesTipoCerrada === "personalizado3"
														? "respuesta3"
														: "nulo"
												}
												value={
													valuesTipoCerrada === "personalizado3"
														? valuesRespuesta3
														: ""
												}
												onChange={handleChange}
												error={
													valuesTipoCerrada === "personalizado3" &&
													Boolean(errorsRespuesta3)
												}
												size="small"
												fullWidth
												id="outlined-basic"
												label="Opción 3"
												variant="outlined"
											/>
										</Grid>
										<Grid item xs={2}>
											<TextField
												name={
													valuesTipoCerrada === "personalizado3"
														? "respuesta4"
														: "nulo"
												}
												value={
													valuesTipoCerrada === "personalizado3"
														? valuesRespuesta4
														: ""
												}
												onChange={handleChange}
												error={
													valuesTipoCerrada === "personalizado3" &&
													Boolean(errorsRespuesta4)
												}
												size="small"
												fullWidth
												id="outlined-basic"
												label="Opción 4"
												variant="outlined"
											/>
										</Grid>
										<Grid item xs={2}>
											<TextField
												name={
													valuesTipoCerrada === "personalizado3"
														? "respuesta5"
														: "nulo"
												}
												value={
													valuesTipoCerrada === "personalizado3"
														? valuesRespuesta5
														: ""
												}
												onChange={handleChange}
												error={
													valuesTipoCerrada === "personalizado3" &&
													Boolean(errorsRespuesta5)
												}
												size="small"
												fullWidth
												id="outlined-basic"
												label="Opción 5"
												variant="outlined"
											/>
										</Grid>
									</Grid>
								</Box>
							</RadioGroup>
						</FormControl>
					</Box>
				)}
			</>
		);
	}
);
