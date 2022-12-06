import {
	Box,
	Button,
	FormControlLabel,
	Grid,
	Modal,
	Radio,
	RadioGroup,
	TextareaAutosize,
	Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useUiStore } from "../../hooks/useUiStore";

import { useConsultaCiudadanaStore } from "../hooks/useConsultaCiudadanaStore";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "50rem",
	bgcolor: "background.paper",
	// border: "2px solid #000",
	borderRadius: "2rem",
	boxShadow: 3,
	p: 4,
};

export const ModalPapeleta = ({ statusModal, handleToggleModal }) => {
	const { addQuestion } = useConsultaCiudadanaStore();

	const { toastSuccesOperation } = useUiStore();

	const onSave = () => {
		addQuestion("¿Pregunta 1?", ["Respuesta 1", "Respuesta 2"]);
		toastSuccesOperation("Pregunta registrada con éxito");
		handleToggleModal();
	};

	const onCancel = () => {
		handleToggleModal();
	};

	return (
		<Modal
			open={statusModal}
			onClose={handleToggleModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h5" color="initial" align="center">
					REGISTRO DE PREGUNTA DE PAPELETA
				</Typography>
				<Box m={"2rem"}>
					<Typography variant="h6">
						INGRESE LA PREGUNTA <span style={{ color: "red" }}>*</span>
					</Typography>
					<TextareaAutosize
						aria-label="minimum height"
						minRows={6}
						// placeholder="Minimum 3 rows"
						style={{
							width: "100%",
							marginTop: "0.5rem",
							backgroundColor: "#f0f0f0",
							fontSize: "1.5rem",
							padding: "0.7rem",
						}}
					/>
					<Typography variant="h6" mt={"1rem"}>
						TIPO DE RESPUESTA <span style={{ color: "red" }}>*</span>
					</Typography>
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label"
						defaultValue="ABIERTA"
						name="radio-buttons-group"
					>
						<FormControlLabel
							value="ABIERTA"
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
							value="CERRADA"
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
					<Grid
						container
						direction="row"
						justifyContent="flex-end"
						alignItems="center"
						spacing={2}
					>
						<Grid item xs={12} md={6} lg={3}>
							<Button
								onClick={onSave}
								variant="contained"
								size="large"
								sx={{
									// marginLeft: "5rem",
									// marginRight: "5rem",
									boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
									transition: "all 0.5s ease",
									backgroundColor: "#511079",
									width: "100%",
									borderTopLeftRadius: "0",
									borderTopRightRadius: "1.6rem",
									borderBottomLeftRadius: "1.6rem",
									borderBottomRightRadius: "1.6rem",
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
									borderTopLeftRadius: "0",

									borderTopRightRadius: "1.6rem",
									borderBottomLeftRadius: "1.6rem",
									borderBottomRightRadius: "1.6rem",
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
				</Box>
			</Box>
		</Modal>
	);
};
