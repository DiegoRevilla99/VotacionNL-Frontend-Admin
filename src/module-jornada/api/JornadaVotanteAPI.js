import axios from "axios";

export const JornadaVotanteApi = axios.create({
  baseURL: "https://ms-votante-2.herokuapp.com/jornadavotante/",
});
