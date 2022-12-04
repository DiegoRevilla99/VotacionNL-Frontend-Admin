import { RegistroProceso } from "../layout/RegistroProceso";

export const RegistroConsultaCiudadana = () => {
	return (
		<RegistroProceso
			title={"REGISTRO DE CONSULTA CIUDADANA"}
			butonTitle={"Registrar Consulta ciudadana"}
			tableTitle={"Consultas Ciudadanas"}
			to={"/preparacion/consulta"}
		></RegistroProceso>
	);
};
