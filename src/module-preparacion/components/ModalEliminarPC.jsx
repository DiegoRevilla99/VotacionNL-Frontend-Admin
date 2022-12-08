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
// import { useDispatch } from "react-redux";
// import { useUiStore } from "../../hooks/useUiStore";

// import { useConsultaCiudadanaStore } from "../hooks/useConsultaCiudadanaStore";

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

export const ModalEliminarPC = ({ statusDeleteModal, handleToggleModal }) => {
	// const { addQuestion } = useConsultaCiudadanaStore();

	// const { toastSuccesOperation } = useUiStore();

	// const onSave = () => {
	// 	addQuestion("¿Pregunta 1?", ["Respuesta 1", "Respuesta 2"]);
	// 	toastSuccesOperation("Pregunta registrada con éxito");
	// 	handleToggleModal();
	// };

	// const onCancel = () => {
	// 	handleToggleModal();
	// };

	return (
		<Modal
			open={statusDeleteModal}
			onClose={handleToggleModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h5" color="initial" align="center">
                    Si eliminas el partido/candidato desaparecerá para siempre. ¿Está seguro que deseas continuar?
				</Typography>
			</Box>
		</Modal>
	);
};
