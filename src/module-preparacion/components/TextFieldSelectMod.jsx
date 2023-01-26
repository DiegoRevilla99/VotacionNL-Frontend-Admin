import React from "react";
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	TextareaAutosize,
	TextField,
	Typography,
	MenuItem, 
} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
// import { useJornadaStore } from "../../module-preparacion/hooks/useJornadaStore";
import Select from '@mui/material/Select';
export const TextFieldSelectMod = React.memo(
	({
		valuesTipo,
		handleChange,
		errorsTipo,
        titulo,
		partidos,
	}) => {
        // const { status, candidatoandSuplentes, partidos} = useJornadaStore();
		console.log("ME RENDERIZO TIPOS");
		const [partido, setPartido] = React.useState("");
		const handleChangePartido = (event) => {
			setPartido(event.target.value);
		};
		return (
			<>
				<FormControl error={Boolean(errorsTipo)} fullWidth size="small">
					<FormLabel id="tipo">
						<Typography variant="h6" mt={"1rem"}>
							{titulo} <span style={{ color: "red" }}>*</span>
						</Typography>
					</FormLabel>
                    <InputLabel 
                    
                    id="demo-simple-select-label"></InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="partido"
                        value={valuesTipo}
                        handleChange={handleChangePartido}
                        >
						{partidos.map((partido) => (
									<MenuItem 
										key={partido.id}
										value = {partido.id}>
											{partido.nombrePartido}
									</MenuItem>
								))}
                    </Select>
				</FormControl>
			</>
		);
	}
);
