import axios from "axios";

export const JornadaVotanteApi = axios.create({
    baseURL: 'https://ms-votante.herokuapp.com/jornadavotante/'
})

