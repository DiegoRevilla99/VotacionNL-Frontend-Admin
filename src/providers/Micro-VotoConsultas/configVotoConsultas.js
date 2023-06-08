import axios from "axios";

export const votoConsultaAPI = axios.create({
  baseURL: "https://ms-jornada-voto-consulta-2.herokuapp.com/",
});
