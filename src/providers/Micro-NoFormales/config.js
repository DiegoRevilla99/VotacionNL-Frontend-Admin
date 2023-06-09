import axios from "axios";

export const jornadaNoFormalAPI = axios.create({
  baseURL: "https://ms-jornada-no-formal-2.herokuapp.com/",
});
