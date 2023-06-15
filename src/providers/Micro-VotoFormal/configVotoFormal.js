import axios from "axios";

export const votoFormalAPI = axios.create({
  baseURL: "https://ms-jornada-voto-seguro-2.herokuapp.com/",
});

export const votoNoFormalAPI = axios.create({
  baseURL: "https://ms-jornada-votos-no-formales-2.herokuapp.com/",
});
export const votoconsultaAPI = axios.create({
  baseURL: "https://ms-jornada-voto-consulta-2.herokuapp.com/",
});
