import axios from "axios";

export const jornadasAPI = axios.create({
  baseURL: "https://ms-jornada-elec-nl-2.herokuapp.com/",
});
