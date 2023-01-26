import axios from "axios";

export const VotanteApi = axios.create({
    baseURL: 'https://ms-votante.herokuapp.com/votante/'
})