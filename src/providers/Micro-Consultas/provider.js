let idConsultas = 0;
let idPapeleta = 0;

export const createConsultaCiudadana = async () => {
	try {
		// **FETCH
		await timeout(1000);
		idConsultas++;
		return { ok: true, id: idConsultas };
	} catch (error) {
		return [];
	}
};

export const createPapeleta = async () => {
	try {
		// **FETCH
		await timeout(1000);
		idPapeleta++;
		return { ok: true, id: idPapeleta };
	} catch (error) {
		return [];
	}
};

export const getBallotData = async (idBallot) => {
	try {
		// **FETCH
		await timeout(1000);
		return { ok: true, id: 0, encabezadoConsulta: "Encabezado de prueba" };
	} catch (error) {
		return { ok: false };
	}
};

export const updateBallotData = async (idBallot, encabezadoConsulta) => {
	try {
		await timeout(1000);
		return { ok: true };
	} catch (error) {
		return { ok: false };
	}
};

const timeout = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
