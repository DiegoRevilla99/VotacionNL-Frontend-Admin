import axios from "axios";

export const jornadasNoFormalesAPI = axios.create({
	baseURL: "https://ms-jornada-no-formal.herokuapp.com/",
	//https://ms-jornada-no-formal.herokuapp.com/jornada/no_formal/elecciones
});
