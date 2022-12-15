import { RegistroProceso } from "../layout/RegistroProceso";

export const RegistroJornadaElectoralGenerica = () => {
	
	return (
		<>
		<RegistroProceso
			title={"REGISTRO DE JORNADA ELECTORAL GENÉRICA"}
			butonTitle={"Registrar Jornada Electoral Genérica"}
			
			tableTitle={"Jornadas Electorales Genéricas"}
			to={"/preparacion/JornadaGenerica"}
		></RegistroProceso>
		</>
	);
};
