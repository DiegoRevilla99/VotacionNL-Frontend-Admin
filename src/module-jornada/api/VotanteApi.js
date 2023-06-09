import axios from "axios";

export const VotanteApi = axios.create({
  baseURL: "https://ms-votante-2.herokuapp.com/votante/",
});
