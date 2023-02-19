import axios from "axios";

export const ImagesAPI = axios.create({
	baseURL: "https://ms-jornada-upload-images.herokuapp.com/",
});
