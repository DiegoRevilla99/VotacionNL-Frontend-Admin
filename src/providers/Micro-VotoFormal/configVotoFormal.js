import axios from "axios";

export const votoFormalAPI = axios.create({
  baseURL: "https://ms-jornada-voto-seguro.herokuapp.com/",
});

export const votoNoFormalAPI = axios.create({
  baseURL: "https://ms-jornada-votos-no-formales.herokuapp.com7",
});
export const votoconsultaAPI = axios.create({
  baseURL: "https://ms-jornada-voto-consulta.herokuapp.com/",
});
