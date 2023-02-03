import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import {
	Box, Button, Grid, Modal, Typography
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
	onDeleteBoleta
} from "../../store/module-preparacion/jornada/ThunksJornadaNoFormal";
import { useJornadaNoFormalStore } from '../hooks/useJornadaNoFormalStore';
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: { xl: "50rem", lg: "50rem", sm: "40rem", xs: "30rem" },
	bgcolor: "background.paper",
	border: '2px solid #fff',
	borderRadius: "2rem",
	boxShadow: 3,
	p: 4,
};

export const ModalEliminarBoleta = ({ modalDeleteStatus, closeModalDelete, openModalDelete, idBoleta, encabezadoBoleta }) => {
	const dispatch = useDispatch();
	const params = useParams();
	const { jornadaNoFormalSelected , status } = useJornadaNoFormalStore();
	const onSave = () => {
        dispatch(onDeleteBoleta(idBoleta));
        closeModalDelete();
	};
    const onCancel = () => {
		closeModalDelete();
	};

	return (
		<Modal
			open={modalDeleteStatus}
			onClose={closeModalDelete}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>

				<DeleteForeverRoundedIcon 
				fontSize="large" 
				color="error"
				sx={{ width: { xl: "40%", lg: "40%", sm: "30%", xs: "30%" }, 
				height: "40%", 
				margin: "auto", 
				display: "block"
			 }}
				
				/>
				<Typography id="modal-modal-title" variant= "h4"  color="initial" align="center" mr={5} ml={5} mb={2}>
                    Si eliminas la boleta con el nombre "{encabezadoBoleta}" desaparecerá para siempre. ¿Está seguro que deseas continuar?
				</Typography>
                <Box ml={"2rem"} mr={"2rem"}
				mb={"2rem"}
				sx={{
					width: { xl: "90%", lg: "90%", sm: "90%", xs: "90%" },
					padding: "1rem",
				}}
			>
				<Grid
						container
						direction="row"
						justifyContent="flex-end"
						spacing={2}
					>
						<Grid item xs={12} md={6} lg={3}>
							<Button
                            disabled={status === "checking"}
								onClick={onSave}
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
								Continuar
							</Button>
						</Grid>
						<Grid item xs={12} md={6} lg={3}>
							<Button
                            disabled={status === "checking"}
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
