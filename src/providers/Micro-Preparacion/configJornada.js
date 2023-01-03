import axios from "axios";

export const jornadasAPI = axios.create({
	// baseURL: "https://ms-jornada-consulta-nl.herokuapp.com/",
    baseURL: "https://ms-jornada-elec-nl.herokuapp.com/",
});
