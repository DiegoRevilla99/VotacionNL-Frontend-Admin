import axios from "axios";

export const jornadaNoFormalAPI = axios.create({
	baseURL: "https://ms-jornada-no-formal.herokuapp.com/",
});
