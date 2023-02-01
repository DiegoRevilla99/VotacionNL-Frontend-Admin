import axios from "axios";

export const tokenEmailAPI = axios.create({
	baseURL: "https://ms-jornada-token-email.herokuapp.com/",
});
