import axios from "axios";

export const votoConsultaAPI = axios.create({
	baseURL: "https://ms-jornada-voto-consulta.herokuapp.com/",
});
