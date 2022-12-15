import { RegistroProceso } from "../layout/RegistroProceso";

export const RegistroJornadaElectoral = () => {
	
	return (
		<>
		<RegistroProceso
			title={"REGISTRO DE JORNADA ELECTORAL"}
			butonTitle={"Registrar Jornada Electoral"}
			
			tableTitle={"Jornadas Electorales"}
			to={"/preparacion/jornada"}
		></RegistroProceso>
		</>
	);
};
