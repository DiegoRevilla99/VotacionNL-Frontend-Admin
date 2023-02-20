import axios from "axios";

export const votoFormalAPI = axios.create({
	baseURL: "https://ms-jornada-voto-seguro.herokuapp.com/",
});
