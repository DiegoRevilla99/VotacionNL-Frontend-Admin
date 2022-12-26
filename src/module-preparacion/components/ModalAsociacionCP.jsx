import {
	Box,
	Button,
	Grid,
	Modal,
	TextField,
	Typography,
	Stack,
	MenuItem, 
} from "@mui/material";
import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Formik, Form } from 'formik';
import { ErrorField } from "../components/ErrorField";
import { object, string } from "yup";
import BookOnlineRoundedIcon from '@mui/icons-material/BookOnlineRounded';
import { useDispatch } from "react-redux";
import { savePartido } from "../../store/module-preparacion/jornada/jornadaThunks";
import { useAddBoletasJornada } from "../hooks/useAddBoletasJornada";
import CircularProgress from "@mui/material/CircularProgress";
import { editBoleta, saveBoleta } from "../../store/module-preparacion/jornada/jornadaThunks";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "50rem",
	bgcolor: "background.paper",
	borderRadius: "2rem",
	boxShadow: 3,
	p: 4,
	height: "90%",
};
const validationSchema = object({
	candidato: string("").required(
		"Por favor, selecciona un candidato"
		),
	partido: string("").required(
		"Por favor, selecciona un partido"
		),
	suplente: string("").required(
		"Por favor, selecciona un suplente"
		),
});
export const ModalAsociacionCP = ({ statusAsociacionModal, handleToggleModal }) => {

	const onSave = (values) => {
		handleToggleModal();
	};

	const onCancel = () => {
		handleToggleModal();
	};

	return (
		<Modal
			open={statusAsociacionModal}
			onClose={onCancel}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Box sx={{ overflowY: "auto", height: "100%" }}>
					<Typography id="modal-modal-title" variant="h5" color="initial" align="center">
						ASOCIACIÓN DE PARTICIPANTES A PARTIDO
					</Typography>
					<Box m={"2rem"}>

						<Formik
							initialValues={
                                        {
											candidato: "",
											partido: "",
											suplente: "",
									  }
							}
							validationSchema={validationSchema}
							onSubmit={(values) => {
								onSave(values);
							}}
						>
							{({values, errors, touched, handleSubmit, handleChange, handleBlur}) => (
								<Form  onSubmit={handleSubmit} >

							<Box
							 sx={{
								width: { xl: "100%", lg: "100%", sm: "100%", xs: "100%" },
							 }}
							>
								<Typography variant= {{ xl: "2rem", lg: "1.5rem", sm: "1rem", xs: "0.8rem" }}>
									Selecciona un candidato <span style={{ color: "red" }}>*</span>
								</Typography>
								<TextField
									select
									size="small"
									value={values.candidato}
									onChange={handleChange}
									fullWidth
									// variant="filled"
								>
									<MenuItem 
									// onClick={}
									value = "Candidado I">
										Candidado I
									</MenuItem>
									<MenuItem 
									// onClick={}
									value = "Candidado II">
										Candidado II
									</MenuItem>
								</TextField>
							</Box>
							<Box
							 sx={{
								width: { xl: "100%", lg: "100%", sm: "100%", xs: "100%" },
							 }}
							>
									<Typography variant= "1rem">
										Selecciona un partido <span style={{ color: "red" }}>*</span>
									</Typography>
										<TextField
										select
										size="small"
										value="partido"
										fullWidth
										// variant="filled"
											sx={{

											}}
										/>
							</Box>

									


















                                    
									<Grid
										container
										direction="row"
										justifyContent="flex-end"
										alignItems="center"
										spacing={2}
									>
										<Grid item xs={12} md={6} lg={3}>
											<Button
												type="sumbit"
												variant="contained"
												size="large"
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
												Guardar
											</Button>
										</Grid>
										<Grid item xs={12} md={6} lg={3}>
											<Button
												onClick={onCancel}
												variant="contained"
												size="large"
												sx={{
													boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
													transition: "all 0.5s ease",
													backgroundColor: "#791010",
													width: "100%",
													borderRadius: "2rem 2rem 2rem 2rem",
													"&:hover": {
														backgroundColor: "#8B3232 !important",
														transform: "translate(-5px, -5px)",
														boxShadow: "5px 5px 1px rgba(0, 0, 0, 0.3)",
													},
												}}
											>
												Cancelar
											</Button>
										</Grid>
									</Grid>
								</Form>
							)}
						</Formik>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
};
