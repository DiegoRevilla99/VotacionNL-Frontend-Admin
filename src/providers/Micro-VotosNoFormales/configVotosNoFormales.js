import axios from "axios";

export const votosNoFormalesAPI = axios.create({
  baseURL: "https://ms-jornada-votos-no-formales-2.herokuapp.com/",
});
