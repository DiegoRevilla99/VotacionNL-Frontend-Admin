import { RegistroProceso } from "../layout/RegistroProceso";

export const RegistroComite = () => {

	return (
		<>
		<RegistroProceso
			title={"REGISTRO DE COMITÉ"}
			butonTitle={"Registrar Comité"}
			tableTitle={"Comités"}
			to={"/preparacion/comite"}
		></RegistroProceso>
		</>
	);
};
