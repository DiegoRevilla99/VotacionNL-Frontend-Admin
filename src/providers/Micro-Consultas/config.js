import axios from "axios";

export const consultasAPI = axios.create({
  baseURL: "https://ms-jornada-consulta-nl-2.herokuapp.com/",
});
