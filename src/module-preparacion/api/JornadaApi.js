import axios from "axios";

export const JornadaApi = axios.create({
  baseURL: "https://ms-jornada-elec-nl-2.herokuapp.com/jornada/electoral/",
});
