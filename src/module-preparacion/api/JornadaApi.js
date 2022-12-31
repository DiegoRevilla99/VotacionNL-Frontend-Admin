import axios from "axios";

export const JornadaApi = axios.create({
    baseURL: 'https://ms-jornada-elec-nl.herokuapp.com/jornada/electoral/'
})