import {
	Box,
	Button,
	FormControlLabel,
	Grid,
	Modal,
	TextField,
	RadioGroup,
	TextareaAutosize,
	Typography,
	Stack,
} from "@mui/material";

import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

// import { useDispatch } from "react-redux";
// import { useUiStore } from "../../hooks/useUiStore";

// import { useConsultaCiudadanaStore } from "../hooks/useConsultaCiudadanaStore";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	// width: "50rem",
	width: { xl: "50rem", lg: "50rem", sm: "40rem", xs: "30rem" },
	height: "42.5rem",
	bgcolor: "background.paper",
	border: '2px solid #fff',
	// border: "2px solid #000",
	borderRadius: "2rem",
	boxShadow: 3,
	p: 4,
};

export const ModalBoletaPartido = ({ statusMatchModal, handleToggleModal }) => {
		// const [file, setFile] = useState("");
	// const { addQuestion } = useConsultaCiudadanaStore();

	// const { toastSuccesOperation } = useUiStore();

	// const onSave = () => {
	// 	addQuestion("¿Pregunta 1?", ["Respuesta 1", "Respuesta 2"]);
	// 	toastSuccesOperation("Pregunta registrada con éxito");
	// 	handleToggleModal();
	// };

	const onCancel = () => {
		handleToggleModal();
	};

	return (
		<Modal
			open={statusMatchModal}
			onClose={handleToggleModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h5" color="initial" align="center">
					REGISTRO DE PARTIDO
				</Typography>

			<Box ml={"2rem"} mr={"2rem"}
				
				sx={{
					width: { xl: "90%", lg: "90%", sm: "90%", xs: "90%" },
					padding: "1rem",
				}}
			>
				<Typography variant= {{ xl: "2rem", lg: "1.5rem", sm: "1rem", xs: "0.8rem" }}>
				NOMBRE DEL PARTIDO <span style={{ color: "red" }}>*</span>
					</Typography>
					<TextField
						fullWidth
						size="small"
						id="outlined-basic" 
						variant="outlined"
						label=""
						helperText="Ingrese el nombre del partido"
					/>
				
				<Typography variant="h7" mt={"1rem"}>
				INSERTAR EMBLEMA DEL PARTIDO <span style={{ color: "red" }}>*</span>
					</Typography>
					<Box
						display="flex"
						alignItems="center"
						sx={{ width: "100%" }}
						flexDirection="row"
					>
						<TextField
						label="Sin archivo seleccionado"
						disabled
						fullWidth
						variant="outlined"
						size="small"
						// helperText="Ingrese la fotografía del partido"
						
						//   className={styles.textField}
						></TextField>
						<IconButton
						color="primary"
						aria-label="upload picture"
						component="label"
						size="large"
						>
						<input hidden accept="image/*" type="file" />
						<PhotoCamera fontSize="" />
						</IconButton>
					</Box>
				<Typography variant="h7" mt={"1rem"}>
				INSERTAR FOTOGRAFÍA DEL PROPIETARIO/A <span style={{ color: "red" }}>*</span>
					</Typography>
					<Box
						display="flex"
						alignItems="center"
						sx={{ width: "100%" }}
						flexDirection="row"
					>
						<TextField
						fullWidth
						label="Sin archivo seleccionado"
						disabled
						variant="outlined"
						size="small"
						// helperText="Ingrese la fotografía del propietario/a"
						//   className={styles.textField}
						></TextField>
						<IconButton
							color="primary"
							aria-label="upload picture"
							component="label"
							size="large"
							>
							<input hidden accept="image/*" type="file" />
							<PhotoCamera fontSize="" />
						</IconButton>
					</Box>
				<Typography variant="h7" mt={"1rem"}>
				NOMBRE DEL PROPIETARIO/A <span style={{ color: "red" }}>*</span>
					</Typography>
					<TextField
						fullWidth
						size="small"
						id="outlined-basic" 
						variant="outlined"
						helperText="Ingrese el nombre del propietario/a"
						label=""
					/>
				<Typography variant="h7" mt={"1rem"}>
				SEUDÓNIMO DEL CANDIDATO/A <span style={{ color: "red" }}>*</span>
					</Typography>
					<TextField
						fullWidth
						size="small"
						id="outlined-basic" 
						variant="outlined"
						helperText="Ingrese el seudónimo del candidato/a"
						label=""
					/>
				<Typography variant="h7" mt={"1rem"}>
				NOMBRE DEL SUPLENTE <span style={{ color: "red" }}>*</span>
					</Typography>
					<TextField
						fullWidth
						size="small"
						id="outlined-basic" 
						variant="outlined"
						helperText="Ingrese el nombre del suplente"
						label=""
					/>
					<Grid
						container
						direction="row"
						justifyContent="flex-end"
						alignItems="center"
						spacing={2}
					>
						<Grid item xs={12} md={6} lg={3}>
							<Button
								// onClick={onSave}
								variant="contained"
								size="large"
								sx={{
									boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)",
									transition: "all 0.5s ease",
									backgroundColor: "#511079",
									width: "100%",
									borderRadius: "25px 25px 25px 25px",
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
									borderRadius: "25px 25px 25px 25px",
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
