import { Button, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { object, string } from "yup";

const validationSchema = object({
	correo: string("").email().required("Este campo es requerido"),
});

export const Recuperacion = () => {
	return (
		<Box
			sx={{
				backgroundColor: "#f8f7f3",
				display: "flex !important",
				height: "100% !important",
				flexDirection: "column !important",
				justifyContent: "center !important",
			}}
		>
			<Box
				sx={{
					display: "flex !important",
					backgroundColor: "#f8f7f3",
					flexDirection: "row !important",
					justifyContent: "center !important",
				}}
			>
				<Box
					sx={{
						backgroundColor: "#f8f7f3",
						overflow: "auto",
						display: "flex !important",
						flexDirection: "row !important",
						justifyContent: "center !important",
						paddingTop: "8rem",
						paddingBottom: "8rem",
					}}
				>
					<Grid
						container
						sx={{
							height: "30rem",
							width: "60rem",
							bgcolor: "background.paper",
							borderRadius: "1rem",
							boxShadow: 1,
						}}
						justifyContent="center !important"
					>
						<Grid
							item
							sm={12}
							display="flex"
							flexDirection="column"
							justifyContent="center"
							alignItems={"stretch"}
							sx={{ padding: "2rem", width: "100%" }}
						>
							<Box display={"flex"} flexDirection="column" px={"2rem"}>
								<Typography
									variant="h5"
									color="initial"
									textAlign={"center"}
									mb={"2rem"}
								>
									¿OLVIDASTE TU CONTRASEÑA?
								</Typography>

								<Typography
									variant="h6"
									color="initial"
									textAlign={"center"}
									mb={"2rem"}
								>
									En el siguiente recuadro ingresa tu correo electrónico para
									enviarte información respecto al reestablecimiento de tu
									contraseña
								</Typography>

								<Formik
									initialValues={{ correo: "" }}
									validationSchema={validationSchema}
									onSubmit={(values) => {
										console.log("FORMULARIO ENVIADO", values);
										// onSubmit(values);
									}}
								>
									{({ handleChange, values, errors, touched, handleSubmit }) => (
										<form onSubmit={handleSubmit}>
											<TextField
												name="correo"
												fullWidth
												size="small"
												id="correo"
												label="Correo electrónico"
												variant="filled"
												onChange={handleChange}
												value={values.correo}
												error={touched.correo && Boolean(errors.correo)}
												helperText={touched.correo && errors.correo}
												sx={{ marginBottom: "2rem" }}
											/>

											<Button
												type="submit"
												variant="contained"
												size="large"
												// disabled={status === "checking"}
												sx={{
													boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
													transition: "all 0.5s ease",
													backgroundColor: "#511079",
													width: "100%",
													borderRadius: "2rem 2rem 2rem 2rem",
													"&:hover": {
														backgroundColor: "#7E328B !important",
														transform: "translate(-5px, -5px)",
														boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
													},
												}}
											>
												Enviar
											</Button>
										</form>
									)}
								</Formik>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Box>
	);
};
